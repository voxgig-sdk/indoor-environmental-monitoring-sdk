<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK utility: prepare_body

class IndoorEnvironmentalMonitoringPrepareBody
{
    public static function call(IndoorEnvironmentalMonitoringContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
