<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK exists test

require_once __DIR__ . '/../indoorenvironmentalmonitoring_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = IndoorEnvironmentalMonitoringSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
