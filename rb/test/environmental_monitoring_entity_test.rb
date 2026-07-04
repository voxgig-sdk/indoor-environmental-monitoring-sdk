# EnvironmentalMonitoring entity test

require "minitest/autorun"
require "json"
require_relative "../IndoorEnvironmentalMonitoring_sdk"
require_relative "runner"

class EnvironmentalMonitoringEntityTest < Minitest::Test
  def test_create_instance
    testsdk = IndoorEnvironmentalMonitoringSDK.test(nil, nil)
    ent = testsdk.EnvironmentalMonitoring(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = environmental_monitoring_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "environmental_monitoring." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    environmental_monitoring_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.environmental_monitoring")))
    environmental_monitoring_ref01_data = nil
    if environmental_monitoring_ref01_data_raw.length > 0
      environmental_monitoring_ref01_data = Helpers.to_map(environmental_monitoring_ref01_data_raw[0][1])
    end

    # LIST
    environmental_monitoring_ref01_ent = client.EnvironmentalMonitoring(nil)
    environmental_monitoring_ref01_match = {}

    environmental_monitoring_ref01_list_result = environmental_monitoring_ref01_ent.list(environmental_monitoring_ref01_match, nil)
    assert environmental_monitoring_ref01_list_result.is_a?(Array)

  end
end

def environmental_monitoring_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "environmental_monitoring", "EnvironmentalMonitoringTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IndoorEnvironmentalMonitoringSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["environmental_monitoring01", "environmental_monitoring02", "environmental_monitoring03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID" => idmap,
    "INDOORENVIRONMENTALMONITORING_TEST_LIVE" => "FALSE",
    "INDOORENVIRONMENTALMONITORING_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["INDOORENVIRONMENTALMONITORING_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = IndoorEnvironmentalMonitoringSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["INDOORENVIRONMENTALMONITORING_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["INDOORENVIRONMENTALMONITORING_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
