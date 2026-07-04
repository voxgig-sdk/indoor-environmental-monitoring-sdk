// Typed models for the IndoorEnvironmentalMonitoring SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface EnvironmentalMonitoring {
  mperiod?: number
  mtransactiontime?: string
  mvalidtime?: string
  mvalue?: number
  sactive?: boolean
  savailable?: boolean
  scode?: string
  scoordinate?: Record<string, any>
  smetadata?: Record<string, any>
  sname?: string
  stype?: string
  tdescription?: string
  tmetadata?: Record<string, any>
  tname?: string
  tunit?: string
}

export type EnvironmentalMonitoringListMatch = Partial<EnvironmentalMonitoring>

