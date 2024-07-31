import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private generativeAI: GoogleGenerativeAI;
  private response: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public response$ = this.response.asObservable();

  constructor(private http: HttpClient) {
    this.generativeAI = new GoogleGenerativeAI(`${environment.GEMINI_API_KEY}`);
  }

  async generateText(userMessage: string) {
    try {
      const model = this.generativeAI.getGenerativeModel({
        model: 'gemini-pro',
      });
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      this.response.next(await response.text());
    } catch (error) {
      console.error('Error generating text:', error);
    }
  }
}
