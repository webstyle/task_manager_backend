import * as express from 'express';
import * as bodyParser from 'body-parser'

import * as settings from './settings';
import {TaskRoutes} from './routes/TaskRoutes';

const app: express.Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/task', TaskRoutes.routes());

app.listen(settings.config.port, () => console.log(`server is run on port ${settings.config.port}`));