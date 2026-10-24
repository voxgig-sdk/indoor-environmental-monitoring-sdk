import { EnvironmentalMonitoringEntity } from './entity/EnvironmentalMonitoringEntity';
export type * from './IndoorEnvironmentalMonitoringTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IndoorEnvironmentalMonitoringEntityBase } from './IndoorEnvironmentalMonitoringEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class IndoorEnvironmentalMonitoringSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    EnvironmentalMonitoring(entopts?: Record<string, any>): EnvironmentalMonitoringEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IndoorEnvironmentalMonitoringSDK;
    tester(testopts?: any, sdkopts?: any): IndoorEnvironmentalMonitoringSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IndoorEnvironmentalMonitoringSDK;
export { stdutil, config, BaseFeature, IndoorEnvironmentalMonitoringEntityBase, IndoorEnvironmentalMonitoringSDK, SDK, };
export type { DirectResult };
