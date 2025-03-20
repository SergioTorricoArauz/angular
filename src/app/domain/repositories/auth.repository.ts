import { Observable } from 'rxjs';
import { User } from '../entities/user';

export interface AuthRepository {
  login(username: string, password: string): Observable<User>;
  logout(): void;
}
