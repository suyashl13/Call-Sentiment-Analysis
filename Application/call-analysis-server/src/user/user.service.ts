import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { SearchEmployeeDto } from "./dtos/search-user-dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findAllEmployees() {
    return await this.userRepository.find({ where: { role: 1 } });
  }

  async searchEmployee({ email = null, name = null }: SearchEmployeeDto) {
    if (email) {
      
    } else if (name) {
      
    }
  }

  async changeActiveStatus(id: string, role: number) {
    const user = await this.userRepository.findOne({ where: { id: id, role: 1 } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    user.isActive = !user.isActive;
    user.role = role;
    return await this.userRepository.save(user);
  }

  createUser(user: CreateUserDto) {
    const toBeUser = this.userRepository.create({
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    });
    return this.userRepository.save(toBeUser);
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email }, select: {
      id: true,
      name: true,
      email: true,
      profilePicture: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true
    } });
  }
}
