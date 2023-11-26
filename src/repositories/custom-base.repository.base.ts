/* tslint:disable no-any */
import {AnyObject, DataObject, DefaultCrudRepository, Filter, juggler, Where} from '@loopback/repository';
import {Count} from '@loopback/repository/src/common-types';
import {Options} from 'loopback-datasource-juggler';

import {CustomBaseEntity} from './../models/custom-base-entity.model';

export abstract class CustomBaseRepository<T extends CustomBaseEntity, ID, Relations extends object = {}> extends DefaultCrudRepository<T, ID, Relations> {
  constructor(entityClass: any, dataSource: juggler.DataSource) {
    super(entityClass, dataSource);
  }

  find(filter?: Filter<T>, options?: Options): Promise<(T & Relations)[]> {
    // Filter out soft deleted entries
    filter = filter || {};
    filter.where = filter.where || {};
    (filter.where as any).deleted = false;

    // Now call super
    return super.find(filter, options);
  }

  findOne(filter?: Filter<T>, options?: Options): Promise<(T & Relations) | null> {
    // Filter out soft deleted entries
    filter = filter || {};
    filter.where = filter.where || {};
    (filter.where as any).deleted = false;

    // Now call super
    return super.findOne(filter, options);
  }

  findById(id: ID, filter?: Filter<T>, options?: Options): Promise<T & Relations> {
    // Filter out soft deleted entries
    filter = filter || {};
    filter.where = filter.where || {};
    (filter.where as any).deleted = false;

    // Now call super
    return super.findById(id, filter, options);
  }

  update(entity: T, options?: AnyObject | undefined): Promise<void> {
    // Set Updated at to the actual value
    (entity as any).updated_at = new Date();

    // Now call super
    return super.update(entity, options);
  }

  updateById(id: ID, data: DataObject<T>, options?: AnyObject | undefined): Promise<void> {
    // Set Updated at to the actual value
    data = data || {};
    (data as any).updated_at = new Date();

    // Now call super
    return super.updateById(id, data, options);
  }

  replaceById(id: ID, data: DataObject<T>, options?: AnyObject | undefined): Promise<void> {
    // Set Updated at to the actual value
    data = data || {};
    (data as any).updated_at = new Date();

    // Now call super
    return super.replaceById(id, data, options);
  }

  updateAll(data: DataObject<T>, where?: Where<T>, options?: Options): Promise<Count> {
    // Set Updated at to the actual value
    data = data || {};
    (data as any).updated_at = new Date();

    // Filter out soft deleted entries
    where = where || {};
    (where as any).deleted = false;

    // Now call super
    return super.updateAll(data, where, options);
  }

  count(where?: Where<T>, options?: Options): Promise<Count> {
    // Filter out soft deleted entries
    where = where || {};
    (where as any).deleted = false;

    // Now call super
    return super.count(where, options);
  }

  delete(entity: T, options?: Options): Promise<void> {
    // Do soft delete, no hard delete allowed
    (entity as any).deleted = true;
    return super.update(entity, options);
  }

  deleteAll(where?: Where<T>, options?: Options): Promise<Count> {
    // Do soft delete, no hard delete allowed
    return this.updateAll(
      {
        deleted: true,
      } as any,
      where,
      options,
    );
  }

  deleteById(id: ID, options?: Options): Promise<void> {
    // Do soft delete, no hard delete allowed
    return super.updateById(
      id,
      {
        deleted: true,
      } as any,
      options,
    );
  }

  /**
   * Method to perform hard delete of entries. Take caution.
   * @param entity
   * @param options
   */
  deleteHard(entity: T, options?: Options): Promise<void> {
    // Do hard delete
    return super.delete(entity, options);
  }

  /**
   * Method to perform hard delete of entries. Take caution.
   * @param entity
   * @param options
   */
  deleteAllHard(where?: Where<T>, options?: Options): Promise<Count> {
    // Do hard delete
    return super.deleteAll(where, options);
  }

  /**
   * Method to perform hard delete of entries. Take caution.
   * @param entity
   * @param options
   */
  deleteByIdHard(id: ID, options?: Options): Promise<void> {
    // Do hard delete
    return super.deleteById(id, options);
  }
}
