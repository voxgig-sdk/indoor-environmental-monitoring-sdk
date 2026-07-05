<?php
declare(strict_types=1);

// Typed models for the IndoorEnvironmentalMonitoring SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** EnvironmentalMonitoring entity data model. */
class EnvironmentalMonitoring
{
    public ?int $mperiod = null;
    public ?string $mtransactiontime = null;
    public ?string $mvalidtime = null;
    public ?float $mvalue = null;
    public ?bool $sactive = null;
    public ?bool $savailable = null;
    public ?string $scode = null;
    public ?array $scoordinate = null;
    public ?array $smetadata = null;
    public ?string $sname = null;
    public ?string $stype = null;
    public ?string $tdescription = null;
    public ?array $tmetadata = null;
    public ?string $tname = null;
    public ?string $tunit = null;
}

/** Request payload for EnvironmentalMonitoring#list. */
class EnvironmentalMonitoringListMatch
{
    public ?int $mperiod = null;
    public ?string $mtransactiontime = null;
    public ?string $mvalidtime = null;
    public ?float $mvalue = null;
    public ?bool $sactive = null;
    public ?bool $savailable = null;
    public ?string $scode = null;
    public ?array $scoordinate = null;
    public ?array $smetadata = null;
    public ?string $sname = null;
    public ?string $stype = null;
    public ?string $tdescription = null;
    public ?array $tmetadata = null;
    public ?string $tname = null;
    public ?string $tunit = null;
}

