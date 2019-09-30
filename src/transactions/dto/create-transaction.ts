import { IsCurrency, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsCurrency()
  price: number;

  @IsNotEmpty()
  @IsISO8601()
  date: Date;
}
