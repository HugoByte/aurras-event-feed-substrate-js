import { Exception } from './exception';

export class EventException extends Exception {
    constructor(description) {
      super('EventException', description, true);
    }
  }