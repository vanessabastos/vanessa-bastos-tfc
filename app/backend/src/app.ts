import * as express from 'express';
import loginRouter from './routes/loginRouter';
import matchesRouter from './routes/matchesRouter';
import teamsRouter from './routes/teamsRouter';
import leaderboardsRouter from './routes/leaderboards';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamsRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard', leaderboardsRouter);
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.listen(PORT, () => console.log(`Escutando na porta${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
