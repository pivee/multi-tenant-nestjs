import { PaginationOptions } from "@/core/pagination-options/pagination-options";
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { FindUsersDto } from "./dto/find-users-dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({ type: FindUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: FindUsersDto })
  @ApiQuery({
    name: "take",
    type: "number",
    required: false,
    description: "Default = 10",
  })
  @ApiQuery({
    name: "skip",
    type: "number",
    required: false,
    description: "Default = 0",
  })
  async findAll(
    @Query(
      "take",
      new DefaultValuePipe(new PaginationOptions().take),
      ParseIntPipe,
    )
    take: number,
    @Query(
      "skip",
      new DefaultValuePipe(new PaginationOptions().skip),
      ParseIntPipe,
    )
    skip: number,
  ) {
    console.log("Finding users in controller");

    return await this.usersService.findAll({}, { take, skip });
  }

  @Get(":id")
  @ApiOkResponse({ type: FindUserDto })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: FindUserDto })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
