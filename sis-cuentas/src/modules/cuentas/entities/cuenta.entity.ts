import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cuentas')
export class Cuenta {
  @PrimaryGeneratedColumn({name: 'id_cuenta'})
  id: number;

  @Column({ type: 'text' ,name: 'motivo'})
  motivo: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 ,name: 'monto'})
  monto: number;

  @CreateDateColumn({ type: 'timestamp' ,name: 'fecha'})
  fecha: Date;
}
