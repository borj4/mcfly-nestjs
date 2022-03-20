import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Llamar a la API y que me devuelva algo
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
