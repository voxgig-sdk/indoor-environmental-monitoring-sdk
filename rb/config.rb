# IndoorEnvironmentalMonitoring SDK configuration

module IndoorEnvironmentalMonitoringConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
              "name" => "mperiod",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "mtransactiontime",
              "type" => "`$STRING`",
            },
            {
              "name" => "mvalidtime",
              "type" => "`$STRING`",
            },
            {
              "name" => "mvalue",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "sactive",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "savailable",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "scode",
              "type" => "`$STRING`",
            },
            {
              "name" => "scoordinate",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "smetadata",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sname",
              "type" => "`$STRING`",
            },
            {
              "name" => "stype",
              "type" => "`$STRING`",
            },
            {
              "name" => "tdescription",
              "type" => "`$STRING`",
            },
            {
              "name" => "tmetadata",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "tname",
              "type" => "`$STRING`",
            },
            {
              "name" => "tunit",
              "type" => "`$STRING`",
            },
          ],
          "name" => "environmental_monitoring",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "distinct",
                        "orig" => "distinct",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 200,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "scode,sname,scoordinate,mvalidtime,mvalue",
                        "kind" => "query",
                        "name" => "select",
                        "orig" => "select",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "sactive.eq.true",
                        "kind" => "query",
                        "name" => "where",
                        "orig" => "where",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                    "res" => "`body.data`",
                  },
                },
              ],
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
