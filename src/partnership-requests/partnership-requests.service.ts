import { Injectable } from '@nestjs/common';
import { CreatePartnershipRequestInput } from './dto/create-partnership-request.input';
import { UpdatePartnershipRequestInput } from './dto/update-partnership-request.input';

@Injectable()
export class PartnershipRequestsService {
  create(createPartnershipRequestInput: CreatePartnershipRequestInput) {
    return 'This action adds a new partnershipRequest';
  }

  findAll() {
    return `This action returns all partnershipRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partnershipRequest`;
  }

  update(id: number, updatePartnershipRequestInput: UpdatePartnershipRequestInput) {
    return `This action updates a #${id} partnershipRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} partnershipRequest`;
  }
}
