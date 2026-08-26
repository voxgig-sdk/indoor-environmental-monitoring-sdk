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
        "slug" => "indoor-environmental-monitoring",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "short" => "Measurement period in seconds",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "mtransactiontime",
              "short" => "Timestamp when the data was recorded in the database",
              "type" => "`$STRING`",
            },
            {
              "name" => "mvalidtime",
              "short" => "Timestamp when the measurement was taken",
              "type" => "`$STRING`",
            },
            {
              "name" => "mvalue",
              "short" => "Measured value",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "sactive",
              "short" => "Whether the station is currently active",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "savailable",
              "short" => "Whether the station data is available",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "scode",
              "short" => "Unique station code identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "scoordinate",
              "short" => "Geographic coordinates of the station",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "smetadata",
              "short" => "Additional metadata about the station",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sname",
              "short" => "Human-readable station name",
              "type" => "`$STRING`",
            },
            {
              "name" => "stype",
              "short" => "Station type",
              "type" => "`$STRING`",
            },
            {
              "name" => "tdescription",
              "short" => "Description of the measurement type",
              "type" => "`$STRING`",
            },
            {
              "name" => "tmetadata",
              "short" => "Additional metadata about the measurement type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "tname",
              "short" => "Type of measurement",
              "type" => "`$STRING`",
            },
            {
              "name" => "tunit",
              "short" => "Unit of measurement",
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
