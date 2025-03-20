import { IsString, IsOptional, IsBoolean, IsArray, IsEmail } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  userId: string;

  @IsString()
  dni: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsArray()
  @IsString({ each: true })
  phonesAdditional: string[];

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEmail()
  personalEmail?: string;

  @IsBoolean()
  isActive: boolean;
}
