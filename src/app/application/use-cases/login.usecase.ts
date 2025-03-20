import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/entities/user';
import { AuthRepository } from '../../domain/repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  execute(username: string, password: string): Observable<User> {
    return this.authRepository.login(username, password);
  }
}
