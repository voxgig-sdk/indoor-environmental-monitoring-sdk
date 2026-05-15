<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK utility: result_headers

class IndoorEnvironmentalMonitoringResultHeaders
{
    public static function call(IndoorEnvironmentalMonitoringContext $ctx): ?IndoorEnvironmentalMonitoringResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
