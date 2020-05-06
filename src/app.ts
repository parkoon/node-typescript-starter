import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import cors from 'cors';
import lusca from 'lusca';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';

// Router
import viewRouter from './routes/view.route';
import userRouter from './routes/user.route';
import errorMiddleware from './middleware/error.middleware';

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// SET VIEW ENGINE
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
  })
);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3007);

// SET MIDDLEWARE
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));
process.env.NODE_ENV === 'production' &&
  app.use(
    '/api',
    rateLimit({
      max: 3,
      windowMs: 60 * 60 * 100,
      message: 'Too many request from this IP, please try again in an hour',
    })
  );
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(compression());
app.use(helmet());
app.use(cors());

// ROUTES
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);

export default app;
