import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultancyResolver } from './consultancy.resolver';
import { ConsultancyService } from './consultancy.service';
import { Consultancy } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Consultancy]), AuthModule],
  providers: [ConsultancyResolver, ConsultancyService],
})
export class ConsultancyModule {}
