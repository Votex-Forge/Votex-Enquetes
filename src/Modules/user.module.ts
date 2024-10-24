import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  providers: [UserService],  
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
