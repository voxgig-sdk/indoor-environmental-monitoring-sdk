<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IndoorEnvironmentalMonitoringMakeContext
{
    public static function call(array $ctxmap, ?IndoorEnvironmentalMonitoringContext $basectx): IndoorEnvironmentalMonitoringContext
    {
        return new IndoorEnvironmentalMonitoringContext($ctxmap, $basectx);
    }
}
