import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/createuser.dto";
import { UpdateUserDto } from "../dto/updateuser.dto";
import * as bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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
