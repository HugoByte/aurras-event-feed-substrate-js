import { BaseException } from './base.exception';
/**
 * Invalid Configuration Exception class. Should throw this exception if the configuration provided are invalid.
 * This error is a non operational error, ie: If this error is thrown application should shutdown.
 */
export class InvalidConfigurationException extends BaseException {
  constructor(description) {
    super('InvalidConfigurationException', description, false);
  }
}
