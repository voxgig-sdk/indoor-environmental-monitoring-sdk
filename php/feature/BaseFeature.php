<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK base feature

class IndoorEnvironmentalMonitoringBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IndoorEnvironmentalMonitoringContext $ctx, array $options): void {}
    public function PostConstruct(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function PostConstructEntity(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function SetData(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function GetData(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function GetMatch(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function SetMatch(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function PrePoint(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function PreSpec(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function PreRequest(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function PreResponse(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function PreResult(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function PreDone(IndoorEnvironmentalMonitoringContext $ctx): void {}
    public function PreUnexpected(IndoorEnvironmentalMonitoringContext $ctx): void {}
}
