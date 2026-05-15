<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK utility: feature_add

class IndoorEnvironmentalMonitoringFeatureAdd
{
    public static function call(IndoorEnvironmentalMonitoringContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
