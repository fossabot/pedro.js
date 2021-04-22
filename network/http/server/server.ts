import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as log from '../../../common/log';
import { config } from '../../../common/config';
import * as taskhandler from '../../../taskhandler';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

export namespace server {
	function RunWithoutTLS(port: number, handlers: taskhandler.ITaskHandler) {
		taskhandler.RegisterHandlers(app, handlers)
		const s = app.listen(port);
		log.RequestId().Info('The HTTP(%s) server is running...', s.address());
	}

	export function Run(handlers: taskhandler.ITaskHandler) {
		let conf = config.GetYmlConfig().network.httpServer
		if (conf.enable) {
			RunWithoutTLS(conf.port, handlers);
		}
	}
}