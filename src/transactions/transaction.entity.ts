import { Column, Entity, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';
import { IsCurrency, IsOptional } from 'class-validator';

class PriceTransformer implements ValueTransformer {

  to(value: string): string {
    return value;
  }

  from(value: string): string {
    return value === null ? null : parseFloat(value).toString();
  }
}

@Entity()
export class Transaction {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @IsOptional()
  @IsCurrency()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: new PriceTransformer()
  })
  amount: number | string;

  @Column({nullable: true, type: 'timestamptz'})
  date?: Date;
}
