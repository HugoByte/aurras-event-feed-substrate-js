import { Exception } from './exception';

/**
 * Configuration Exception class. Should throw this exception if the configuration provided are invalid.
 * This error is a non operational error, ie: If this error is thrown application should shutdown.
 */

export class ConfigurationException extends Exception {
  constructor(configuration, description) {
    const configurationMap = {
      "/chainName": "CHAIN_NAME",
      "/chainEndpoint": "CHAIN_ENDPOINT",
      "/loggers": "LOGGERS",
      "/loggers/console/level": "LOGGERS Console Level",
      "/loggers/file/level": "LOGGERS File Level",
      "/loggers/file/filename": "LOGGERS File Location",
      "/excludes": "EXCLUDES",
      "/kafkaBrokers": "KAFKA_BROKERS",
      "/kafkaTopic": "KAFKA_TOPIC",
      "/openwhiskApiKey": "OPENWHISK_API_KEY",
      "/openwhiskApiHost": "OPENWHISK_API_HOST",
      "/openwhiskNamespace": "OPENWHISK_NAMESPACE",
      "/eventReceiver": "EVENT_RECEIVER",
      "/healthAPIPort": "HEALTH_API_PORT"
    }

    super('ConfigurationException', `${configurationMap[configuration] || configuration} ${description}`, false);
  }
}
