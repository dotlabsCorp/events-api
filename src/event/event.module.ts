import { Module } from '@nestjs/common';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventResolver, EventService],
  exports: [EventService],
})
export class EventModule {}
