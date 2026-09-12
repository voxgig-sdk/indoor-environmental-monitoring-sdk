import { Context } from './Context';
declare class IndoorEnvironmentalMonitoringError extends Error {
    isIndoorEnvironmentalMonitoringError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { IndoorEnvironmentalMonitoringError };
