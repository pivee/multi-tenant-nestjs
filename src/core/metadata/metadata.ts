import { ApiProperty } from '@nestjs/swagger';

export class Metadata<T> {
  @ApiProperty({ required: false })
  count?: number;

  @ApiProperty({ required: false })
  totalCount?: number;

  @ApiProperty({ required: false })
  take?: number;

  @ApiProperty({ required: false })
  skip?: number;

  @ApiProperty({ required: false })
  pageCount?: number;

  @ApiProperty({ required: false })
  currentPage?: number;

  constructor(data: T, options: Partial<Omit<Metadata<T>, 'data'>> = {}) {
    if (Array.isArray(data)) {
      this.count = data.length;
    }

    this.totalCount = options.totalCount;
    this.take = options.take;
    this.skip = options.skip;

    if (options.totalCount && options.take) {
      this.pageCount = Math.ceil(options.totalCount / options.take);
    }

    if (options.take) {
      this.currentPage = Math.floor(options.skip / options.take) + 1;
    }
  }
}
