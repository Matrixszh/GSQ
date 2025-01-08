import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getWelcomeMessage() {
    return {
      message: 'Welcome to the Geospatial Query System API!',
      swaggerDocs: '/api/docs',
    };
  }
}
