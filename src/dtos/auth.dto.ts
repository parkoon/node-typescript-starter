import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(10, {
    message: 'Password is too short',
  })
  @MaxLength(15, {
    message: 'Password is too long',
  })
  public password: string;
}
