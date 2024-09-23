import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor() {}
}
