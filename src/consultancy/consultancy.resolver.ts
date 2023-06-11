import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { ConsultancyService } from './consultancy.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { Consultancy } from './entities';
import { CreateConsultancyInput, UpdateConsultancyInput } from './dto';
import { ValidRoles } from 'src/auth/enums';
import { User } from 'src/users/entities';
import { CurrentUser } from 'src/auth/decorators';
import { ApiKeyAuthGuard } from 'src/auth/guards/apiKey-auth.guard';

@Resolver(() => Consultancy)
export class ConsultancyResolver {
  constructor(private readonly consultancyService: ConsultancyService) {}

  @UseGuards(ApiKeyAuthGuard)
  @Mutation(() => Boolean, { name: 'createConsultancy' })
  create(
    @Args('createConsultancyInput')
    createConsultancyInput: CreateConsultancyInput,
  ): Promise<boolean> {
    return this.consultancyService.create(createConsultancyInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Consultancy], { name: 'getConsultancies' })
  findAll(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser([ValidRoles.SUPER_USER, ValidRoles.ADMIN]) user: User,
  ): Promise<Consultancy[]> {
    return this.consultancyService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'getOneConsultancy' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser([ValidRoles.SUPER_USER, ValidRoles.ADMIN]) user: User,
  ): Promise<Consultancy> {
    return this.consultancyService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { name: 'updateConsultancy' })
  updateConsultancy(
    @Args('updateConsultancy') updateConsultancyInput: UpdateConsultancyInput,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser([ValidRoles.SUPER_USER]) user: User,
  ): Promise<boolean> {
    return this.consultancyService.update(
      updateConsultancyInput.id,
      updateConsultancyInput,
    );
  }
}
