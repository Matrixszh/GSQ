import { IsString, IsNotEmpty, IsIn, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsString()
  @IsIn(['Point'])
  type: string;

  @IsArray()
  coordinates: number[]; // [longitude, latitude]
}

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(['landmark', 'business', 'residence'])
  type: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
