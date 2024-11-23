import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Poll } from "../entities/poll.entity";
import { Vote } from "../entities/vote.enitity";
import { PollService } from "../services/poll.service";
import { PollController } from "../controller/poll.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Vote])],
  providers: [PollService],
  controllers: [PollController],
  exports: [PollService],
})
export class PollModule {}
