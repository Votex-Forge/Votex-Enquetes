import { IsNotEmpty } from "class-validator";

export class VoteDto {
  @IsNotEmpty()
  pollId!: number;

  @IsNotEmpty()
  selectedOption!: string;
}
