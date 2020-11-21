import { AfterLoad, Column, Entity, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';
import { IsCurrency, IsOptional } from 'class-validator';

// class PriceTransformer implements ValueTransformer {

//   to(value: string): string {
//     return value;
//   }

//   from(value: string): string {
//     return value === null ? null : parseFloat(value).toString();
//   }
// }

// tslint:disable-next-line: max-classes-per-file
@Entity()
export class Transaction {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsOptional()
  @Column({nullable: true})
  description?: string;

  @IsOptional()
  @Column({nullable: true})
  category?: string;

  @IsOptional()
  @IsCurrency()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    // transformer: new PriceTransformer()
  })
  amount: number | string;

  @Column({nullable: true, type: 'timestamptz'})
  date?: Date;
  @AfterLoad() _convertNumerics() {
    if (typeof(this.amount) === 'string') {
      this.amount = parseFloat(this.amount);
    }
  }
}
