import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import {
  PagingInfo,
  RelayPaginateQueryHelper,
  RelayPaginateStatics,
  RelayResult,
} from 'mongoose-relay-paginate';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name)
    private catModel: Model<Cat, RelayPaginateQueryHelper> &
      RelayPaginateStatics,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(paginateOptions: PagingInfo<Cat>): Promise<RelayResult<Cat[]>> {
    return this.catModel.find().relayPaginate(paginateOptions).exec();
  }
}
