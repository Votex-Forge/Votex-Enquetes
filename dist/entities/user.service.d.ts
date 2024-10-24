import { Repository } from "typeorm";
import { User } from "../Modules/user.entity";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(username: string, password: string, email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
