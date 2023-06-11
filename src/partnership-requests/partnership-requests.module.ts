import { Module } from '@nestjs/common';
import { PartnershipRequestsService } from './partnership-requests.service';
import { PartnershipRequestsResolver } from './partnership-requests.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnershipRequest } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([PartnershipRequest])],
  providers: [PartnershipRequestsResolver, PartnershipRequestsService],
})
export class PartnershipRequestsModule {}
