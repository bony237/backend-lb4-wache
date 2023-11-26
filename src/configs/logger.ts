// import {format} from '@loopback/logging';
import {format} from '@loopback/logging';
import * as winston from 'winston';
import {transports} from 'winston';

export const LogConfig = {
  logName: 'transfers',
  logDirectory: './logs/',
  logFile: 'app-debug-%DATE%.log',
  logFileInfo: 'app-info-%DATE%.log',
  logFileIssue: 'app-issues-%DATE%.log',
  logDatePattern: 'YYYY-MM-DD',
};
/*
* emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
* */

const customFormat = winston.format.combine(
  winston.format.splat(),
  winston.format.simple(),
  winston.format.align(),
  winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:SS'}),
  winston.format.printf(
    info => `[${info.timestamp}] ${info.level}: ${info.message}`,
  ),
);

const LoggingConfig = winston.loggers.add(LogConfig.logName, {
  level: 'debug',
  exitOnError: false,
  format: format.combine(customFormat),
  defaultMeta: {framework: 'LoopBack'},
  transports: [
    // new DailyRotateFile({
    //   filename: LogConfig.logDirectory + LogConfig.logFileInfo,
    //   datePattern: LogConfig.logDatePattern,
    //   zippedArchive: true,
    //   maxSize: '20m',
    //   maxFiles: '14d',
    //   level: 'info',
    // }),
    // new DailyRotateFile({
    //   filename: LogConfig.logDirectory + LogConfig.logFileIssue,
    //   datePattern: LogConfig.logDatePattern,
    //   zippedArchive: true,
    //   maxSize: '20m',
    //   maxFiles: '14d',
    //   level: 'error',
    // }),
    // new DailyRotateFile({
    //   filename: LogConfig.logDirectory + LogConfig.logFile,
    //   datePattern: LogConfig.logDatePattern,
    //   zippedArchive: true,
    //   maxSize: '20m',
    //   maxFiles: '14d',
    //   level: 'debug',
    // }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
  ],
});

export {LoggingConfig};

