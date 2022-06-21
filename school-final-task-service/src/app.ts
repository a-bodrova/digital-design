import express, { Response as ExResponse, Request as ExRequest } from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from '../build/routes';
import cors from 'cors';

import swagger from 'swagger-ui-express';
import { ValidateError } from 'tsoa';

const App = express();

App.use(cors({
  origin: function (_origin, callback) {
    // if(!origin) return callback(null, true);
    // if(allowedOrigins.indexOf(origin) === -1){
    //   const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    //   return callback(new Error(msg), false);
    // }
    return callback(null, true);
  }
}))


App.use(bodyParser.urlencoded({ extended: true }));

App.use(bodyParser.json());

App.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: Function
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

App.use('/swagger', swagger.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swagger.generateHTML(await import('../build/swagger.json')))
})

RegisterRoutes(App);

export { App as app }