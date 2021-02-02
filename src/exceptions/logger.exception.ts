import { Exception } from './exception';

export class LoggerException extends Exception {
    constructor(description) {
      super('LoggerException', description, false);
    }
  }