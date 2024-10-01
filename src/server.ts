import app from './app';
import config from './core/config';
import logger from './core/logger';

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
