import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  ADMIN = 'admin',
  USER = 'user',
  SUPER_USER = 'superUser',
}
registerEnumType(ValidRoles, {
  name: 'ValidRoles',
  description: 'Valid Role type (ADMIN, USER, SUPER_USER)',
});
