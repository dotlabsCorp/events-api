import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateTalkRequestInput } from './dto/create-talk-request.input';
import { UpdateTalkRequestInput } from './dto/update-talk-request.input';
import { TalkRequest } from './entities';

@Injectable()
export class TalkRequestsService {
  constructor(
    @InjectRepository(TalkRequest)
    private readonly talkRequestRepository: Repository<TalkRequest>,
  ) {}

  async create(
    createTalkRequestInput: CreateTalkRequestInput,
  ): Promise<Boolean> {
    const newTalkRequest = this.talkRequestRepository.create(
      createTalkRequestInput,
    );

    return this.createTalkRequest(newTalkRequest);
  }

  private async createTalkRequest(
    createTalkRequestInput: CreateTalkRequestInput,
  ): Promise<Boolean> {
    try {
      const talkRequest = await this.talkRequestRepository.save(
        createTalkRequestInput,
      );

      if (talkRequest) return true;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  findAll() {
    return `This action returns all talkRequests`;
  }

  findOne(id: string) {
    return `This action returns a #${id} talkRequest`;
  }

  update(id: string, updateTalkRequestInput: UpdateTalkRequestInput) {
    return `This action updates a #${id} talkRequest`;
  }

  remove(id: string) {
    return `This action removes a #${id} talkRequest`;
  }
}
