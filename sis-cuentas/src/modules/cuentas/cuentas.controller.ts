import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { Response } from 'express';

@Controller('cuentas')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Post()
  async create(@Body() data: CreateCuentaDto,@Res() res: Response) {
    const cuenta = await this.cuentasService.create(data);
    return res.status(200).json({
      message: 'la cuenta se registro exitosamente'
    });
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response
  ) {
    const cuentas = await this.cuentasService.findAll(page,limit);
    return res.status(200).json({
      cuentas: cuentas
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentasService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res() res: Response) {
    const cuenta = await this.cuentasService.remove(id)
    return res.status(200).json({
      message: 'Se elimino correctamente'
    })
  }
}
