import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Poll } from "./poll.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Poll, (poll) => poll.creator)
  polls!: Poll[]; // Relacionamento de um usuário com várias enquetes
}

