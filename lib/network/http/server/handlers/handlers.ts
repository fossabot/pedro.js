import * as core from 'express-serve-static-core';
import * as healthcheck from './health';
import * as metricscheck from './metrics';
import {ITaskHandler} from '../interfaces';

class implTaskHandler implements ITaskHandler {
	RegisterHandlers(router: core.Express) {
		this.RegisterHealthCheck(router);
		this.RegisterMetricsCheck(router);
	}

	RegisterHealthCheck(router: core.Express) {
		router.get('/health', healthcheck.Health);
		router.get('/ping', healthcheck.Ping);
	}

	RegisterMetricsCheck(router: core.Express) {
		router.get('/metrics', metricscheck.Metrics);
	}
}

const baseHandlers = new implTaskHandler();

export function RegisterHandlers(router: core.Express, privateHandlers: ITaskHandler) {
	baseHandlers.RegisterHandlers(router);
	if (privateHandlers != undefined) {
		privateHandlers.RegisterHandlers(router);
	}
}