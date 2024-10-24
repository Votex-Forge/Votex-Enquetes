import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize,
} from "class-validator";

export class CreatePollDto {
  @IsNotEmpty()
  @MaxLength(255)
  question!: string[];

  @IsDateString()
  expirationDate!: Date;
}
