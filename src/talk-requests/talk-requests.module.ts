import { Module } from '@nestjs/common';
import { TalkRequestsService } from './talk-requests.service';
import { TalkRequestsResolver } from './talk-requests.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalkRequest } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([TalkRequest])],
  providers: [TalkRequestsResolver, TalkRequestsService],
})
export class TalkRequestsModule {}
