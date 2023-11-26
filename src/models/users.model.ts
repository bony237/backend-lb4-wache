import {Entity, model, property} from '@loopback/repository';
import {IsEnum, IsPhoneNumber} from 'class-validator';

export enum UserType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLE = 'DISABLE',
}

@model()
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @IsEnum(UserType)
  @property({
    type: 'string',
    default: 'USER',
  })
  type?: string;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'email_confirmed',
      dataType: 'boolean',
    },
  })
  email_confirmed?: boolean;

  @property({
    type: 'string',
    hidden: true,
    postgresql: {
      columnName: 'password_digest',
    },
  })
  password_digest?: string;

  @IsEnum(UserStatus)
  @property({
    type: 'string',
    default: 'ACTIVE',
  })
  status?: string;

  @property({
    type: 'string',
  })
  firstname?: string;

  @property({
    type: 'string',
  })
  lastname?: string;

  @IsPhoneNumber()
  @property({
    type: 'string',
    postgresql: {
      columnName: 'mobile_phone',
    },
  })
  mobile_phone?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
