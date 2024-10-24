import { Controller, Post, Body, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dto/login.dto";
import { JwtAuthGuard } from "../jwt-auth.guard";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    return { message: "Logout realizado com sucesso" };
  }
}
