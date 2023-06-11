import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PostgresError } from 'src/auth/types';
import { Consultancy } from './entities';
import { CreateConsultancyInput, UpdateConsultancyInput } from './dto';

@Injectable()
export class ConsultancyService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(Consultancy)
    private readonly consultancyRepository: Repository<Consultancy>,
  ) {}

  async create(
    createConsultancyInput: CreateConsultancyInput,
  ): Promise<boolean> {
    const newUser = this.consultancyRepository.create(createConsultancyInput);

    return this.createUser(newUser);
  }

  private async createUser(consultancy: Consultancy): Promise<boolean> {
    try {
      const newUser = await this.consultancyRepository.save(consultancy);
      if (newUser) return true;

      throw new Error('Something went wrong when creating the consultancy');
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(): Promise<Consultancy[]> {
    return await this.findAllConsultancies();
  }

  private async findAllConsultancies(): Promise<Consultancy[]> {
    try {
      return await this.consultancyRepository.find({});
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOneById(id: string): Promise<Consultancy> {
    return this.findOneConsultancyById(id);
  }

  private async findOneConsultancyById(id: string): Promise<Consultancy> {
    try {
      return await this.consultancyRepository.findOneByOrFail({ id });
    } catch (error) {
      this.handleError(PostgresError.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateConsultancyInput: UpdateConsultancyInput,
  ): Promise<boolean> {
    const consultancy = await this.findOneConsultancyById(id);
    return this.updateConsultancy(consultancy, updateConsultancyInput);
  }

  private async updateConsultancy(
    consultancy: Consultancy,
    updateConsultancyInput: UpdateConsultancyInput,
  ): Promise<boolean> {
    try {
      await this.consultancyRepository.update(
        consultancy.id,
        updateConsultancyInput,
      );
      return true;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    this.logger.error(error);

    if (error === PostgresError.NOT_FOUND) throw new NotFoundException();

    if (error.code === PostgresError.DUPLICATE_KEY)
      throw new BadRequestException();

    throw new InternalServerErrorException();
  }
}
