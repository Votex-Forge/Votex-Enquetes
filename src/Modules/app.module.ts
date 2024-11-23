import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Poll } from "../entities/poll.entity";
import { Vote } from "../entities/vote.enitity";
import { User } from "../entities/user.entity";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("MYSQL_HOST") || "db",
        port: parseInt(configService.get<string>("MYSQL_PORT") || "3306", 10),
        username: configService.get<string>("MYSQL_USER") || "root",
        password: configService.get<string>("MYSQL_PASSWORD") || "",
        database: configService.get<string>("MYSQL_DATABASE") || "default_db",
        entities: [Poll, Vote, User],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "index"), // Sobe um nível para acessar a pasta "index" no diretório raiz
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
