import dotenv from 'dotenv';
import express from 'express';
import configCors from './src/middlewares/configCors';
import contasRoutes from './src/routes/contasRouter';
import usersRoutes from './src/routes/usersRouter';
import tokenRoutes from './src/routes/tokenRouter';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(configCors);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/contas', contasRoutes);
    this.app.use('/users', usersRoutes);
    this.app.use('/token', tokenRoutes);
  }
}

export default new App().app;
