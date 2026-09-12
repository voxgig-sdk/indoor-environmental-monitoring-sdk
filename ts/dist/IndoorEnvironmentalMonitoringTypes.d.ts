export interface EnvironmentalMonitoring {
    mperiod?: number;
    mtransactiontime?: string;
    mvalidtime?: string;
    mvalue?: number;
    sactive?: boolean;
    savailable?: boolean;
    scode?: string;
    scoordinate?: Record<string, any>;
    smetadata?: Record<string, any>;
    sname?: string;
    stype?: string;
    tdescription?: string;
    tmetadata?: Record<string, any>;
    tname?: string;
    tunit?: string;
}
export interface EnvironmentalMonitoringListMatch {
    distinct?: boolean;
    limit?: number;
    offset?: number;
    select?: string;
    where?: string;
}
