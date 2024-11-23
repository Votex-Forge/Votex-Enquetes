import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/createuser.dto";
import { UpdateUserDto } from "../dto/updateuser.dto";
import { User } from "../entities/user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<Omit<User, "password">> {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<Omit<User, "password">[]> {
    return await this.userService.getAllUsers();
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<Omit<User, "password">> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<{ message: string }> {
    await this.userService.deleteUser(id);
    return { message: "Usuário deletado com sucesso" };
  }
}
