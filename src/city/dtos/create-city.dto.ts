import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  boundary: {
    type: string;
    coordinates: number[][][];
  };
}
