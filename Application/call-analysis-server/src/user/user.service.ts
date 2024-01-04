import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

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
