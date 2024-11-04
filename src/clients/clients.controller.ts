import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service.js';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async getClients() {
    return this.clientsService.findAll();
  }

  @Get('email/:email')
  async getClientByEmail(@Param('email') email: string) {
    return this.clientsService.findOneByEmail(email);
  }

  @Get('name/:name')
  async getClientByName(@Param('name') name: string) {
    return this.clientsService.findOneByName(name);
  }

  @Post()
  async addClient(@Body() body: any) {
    return this.clientsService.addClient(body);
  }

  @Put(':id')
  async updateClient(@Param('id') id: string, @Body() body: any) {
    return this.clientsService.updateClient(id, body);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }
}
