import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vote } from "./vote.enitity";

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  question!: string;

  @Column("simple-array")
  options!: string[];

  @Column({ type: "timestamp" })
  expirationDate!: Date;

  @OneToMany(() => Vote, (vote) => vote.poll, { cascade: true })
  votes!: Vote[];
}
