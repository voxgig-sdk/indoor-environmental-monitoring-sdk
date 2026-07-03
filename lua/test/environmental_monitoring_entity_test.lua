-- EnvironmentalMonitoring entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("indoor-environmental-monitoring_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("EnvironmentalMonitoringEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:EnvironmentalMonitoring(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = environmental_monitoring_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "environmental_monitoring." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local environmental_monitoring_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.environmental_monitoring")))
    local environmental_monitoring_ref01_data = nil
    if #environmental_monitoring_ref01_data_raw > 0 then
      environmental_monitoring_ref01_data = helpers.to_map(environmental_monitoring_ref01_data_raw[1][2])
    end

    -- LIST
    local environmental_monitoring_ref01_ent = client:EnvironmentalMonitoring(nil)
    local environmental_monitoring_ref01_match = {}

    local environmental_monitoring_ref01_list_result, err = environmental_monitoring_ref01_ent:list(environmental_monitoring_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(environmental_monitoring_ref01_list_result)

  end)
end)

function environmental_monitoring_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/environmental_monitoring/EnvironmentalMonitoringTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read environmental_monitoring test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "environmental_monitoring01", "environmental_monitoring02", "environmental_monitoring03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID"] = idmap,
    ["INDOORENVIRONMENTALMONITORING_TEST_LIVE"] = "FALSE",
    ["INDOORENVIRONMENTALMONITORING_TEST_EXPLAIN"] = "FALSE",
    ["INDOORENVIRONMENTALMONITORING_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["INDOORENVIRONMENTALMONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["INDOORENVIRONMENTALMONITORING_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["INDOORENVIRONMENTALMONITORING_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["INDOORENVIRONMENTALMONITORING_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["INDOORENVIRONMENTALMONITORING_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
