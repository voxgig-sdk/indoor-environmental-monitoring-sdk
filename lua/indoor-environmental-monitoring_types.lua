-- Typed models for the IndoorEnvironmentalMonitoring SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class EnvironmentalMonitoring
---@field mperiod? number
---@field mtransactiontime? string
---@field mvalidtime? string
---@field mvalue? number
---@field sactive? boolean
---@field savailable? boolean
---@field scode? string
---@field scoordinate? table
---@field smetadata? table
---@field sname? string
---@field stype? string
---@field tdescription? string
---@field tmetadata? table
---@field tname? string
---@field tunit? string

---@class EnvironmentalMonitoringListMatch

local M = {}

return M
