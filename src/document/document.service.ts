import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(@InjectModel('Document') private documentModel: Model<any>) {}

  /**
   * Create a new document
   */
  async create(createDocumentDto: CreateDocumentDto) {
    try {
      console.log('Creating Document:', createDocumentDto);
      const document = await this.documentModel.create(createDocumentDto);
      console.log('Document Created:', document);
      return document;
    } catch (error) {
      console.error('Error in create:', error.message);
      throw error;
    }
  }

  /**
   * Retrieve all documents
   */
  async findAll() {
    try {
      console.log('Fetching all documents');
      const documents = await this.documentModel.find();
      console.log('Documents Retrieved:', documents);
      return documents;
    } catch (error) {
      console.error('Error in findAll:', error.message);
      throw error;
    }
  }

  /**
   * Retrieve a document by ID
   */
  async findById(id: string) {
    try {
      console.log(`Fetching Document with ID: ${id}`);
      const document = await this.documentModel.findById(id);
      if (!document) throw new NotFoundException('Document not found');
      console.log('Document Retrieved:', document);
      return document;
    } catch (error) {
      console.error('Error in findById:', error.message);
      throw error;
    }
  }

  /**
   * Find documents within a city boundary
   */
  async findWithinCity(cityBoundary: any) {
    try {
      console.log('City Boundary Received:', JSON.stringify(cityBoundary, null, 2));
      const documents = await this.documentModel.find({
        location: {
          $geoWithin: {
            $geometry: cityBoundary,
          },
        },
      });
      console.log('Query Result:', documents);
      return documents;
    } catch (error) {
      console.error('Error in findWithinCity:', error.message);
      throw error;
    }
  }

  /**
   * Update a document by ID
   */
  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    try {
      console.log(`Updating Document with ID: ${id}`, updateDocumentDto);
      const updatedDocument = await this.documentModel.findByIdAndUpdate(
        id,
        updateDocumentDto,
        { new: true },
      );
      if (!updatedDocument) throw new NotFoundException('Document not found');
      console.log('Document Updated:', updatedDocument);
      return updatedDocument;
    } catch (error) {
      console.error('Error in update:', error.message);
      throw error;
    }
  }

  /**
   * Delete a document by ID
   */
  async delete(id: string) {
    try {
      console.log(`Deleting Document with ID: ${id}`);
      const deletedDocument = await this.documentModel.findByIdAndDelete(id);
      if (!deletedDocument) throw new NotFoundException('Document not found');
      console.log('Document Deleted:', deletedDocument);
      return deletedDocument;
    } catch (error) {
      console.error('Error in delete:', error.message);
      throw error;
    }
  }
}
