import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

jest.setTimeout(30000); // Set timeout to 30 seconds

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/cities (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/cities')
      .send({
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

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('New York City');
  });

  it('/cities/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/cities/12345') // Replace with actual city ID
      .expect(200);

    expect(response.body.name).toBe('New York City');
  });
});
