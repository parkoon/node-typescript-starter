import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const server = app.listen(app.get('port'), () => {
  console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

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
