import { Component } from '@angular/core';
import { TOKEN_STORAGE_KEY, USER_DETAILS } from '../common/common-const';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  get token(): string {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
  }

  logout() {
    console.log('sdfsdf');
    const token: any = localStorage.removeItem(TOKEN_STORAGE_KEY);
    const user_details: any = localStorage.removeItem(USER_DETAILS);

    if (!token && !user_details) {
      this.router.navigate(['/login']);
    }
  }
}
