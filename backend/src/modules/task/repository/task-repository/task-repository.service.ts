import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { BaseRepository } from 'src/core/models/base_repository';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';

@Injectable()
export class TaskRepositoryService implements BaseRepository<Task> {
  private generativeAI: GoogleGenerativeAI;
  constructor(
    @InjectRepository(Task) private readonly repository: Repository<Task>,
  ) {
    this.generativeAI = new GoogleGenerativeAI(
      'AIzaSyCURwg7N8fVdLs9nxrd4rBD9Z-iEy2my3c',
    );
  }

  get(): Observable<Task[]> {
    return from(this.repository.find());
  }

  getById(id: string): Observable<Task> {
    return from(this.repository.findOneBy({ id }));
  }

  create(body: Task): Observable<Task> {
    return from(this.repository.save(body));
  }

  delete(id: string): Observable<DeleteResult> {
    return from(this.repository.delete(id));
  }

  //Search

  search(query: string): Observable<Task[]> {
    return from(
      this.repository
        .createQueryBuilder('task')
        .where('LOWER(task.title) LIKE LOWER(:query)', { query: `%${query}%` })
        .getMany(),
    );
  }

  //Delete oldest tasks

  count(): Observable<number> {
    return from(this.repository.count());
  }

  removeTasks(tasks: Task[]): Observable<Task[]> {
    return from(this.repository.remove(tasks));
  }

  findOldestTasks(limit: number): Observable<Task[]> {
    return from(
      this.repository
        .createQueryBuilder('task')
        .orderBy('task.createdAt', 'ASC')
        .limit(limit)
        .getMany(),
    );
  }

  //Task creator
  async generateAndCreateTasks(): Promise<void> {
    try {
      const model = this.generativeAI.getGenerativeModel({
        model: 'gemini-pro',
      });

      const result = await model.generateContent(
        'Dame una idea de proyecto de programación y devuélvemela en formato JSON con las siguientes propiedades: "title" (string), "description" (string), y "type" (string). El "type" puede ser "0", "1" o "2", siendo el 0 como "FRONTEND", el 1 como "BACKEND" y el 2 como "FULLSTACK". El titulo no debe superar los 10 caracteres y la descripción no debe superar los 100 caracteres. No repitas ninguna idea de proyecto con las anteriores.',
      );
      const responseText = await result.response.text();
      const geminiResponse: Task = JSON.parse(
        responseText.replace(/```json|```/g, '').trim(),
      );

      const newTask: Task = {
        title: geminiResponse.title,
        description: geminiResponse.description,
        type: geminiResponse.type,
      } as Task;

      await this.repository.save(newTask);
    } catch (error) {
      console.error('Error generating and creating tasks:', error);
      throw error;
    }
  }
}
