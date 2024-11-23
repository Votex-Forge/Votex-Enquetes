import { IsNotEmpty, IsInt, Min } from "class-validator";

export class VoteDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  optionIndex!: number;
}
