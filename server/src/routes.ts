import { Application, Router } from 'express';
import { IndexRequestHandler } from './requestHandlers/IndexRequestHandler';

const _routes: [string, Router][] = [
  ['/', IndexRequestHandler]
];

export const routes = (app: Application):void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
