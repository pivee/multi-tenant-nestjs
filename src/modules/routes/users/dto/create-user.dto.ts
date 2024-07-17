import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class CreateUserDto implements Omit<User, "id"> {
  @ApiProperty({ format: "email" })
  emailAddress: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
