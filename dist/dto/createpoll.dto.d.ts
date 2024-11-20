import { IsNotEmpty, MaxLength, IsDateString } from "class-validator";

export class CreatePollDto {
  @IsNotEmpty()
  @MaxLength(255)
  question!: string;

  @IsDateString()
  expirationDate!: Date;
}
