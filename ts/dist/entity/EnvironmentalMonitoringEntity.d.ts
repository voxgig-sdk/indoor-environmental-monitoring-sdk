import { IndoorEnvironmentalMonitoringEntityBase } from '../IndoorEnvironmentalMonitoringEntityBase';
import type { IndoorEnvironmentalMonitoringSDK } from '../IndoorEnvironmentalMonitoringSDK';
import type { Control } from '../types';
import type { EnvironmentalMonitoring, EnvironmentalMonitoringListMatch } from '../IndoorEnvironmentalMonitoringTypes';
declare class EnvironmentalMonitoringEntity extends IndoorEnvironmentalMonitoringEntityBase<EnvironmentalMonitoring> {
    constructor(client: IndoorEnvironmentalMonitoringSDK, entopts: any);
    make(this: EnvironmentalMonitoringEntity): EnvironmentalMonitoringEntity;
    list(this: any, reqmatch?: EnvironmentalMonitoringListMatch, ctrl?: Control): Promise<EnvironmentalMonitoringEntity[]>;
}
export { EnvironmentalMonitoringEntity };
