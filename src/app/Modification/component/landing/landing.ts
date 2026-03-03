import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('800ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class LandingModif {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login2']);
  }

  goToRegister() {
    this.router.navigate(['/inscription']);
  }
}