import { PaginationOptions } from "@/core/pagination-options/pagination-options";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma-tenant/prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAll(where: Prisma.UserWhereInput, options: PaginationOptions) {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
