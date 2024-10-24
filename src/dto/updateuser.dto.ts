import { IsEmail, IsOptional, MinLength, Matches } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(8, { message: "Password must be at least 8 characters long." })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, {
    message:
      "Password must contain at least one letter and one number, and be between 8 and 16 characters long.",
  })
  password?: string;
}
