import { Exception } from './exception';

/**
 * Configuration Exception class. Should throw this exception if the configuration provided are invalid.
 * This error is a non operational error, ie: If this error is thrown application should shutdown.
 */

export class ConfigurationException extends Exception {

  constructor(description) {
    super('ConfigurationException', description, false);
  }
}
