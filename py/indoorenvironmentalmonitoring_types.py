# Typed models for the IndoorEnvironmentalMonitoring SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class EnvironmentalMonitoring:
    mperiod: Optional[int] = None
    mtransactiontime: Optional[str] = None
    mvalidtime: Optional[str] = None
    mvalue: Optional[float] = None
    sactive: Optional[bool] = None
    savailable: Optional[bool] = None
    scode: Optional[str] = None
    scoordinate: Optional[dict] = None
    smetadata: Optional[dict] = None
    sname: Optional[str] = None
    stype: Optional[str] = None
    tdescription: Optional[str] = None
    tmetadata: Optional[dict] = None
    tname: Optional[str] = None
    tunit: Optional[str] = None


@dataclass
class EnvironmentalMonitoringListMatch:
    mperiod: Optional[int] = None
    mtransactiontime: Optional[str] = None
    mvalidtime: Optional[str] = None
    mvalue: Optional[float] = None
    sactive: Optional[bool] = None
    savailable: Optional[bool] = None
    scode: Optional[str] = None
    scoordinate: Optional[dict] = None
    smetadata: Optional[dict] = None
    sname: Optional[str] = None
    stype: Optional[str] = None
    tdescription: Optional[str] = None
    tmetadata: Optional[dict] = None
    tname: Optional[str] = None
    tunit: Optional[str] = None

