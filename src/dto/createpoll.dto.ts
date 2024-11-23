import { IsString, IsArray, ArrayMinSize, IsDateString } from "class-validator";

export class CreatePollDto {
  @IsString()
  question!: string; 

  @IsArray()
  @ArrayMinSize(2)
  options!: string[];

  @IsDateString()
  expirationDate!: string; 
}
