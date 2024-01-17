import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { PagingInfo, RelayResult } from 'mongoose-relay-paginate';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(
    @Body() body: { paging: PagingInfo<Cat> },
  ): Promise<RelayResult<Cat[]>> {
    return this.catsService.findAll(body.paging);
  }
}
