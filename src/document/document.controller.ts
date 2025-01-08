import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('documents')
@ApiTags('Documents') // Group all endpoints under "Documents" in Swagger
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new document' }) // Add summary for Swagger
  @ApiBody({
    description: 'Payload for creating a new document',
    type: CreateDocumentDto,
  })
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all documents' }) // Add summary for Swagger
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a document by ID' }) // Add summary for Swagger
  @ApiParam({
    name: 'id',
    description: 'The ID of the document to retrieve',
    type: String,
  })
  findOne(@Param('id') id: string) {
    return this.documentService.findById(id);
  }

  @Post('within-city')
  @ApiOperation({ summary: 'Find documents within a city boundary' }) // Add summary for Swagger
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        boundary: {
          type: 'object',
          properties: {
            type: { type: 'string', example: 'Polygon' },
            coordinates: {
              type: 'array',
              items: {
                type: 'array',
                items: {
                  type: 'array',
                  items: { type: 'number' },
                },
              },
            },
          },
        },
      },
      required: ['boundary'],
    },
    description: 'GeoJSON object representing the city boundary',
  })
  findWithinCity(@Body('boundary') boundary: any) {
    return this.documentService.findWithinCity(boundary);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document by ID' }) // Add summary for Swagger
  @ApiParam({
    name: 'id',
    description: 'The ID of the document to update',
    type: String,
  })
  @ApiBody({
    description: 'Payload for updating a document',
    type: UpdateDocumentDto,
  })
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document by ID' }) // Add summary for Swagger
  @ApiParam({
    name: 'id',
    description: 'The ID of the document to delete',
    type: String,
  })
  delete(@Param('id') id: string) {
    return this.documentService.delete(id);
  }
}
