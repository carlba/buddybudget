import { IsCurrency, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsCurrency()
  amount: number;

  @IsNotEmpty()
  @IsISO8601()
  date: Date;
}
