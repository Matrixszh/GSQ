import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('CityService', () => {
  let service: CityService;
  let model: Model<any>;

  const mockCityModel = {
    create: jest.fn().mockResolvedValue({
      name: 'New York City',
      boundary: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.25909, 40.477399],
            [-73.700272, 40.916178],
            [-73.935242, 40.73061],
            [-74.25909, 40.477399],
          ],
        ],
      },
    }),
    find: jest.fn().mockResolvedValue([
      {
        name: 'New York City',
        boundary: {
          type: 'Polygon',
          coordinates: [
            [
              [-74.25909, 40.477399],
              [-73.700272, 40.916178],
              [-73.935242, 40.73061],
              [-74.25909, 40.477399],
            ],
          ],
        },
      },
    ]),
    findById: jest.fn().mockResolvedValue({
      name: 'New York City',
      boundary: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.25909, 40.477399],
            [-73.700272, 40.916178],
            [-73.935242, 40.73061],
            [-74.25909, 40.477399],
          ],
        ],
      },
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      name: 'Updated City',
      boundary: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.25909, 40.477399],
            [-73.700272, 40.916178],
            [-73.935242, 40.73061],
            [-74.25909, 40.477399],
          ],
        ],
      },
    }),
    findByIdAndDelete: jest.fn().mockResolvedValue({
      name: 'New York City',
      boundary: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.25909, 40.477399],
            [-73.700272, 40.916178],
            [-73.935242, 40.73061],
            [-74.25909, 40.477399],
          ],
        ],
      },
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getModelToken('City'),
          useValue: mockCityModel,
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    model = module.get<Model<any>>(getModelToken('City'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a city', async () => {
    const dto = {
      name: 'New York City',
      boundary: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.25909, 40.477399],
            [-73.700272, 40.916178],
            [-73.935242, 40.73061],
            [-74.25909, 40.477399],
          ],
        ],
      },
    };
    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(model.create).toHaveBeenCalledWith(dto);
  });

  it('should find all cities', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        name: 'New York City',
        boundary: {
          type: 'Polygon',
          coordinates: [
            [
              [-74.25909, 40.477399],
              [-73.700272, 40.916178],
              [-73.935242, 40.73061],
              [-74.25909, 40.477399],
            ],
          ],
        },
      },
    ]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should find a city by ID', async () => {
    const result = await service.findById('someId');
    expect(result).toEqual({
      name: 'New York City',
      boundary: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.25909, 40.477399],
            [-73.700272, 40.916178],
            [-73.935242, 40.73061],
            [-74.25909, 40.477399],
          ],
        ],
      },
    });
    expect(model.findById).toHaveBeenCalledWith('someId');
  });

  it('should update a city', async () => {
    const dto = { name: 'Updated City' };
    const result = await service.update('someId', dto);
    expect(result).toEqual({
      name: 'Updated City',
      boundary: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.25909, 40.477399],
            [-73.700272, 40.916178],
            [-73.935242, 40.73061],
            [-74.25909, 40.477399],
          ],
        ],
      },
    });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith('someId', dto, {
      new: true,
    });
  });

  it('should delete a city', async () => {
    const result = await service.delete('someId');
    expect(result).toEqual({
      name: 'New York City',
      boundary: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.25909, 40.477399],
            [-73.700272, 40.916178],
            [-73.935242, 40.73061],
            [-74.25909, 40.477399],
          ],
        ],
      },
    });
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('someId');
  });
});
