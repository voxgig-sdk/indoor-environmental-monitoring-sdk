<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK utility: prepare_method

class IndoorEnvironmentalMonitoringPrepareMethod
{
    private const METHOD_MAP = [
        'create' => 'POST',
        'update' => 'PUT',
        'load' => 'GET',
        'list' => 'GET',
        'remove' => 'DELETE',
        'patch' => 'PATCH',
    ];

    public static function call(IndoorEnvironmentalMonitoringContext $ctx): string
    {
        return self::METHOD_MAP[$ctx->op->name] ?? 'GET';
    }
}
