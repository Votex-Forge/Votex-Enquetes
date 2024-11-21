import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/createuser.dto";
import { UpdateUserDto } from "../dto/updateuser.dto";
import * as bcrypt from "bcrypt";
import { Cron, CronExpression } from "@nestjs/schedule";
import nodemailer from "nodemailer";
import { Poll } from "../entities/poll.entity";
import { LessThan } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>
  ) {}

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<Omit<User, "password">> {
    const { username, email, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException("Usuário já existe");
    }

    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException("E-mail já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const { password: _, ...result } = savedUser;
    return result;
  }

  // Função para enviar o e-mail de notificação
  private async sendPollExpiredNotification(pollId: number) {
    // acha a enquete pelo ID
    const poll = await this.pollRepository.findOne({
      where: { id: pollId },
      relations: ["creator"]
    });

    if (!poll) {
      throw new NotFoundException("Enquete não encontrada");
    }

    // resumo dos resultados
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
    const resultSummary = poll.options
      .map((option) => `${option.text}: ${option.votes} votos (${((option.votes / totalVotes) * 100).toFixed(2)}%)`)
      .join("\n");

    const creatorEmail = poll.creator.email; // Criador da enquete

    // transportador do Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "votexcesu@gmail.com", // e-mail do remetente
        pass: "vOTEXcesu1!!", // senha ou app password
      },
    });

    // envia o e-mail
    await transporter.sendMail({
      from: '"Sistema de Enquetes" <votexcesu@gmail.com>',
      to: creatorEmail,
      subject: `Sua enquete ${poll.question} foi encerrada!`,
      text: `A enquete "${poll.question}" foi encerrada. Aqui está o resumo dos resultados:\n\n${resultSummary}\n\nClique no link para visualizar os resultados completos: http://localhost:3000/poll-results/${pollId}`, // ajuste o link conforme sua URL
    });
  }

  // agendamento para verificar e-mails de enquetes expiradas
  @Cron(CronExpression.EVERY_HOUR)
  async checkExpiredPolls() {
    const expiredPolls = await this.pollRepository.find({
      where: {
        expirationDate: LessThan(new Date()), // verifica enquetes expiradas
        active: true, // verifica se a enquete tá ativa
      },
      relations: ["creator"]
    });

    for (const poll of expiredPolls) {
      if (poll.expirationDate < new Date()) {
        // notificação de expiração
        await this.sendPollExpiredNotification(poll.id);

        // marcar a enquete como expirada (desativada)
        poll.active = false;
        await this.pollRepository.save(poll);
      }
    }
  }

  
  async getAllUsers(): Promise<Omit<User, "password">[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...user }) => user);
  }


  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<Omit<User, "password">> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    Object.assign(user, updateUserDto);

    const updatedUser = await this.userRepository.save(user);

    const { password, ...result } = updatedUser;
    return result;
  }


  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Usuário não encontrado");
    }
  }
}
