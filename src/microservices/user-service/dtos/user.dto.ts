// user.dto.ts
import { IsNotEmpty, IsEmail, IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsPhoneNumber(null)
  contact_number?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  contact_number?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  age?: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  contact_number?: string;
}
