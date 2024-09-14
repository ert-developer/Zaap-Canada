import {logger} from 'react-native-logs';

export var log = logger.createLogger();

export const logDebug = message => log.debug(message);
export const logInfo = message => log.info(message);
export const logWarning = message => log.warn(message);
export const logError = message => log.error(message);

export function fireBaseQueryLog(method, url, data) {
  log.debug('\n***********FIREBASE CALL START*********');
}
