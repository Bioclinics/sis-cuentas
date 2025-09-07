import { Injectable, Query, Res } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CuentasService {
  constructor(
    @InjectRepository(Cuenta)
    private readonly cuentaRepostiory: Repository<Cuenta>
  ) { }

  async create(data: CreateCuentaDto) {
    const cuenta = new Cuenta();
    cuenta.motivo = data.motivo;
    cuenta.monto = data.monto;
    return await this.cuentaRepostiory.save(cuenta);
  }

  async findAll(page: number = 1, limit: number = 10) {
    // Calculamos cuántos registros saltar
    const skip = (page - 1) * limit;

    const [cuentas, total] = await this.cuentaRepostiory.findAndCount({
      skip,
      take: limit,
      order: { fecha: 'DESC' },
    });

    return {
      data: cuentas,
      total,           // total de registros
      page: Number(page),            // página actual
      last_page: Math.ceil(total / limit), // última página
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} cuenta`;
  }

  update(id: number, updateCuentaDto: UpdateCuentaDto) {
    return `This action updates a #${id} cuenta`;
  }

  async remove(id: number) {
    const cuenta = await this.cuentaRepostiory.findOne({
      where: {id: id}
    })
    return await this.cuentaRepostiory.remove(cuenta!);
  }
}
