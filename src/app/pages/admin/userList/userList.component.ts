import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userList.component.html',
})
export class UserListComponent {
  userListData: any = [];
  masterListDetailCount: number = 0;
  message: string = '';
  type: string = '';
  searchText: string = '';
  userData: any[] = [];

  ngOnInit(): void {
    const data = localStorage.getItem('appFormsData');
    this.userData = data ? JSON.parse(data) : [];
    this.getAllusers();
  }

  deleteUserData(index: number): void {
    console.log('index: ', index);
    if (confirm('Are you sure you want to delete the user data?')) {
      this.userData.splice(index, 1);
      this.updateAndSaveFormData();
      localStorage.setItem('appFormsData', JSON.stringify(this.userData));
    }
  }

  private updateAndSaveFormData(): void {
    this.getAllusers();
    localStorage.setItem('appFormsData', JSON.stringify(this.userData));
  }

  getAllusers(): void {
    if (this.searchText.trim() === '') {
      this.userListData = [...this.userData];
    } else {
      const searchTerm = this.searchText.toLowerCase().trim();
      this.userListData = this.userData.filter(
        (user) =>
          user.basicDetails.name.toLowerCase().includes(searchTerm) ||
          user.basicDetails.email.toLowerCase().includes(searchTerm)
      );
    }
  }
}
