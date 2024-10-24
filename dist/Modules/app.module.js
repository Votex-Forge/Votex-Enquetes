"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./user.service");
const user_entity_1 = require("../entities/user.entity");
const user_controller_1 = require("./user.controller");
const poll_entity_1 = require("../entities/poll.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: "mysql",
                    host: configService.get("MYSQL_HOST") || "db",
                    port: parseInt(configService.get("MYSQL_PORT") || "3306", 10),
                    username: configService.get("MYSQL_USER") || "root",
                    password: configService.get("MYSQL_PASSWORD") || "",
                    database: configService.get("MYSQL_DATABASE") || "default_db",
                    entities: [user_entity_1.User, poll_entity_1.Poll],
                    synchronize: true,
                    autoLoadEntities: true,
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, poll_entity_1.Poll]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map