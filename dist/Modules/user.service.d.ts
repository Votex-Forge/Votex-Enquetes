import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/updateuser.dto";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(username: string, password: string, email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
}
