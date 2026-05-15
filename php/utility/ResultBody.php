<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK utility: result_body

class IndoorEnvironmentalMonitoringResultBody
{
    public static function call(IndoorEnvironmentalMonitoringContext $ctx): ?IndoorEnvironmentalMonitoringResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
