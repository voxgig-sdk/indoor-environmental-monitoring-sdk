# IndoorEnvironmentalMonitoring SDK configuration

module IndoorEnvironmentalMonitoringConfig
  def self.make_config
    {
      "main" => {
        "name" => "IndoorEnvironmentalMonitoring",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://mobility.api.opendatahub.com/v2",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "environmental_monitoring" => {},
        },
      },
      "entity" => {
        "environmental_monitoring" => {
          "fields" => [
            {
              "active" => true,
              "name" => "mperiod",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "mtransactiontime",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "mvalidtime",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "mvalue",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "sactive",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "savailable",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "scode",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "scoordinate",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "smetadata",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "sname",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "stype",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "tdescription",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 11,
            },
            {
              "active" => true,
              "name" => "tmetadata",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 12,
            },
            {
              "active" => true,
              "name" => "tname",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 13,
            },
            {
              "active" => true,
              "name" => "tunit",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 14,
            },
          ],
          "name" => "environmental_monitoring",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => false,
                        "kind" => "query",
                        "name" => "distinct",
                        "orig" => "distinct",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "example" => 200,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "scode,sname,scoordinate,mvalidtime,mvalue",
                        "kind" => "query",
                        "name" => "select",
                        "orig" => "select",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "sactive.eq.true",
                        "kind" => "query",
                        "name" => "where",
                        "orig" => "where",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/flat/EnvironmentStation",
                  "parts" => [
                    "flat",
                    "EnvironmentStation",
                  ],
                  "select" => {
                    "exist" => [
                      "distinct",
                      "limit",
                      "offset",
                      "select",
                      "where",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    IndoorEnvironmentalMonitoringFeatures.make_feature(name)
  end
end
