import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Poll } from "./poll.entity";
import { User } from "./user.entity";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Poll, (poll) => poll.votes)
  poll!: Poll;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user!: User;

  @Column()
  optionIndex!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
