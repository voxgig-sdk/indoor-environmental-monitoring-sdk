<?php
declare(strict_types=1);

// EnvironmentalMonitoring entity test

require_once __DIR__ . '/../indoorenvironmentalmonitoring_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EnvironmentalMonitoringEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = IndoorEnvironmentalMonitoringSDK::test(null, null);
        $ent = $testsdk->EnvironmentalMonitoring(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = environmental_monitoring_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "environmental_monitoring." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $environmental_monitoring_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.environmental_monitoring")));
        $environmental_monitoring_ref01_data = null;
        if (count($environmental_monitoring_ref01_data_raw) > 0) {
            $environmental_monitoring_ref01_data = Helpers::to_map($environmental_monitoring_ref01_data_raw[0][1]);
        }

        // LIST
        $environmental_monitoring_ref01_ent = $client->EnvironmentalMonitoring(null);
        $environmental_monitoring_ref01_match = [];

        [$environmental_monitoring_ref01_list_result, $err] = $environmental_monitoring_ref01_ent->list($environmental_monitoring_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($environmental_monitoring_ref01_list_result);

    }
}

function environmental_monitoring_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/environmental_monitoring/EnvironmentalMonitoringTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = IndoorEnvironmentalMonitoringSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["environmental_monitoring01", "environmental_monitoring02", "environmental_monitoring03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID" => $idmap,
        "INDOORENVIRONMENTALMONITORING_TEST_LIVE" => "FALSE",
        "INDOORENVIRONMENTALMONITORING_TEST_EXPLAIN" => "FALSE",
        "INDOORENVIRONMENTALMONITORING_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["INDOORENVIRONMENTALMONITORING_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["INDOORENVIRONMENTALMONITORING_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new IndoorEnvironmentalMonitoringSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["INDOORENVIRONMENTALMONITORING_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["INDOORENVIRONMENTALMONITORING_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
