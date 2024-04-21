import { Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './roles.guard';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}
}
