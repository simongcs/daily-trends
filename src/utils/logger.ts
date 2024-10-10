import pino from 'pino';
import config from '../config/config';

const logger = pino({
  level: config.ENV === 'production' ? 'info' : 'debug',
});

export default logger;
