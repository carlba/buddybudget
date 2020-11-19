import { IsCurrency, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PatchTransactionDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsCurrency()
  amount: number;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  date: Date;
}
