import { IUserRole } from '@/types/IUserRole';
import { Reflector } from '@nestjs/core';

export const RolesAllowed = Reflector.createDecorator<IUserRole[]>();