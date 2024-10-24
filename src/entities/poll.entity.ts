import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  question!: string;

  @Column("simple-array")
  options!: string[];

  @Column()
  expirationDate!: Date;
}
