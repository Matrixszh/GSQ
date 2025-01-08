import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dtos/create-city.dto';
import { UpdateCityDto } from './dtos/update-city.dto';

@Injectable()
export class CityService {
  constructor(@InjectModel('City') private cityModel: Model<any>) {}

  async create(createCityDto: CreateCityDto) {
    return this.cityModel.create(createCityDto);
  }

  async findAll() {
    return this.cityModel.find();
  }

  async findById(id: string) {
    return this.cityModel.findById(id);
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    return this.cityModel.findByIdAndUpdate(id, updateCityDto, { new: true });
  }

  async delete(id: string) {
    return this.cityModel.findByIdAndDelete(id);
  }
}
