import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Poll } from "../entities/poll.entity";
import { Vote } from "../entities/vote.enitity";
import { CreatePollDto } from "../dto/createpoll.dto";
import { VoteDto } from "../dto/vote.dto";

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>
  ) {}

  async createPoll(createPollDto: CreatePollDto) {
    const poll = this.pollRepository.create(createPollDto);
    return this.pollRepository.save(poll);
  }

  async getAllPolls() {
    return this.pollRepository.find();
  }

  async vote(pollId: number, optionIndex: number, userId: number) {
    const poll = await this.pollRepository.findOne({ where: { id: pollId } });
    if (!poll) {
      throw new NotFoundException("Poll not found");
    }

    const vote = this.voteRepository.create({
      poll,
      optionIndex,
      user: { id: userId } as any, // Ajustar conforme o tipo da entidade `User`
    });
    return this.voteRepository.save(vote);
  }

  async getPollResults(pollId: number) {
    const poll = await this.pollRepository.findOne({
      where: { id: pollId },
      relations: ["votes"],
    });
    if (!poll) {
      throw new NotFoundException("Poll not found");
    }

    const votesPerOption = poll.options.map((option, index) => ({
      text: option,
      votes: poll.votes.filter((vote) => vote.optionIndex === index).length,
    }));

    return {
      id: poll.id,
      question: poll.question,
      results: votesPerOption,
    };
  }
}
