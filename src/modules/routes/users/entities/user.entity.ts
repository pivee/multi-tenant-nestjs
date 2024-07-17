import { ApiProperty } from "@nestjs/swagger";
import { User as IUser } from "@prisma/client";

export class User implements Partial<IUser> {
  @ApiProperty({ readOnly: true })
  id: number;

  @ApiProperty({ format: "email" })
  emailAddress: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
