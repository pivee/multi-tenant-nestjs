import { DataResponse } from "@core/data-response/data-response";
import { Metadata } from "@core/metadata/metadata";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class FindUsersDto extends DataResponse<User[]> {
  @ApiProperty({ type: User, isArray: true })
  public data: User[];

  @ApiProperty({ type: Metadata })
  public metadata: Metadata<User[]>;
}
