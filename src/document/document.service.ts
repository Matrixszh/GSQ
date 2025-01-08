import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(@InjectModel('Document') private documentModel: Model<any>) {}

  async create(createDocumentDto: CreateDocumentDto) {
    return this.documentModel.create(createDocumentDto);
  }

  async findAll() {
    return this.documentModel.find();
  }

  async findById(id: string) {
    const document = await this.documentModel.findById(id);
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async findWithinCity(cityBoundary: any) {
    return this.documentModel.find({
      location: {
        $geoWithin: {
          $geometry: cityBoundary,
        },
      },
    });
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const updatedDocument = await this.documentModel.findByIdAndUpdate(
      id,
      updateDocumentDto,
      { new: true },
    );
    if (!updatedDocument) throw new NotFoundException('Document not found');
    return updatedDocument;
  }

  async delete(id: string) {
    const deletedDocument = await this.documentModel.findByIdAndDelete(id);
    if (!deletedDocument) throw new NotFoundException('Document not found');
    return deletedDocument;
  }
}
