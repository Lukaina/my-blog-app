export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly username?: string;
  readonly email?: string;
  readonly password?: string;
  readonly name?: string;
}

export class LoginDto {
  readonly email: string;
  readonly password: string;
}
