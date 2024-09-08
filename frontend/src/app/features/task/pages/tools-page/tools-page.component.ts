import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tools-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],

  templateUrl: './tools-page.component.html',
  styleUrl: './tools-page.component.scss',
})
export class ToolsPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
