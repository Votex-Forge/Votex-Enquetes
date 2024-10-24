import { UserService } from "./user.service";
import { User } from "./user.entity";
export declare class AppController {
    private readonly userService;
    constructor(userService: UserService);
    getPing(): string;
    createUser(body: {
        username: string;
        password: string;
        email: string;
    }): Promise<User>;
    findAllUsers(): Promise<User[]>;
}
