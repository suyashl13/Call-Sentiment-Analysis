import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { ILike, Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { SearchEmployeeDto } from "./dtos/search-user-dto";
import { PageParamsDto } from "src/common/dtos/page-params.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findAllEmployees() {
    return await this.userRepository.find({ where: { role: 1 } });
  }

  async searchEmployee({ email, name, page }: SearchEmployeeDto) {
    let matchedUsers;
    if (email) {
      console.log("Email")
      matchedUsers = await this.userRepository.find({
        where: { email: email, role: 1 },
        select: {
          email: ILike(`%${email}%`) as any,
        },
        take: 10,
        skip: (page - 1) * 10,
      });
    } else if (name) {
      console.log("Name")
      matchedUsers = await this.userRepository.find({
        where: { name: name, role: 1 },
        select: {
          name: ILike(`%${name}%`) as any,
        },
        take: 10,
        skip: (page - 1) * 10,
      });
    }
    return matchedUsers;
  }

  async changeActiveStatus(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    user.isActive = !user.isActive;
    return await this.userRepository.save(user);
  }

  createUser(user: CreateUserDto) {
    const toBeUser = this.userRepository.create({
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      role: 1,
    });
    return this.userRepository.save(toBeUser);
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id: id, role: 1 } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
