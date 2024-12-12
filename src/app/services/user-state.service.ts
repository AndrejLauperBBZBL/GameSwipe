import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  public userId: string | null = null;

  setUserId(id: string) {
    this.userId = id;
    localStorage.setItem('userId', id); // Persist across sessions
  }

  getUserId(): string | null {
    if (!this.userId) {
      this.userId = localStorage.getItem('userId'); // Load from storage if needed
    }
    return this.userId;
  }

  clearUserId() {
    this.userId = null;
    localStorage.removeItem('userId');
  }
}
