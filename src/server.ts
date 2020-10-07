import os from 'os';
import cluster from 'cluster';
import { Server } from 'http';
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

let server: Server;

const clusterMode = false;

if (clusterMode && cluster.isMaster) {
    const workers = os.cpus();

    console.log('Master cluster setting up ' + workers.length + ' workers...');

    workers.forEach(() => cluster.fork());

    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    server = app.listen(app.get('port'), () => {
        console.log('Process ' + process.pid + ' is listening to all incoming requests at' + app.get('port') + 'port');
    });
}

// promise 에서 catch로 에러 처리를 하지 않았을 때 방생하는 요류
process.on('unhandledRejection', () => {
    console.log('UNHANDLED REJECTION: Shutting down!');
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', () => {
    console.log('uncaughtException');
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED, Shutting down gracefully!');
    server.close(() => {
        console.log('Process terminated!');
    });
});

export default server;
