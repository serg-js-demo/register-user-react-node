import { AsyncResultCallback, retry } from 'async';
import knex from 'knex';
import * as path from 'path';
import config, { Configuration } from './config';

let connection: knex | undefined;
let retryDbConnectionPromise: Promise<knex> | undefined;

export async function getConnection(): Promise<knex> {
    if (!connection) {
        connection = await retryDbConnection();
    } 

    return connection;
}

export async function closeConnection(): Promise<void> {
    if (connection) {
        await connection.destroy();
        connection = undefined;
    } 
}

export async function migrateDb() {
    const connection = await getConnection();

    await connection.migrate.latest({
        directory: path.resolve(__dirname, './migrations')
    });
}

export async function createConnection(): Promise<knex> {
    const db = knex({
        client: 'mysql',
        connection: {
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database
        },
        pool: {
            min: 2,
            max: 100,
            acquireTimeoutMillis: 6 * 1000,
            idleTimeoutMillis: 300 * 1000,
        },
        debug: config.debug,
        //acquireConnectionTimeout: 10000,
        migrations: {
            tableName: 'migrations'
        }
    });

    await db.raw('select 1');

    return db;
}

function retryDbConnection(): Promise<knex> {
    if (retryDbConnectionPromise instanceof Promise) {
        return retryDbConnectionPromise;
    }

    retryDbConnectionPromise = new Promise<knex>((resolve, reject) => {
        retry(
            { times: 15, interval: 3000 },
            (cb: AsyncResultCallback<knex, Error>) => {
                createConnection()
                    .then((db: knex) => {
                        cb(undefined, db);
                    })
                    .catch((err: any) => {
                        cb(err, undefined);
                    });
            },
            (err: Error | null | undefined, db: knex) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(db);
                }

                retryDbConnectionPromise = undefined;
            }
        )
    })

    return retryDbConnectionPromise;
};

