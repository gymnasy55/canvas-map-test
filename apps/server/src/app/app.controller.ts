import { Controller, Get, HttpCode, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import generatedData from './data_200x200.json';

export const ok = <T>(data: T) => ({ ok: true, data });

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Data')
  @ApiOperation({ summary: 'Get randomly created data' })
  @ApiQuery({ name: 'size', type: 'number', example: 10 })
  @Get('random')
  @HttpCode(201)
  getRandomData(@Query('size') size = 10) {
    return ok(this.appService.generateJsonData(size));
  }

  @ApiTags('Data')
  @ApiOperation({ summary: 'Get previously created data' })
  @Get()
  @HttpCode(200)
  getGeneratedData() {
    return ok(generatedData);
  }
}
