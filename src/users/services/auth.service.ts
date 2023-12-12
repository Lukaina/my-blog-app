export interface AuthService {
  validateUser(email: string, password: string): boolean;
  generateToken(email: string): string;
}
