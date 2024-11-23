import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { PollService } from "../services/poll.service";
import { CreatePollDto } from "../dto/createpoll.dto";
import { VoteDto } from "../dto/vote.dto";
import { JwtAuthGuard } from "../jwt-auth.guard";
import { Request as ExpressRequest } from "express";

@Controller("polls")
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPoll(@Body() createPollDto: CreatePollDto) {
    return this.pollService.createPoll(createPollDto);
  }

  @Get()
  async getAllPolls() {
    return this.pollService.getAllPolls();
  }

  @Post(":id/vote")
  @UseGuards(JwtAuthGuard)
  async vote(
    @Param("id") pollId: number,
    @Body() voteDto: VoteDto,
    @Request() req: Request & { user?: { id: number; username: string } }
  ) {
    if (!req.user) {
      throw new Error("Usuário não autenticado");
    }

    return this.pollService.vote(pollId, voteDto.optionIndex, req.user.id);
  }

  @Get(":id/results")
  async getResults(@Param("id") pollId: number) {
    return this.pollService.getPollResults(pollId);
  }
}
