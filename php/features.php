<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IndoorEnvironmentalMonitoringFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IndoorEnvironmentalMonitoringBaseFeature();
            case "test":
                return new IndoorEnvironmentalMonitoringTestFeature();
            default:
                return new IndoorEnvironmentalMonitoringBaseFeature();
        }
    }
}
