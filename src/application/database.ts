import { PrismaClient } from '../generated';
import { logger } from './loggin';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/dean_backend?schema=public';
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prismaClient = new PrismaClient({
    adapter,
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
        {
            emit: 'event',
            level: 'error',
        },
    ],
});

prismaClient.$on('error', (e: any) => {
    logger.error(e);
});

prismaClient.$on('warn', (e: any) => {
    logger.warn(e);
});

prismaClient.$on('info', (e: any) => {
    logger.info(e);
});

prismaClient.$on('query', (e: any) => {
    logger.info(e);
});