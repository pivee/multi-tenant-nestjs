/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginationOptions } from "@/core/pagination-options/pagination-options";
import {
  TENANT_PRISMA_SERVICE,
  TenantPrismaService,
} from "@/modules/prisma/tenant-prisma.service";
import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject(TENANT_PRISMA_SERVICE) private readonly prisma: TenantPrismaService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  async findAll(where: Prisma.UserWhereInput, options: PaginationOptions) {
    return await this.prisma.user.findMany();
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
