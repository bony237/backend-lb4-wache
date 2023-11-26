import {Entity, property} from '@loopback/repository';

/**
 * Abstract base class for all soft-delete enabled models
 *
 * @description
 * Base class for all soft-delete enabled models created.
 * It adds a 'deleted' attribute to the model class for handling soft-delete.
 * Its an abstract class so no repository class should be based on this.
 */
export abstract class CustomBaseEntity extends Entity {
  @property({
    type: 'boolean',
    default: false,
  })
  deleted?: boolean;

  @property({
    type: 'date',
    required: false,
    default: () => new Date(),
    postgresql: {
      columnName: 'created_at',
    },
  })
  created_at?: string;

  @property({
    type: 'date',
    required: false,
    default: () => new Date(),
    postgresql: {
      columnName: 'updated_at',
    },
  })
  updated_at?: string;

  constructor(data?: Partial<CustomBaseEntity>) {
    super(data);
  }
}
