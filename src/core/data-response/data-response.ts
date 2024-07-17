import { Metadata } from "@core/metadata/metadata";
import { ApiProperty } from "@nestjs/swagger";

export class DataResponse<T> {
  @ApiProperty()
  public result: T;

  @ApiProperty({ required: false })
  public meta;

  constructor(data: T, options: Partial<Omit<Metadata<T>, "data">> = {}) {
    this.result = data;
    this.meta = new Metadata(data, options);
  }
}
