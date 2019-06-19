import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    format: combine(
        label({ label: 'User-auth-server: ' }),
        timestamp(),
        prettyPrint()
    ),
    transports: [new transports.Console()]
});

export default logger;