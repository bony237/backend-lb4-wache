import {inject} from '@loopback/core';
import {WacheDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';
import {CustomBaseRepository} from './custom-base.repository.base';

export class UsersRepository extends CustomBaseRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  constructor(
    @inject('datasources.wache') dataSource: WacheDataSource,
  ) {
    super(Users, dataSource);
  }
}
