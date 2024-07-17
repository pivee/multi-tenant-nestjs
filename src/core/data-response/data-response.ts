import { Metadata } from "@core/metadata/metadata";
import { ApiProperty } from "@nestjs/swagger";

export class DataResponse<T> {
  @ApiProperty()
  public data: T;

  @ApiProperty({ required: false })
  public metadata;

  constructor(data: T, options: Partial<Omit<Metadata<T>, "data">> = {}) {
    this.data = data;
    this.metadata = new Metadata(data, options);
  }
}
