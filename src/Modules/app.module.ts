import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user.module";
import { AuthModule } from "./auth.module";
import { Poll } from "../entities/poll.entity";

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
        entities: [Poll],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
