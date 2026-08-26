-- IndoorEnvironmentalMonitoring SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "IndoorEnvironmentalMonitoring",
      slug = "indoor-environmental-monitoring",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://mobility.api.opendatahub.com/v2",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["environmental_monitoring"] = {},
      },
    },
    entity = {
      ["environmental_monitoring"] = {
        ["fields"] = {
          {
            ["name"] = "mperiod",
            ["short"] = "Measurement period in seconds",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "mtransactiontime",
            ["short"] = "Timestamp when the data was recorded in the database",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mvalidtime",
            ["short"] = "Timestamp when the measurement was taken",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mvalue",
            ["short"] = "Measured value",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "sactive",
            ["short"] = "Whether the station is currently active",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "savailable",
            ["short"] = "Whether the station data is available",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "scode",
            ["short"] = "Unique station code identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "scoordinate",
            ["short"] = "Geographic coordinates of the station",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "smetadata",
            ["short"] = "Additional metadata about the station",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "sname",
            ["short"] = "Human-readable station name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "stype",
            ["short"] = "Station type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tdescription",
            ["short"] = "Description of the measurement type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tmetadata",
            ["short"] = "Additional metadata about the measurement type",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "tname",
            ["short"] = "Type of measurement",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tunit",
            ["short"] = "Unit of measurement",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "environmental_monitoring",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "distinct",
                      ["orig"] = "distinct",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["example"] = 200,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "scode,sname,scoordinate,mvalidtime,mvalue",
                      ["kind"] = "query",
                      ["name"] = "select",
                      ["orig"] = "select",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "sactive.eq.true",
                      ["kind"] = "query",
                      ["name"] = "where",
                      ["orig"] = "where",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/flat/EnvironmentStation",
                ["parts"] = {
                  "flat",
                  "EnvironmentStation",
                },
                ["select"] = {
                  ["exist"] = {
                    "distinct",
                    "limit",
                    "offset",
                    "select",
                    "where",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
