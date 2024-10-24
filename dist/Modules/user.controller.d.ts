import { UserService } from "./user.service";
import { CreateUserDto } from "../dto/createuser.dto";
import { UpdateUserDto } from "../dto/updateuser.dto";
import { User } from "../entities/user.entity";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
}
