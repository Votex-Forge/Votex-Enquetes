import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity"; // Importando a entidade User

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  question!: string;

  @Column("json")
  options!: { text: string; votes: number }[];

  @Column()
  expirationDate!: Date;

  @Column({ default: true }) // Adicionando coluna 'active'
  active!: boolean;

  @ManyToOne(() => User, user => user.polls)
  creator!: User;
}


