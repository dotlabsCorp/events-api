import { Module } from '@nestjs/common';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';

@Module({
  providers: [EventResolver, EventService],
  imports: [TypeOrmModule.forFeature([Event])],
})
export class EventModule {}
