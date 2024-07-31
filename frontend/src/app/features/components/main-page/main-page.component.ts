import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  systemResponse: string;

  responseList: string[] = [];

  constructor(private chatService: ChatService) {
    this.systemResponse = '';
  }

  ngOnInit() {
    const intervalDuration = (24 * 60 * 60 * 1000) / 3;
    /* const intervalDuration = 10000; */
    setInterval(() => {
      this.chatService.generateText(
        'Dime 1 idea de proyecto de angular en 2 lineas'
      );
    }, intervalDuration);
    this.chatService.response$.subscribe((response) => {
      this.responseList.push(response);
      this.systemResponse = response;
    });
  }
}
