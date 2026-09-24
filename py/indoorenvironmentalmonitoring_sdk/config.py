# IndoorEnvironmentalMonitoring SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "IndoorEnvironmentalMonitoring",
            "slug": "indoor-environmental-monitoring",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://mobility.api.opendatahub.com/v2",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "environmental_monitoring": {},
            },
        },
        "entity": {
      "environmental_monitoring": {
        "fields": [
          {
            "name": "mperiod",
            "title": "Mperiod",
            "type": "`$INTEGER`",
            "short": "Measurement period in seconds",
          },
          {
            "name": "mtransactiontime",
            "title": "Mtransactiontime",
            "type": "`$STRING`",
            "short": "Timestamp when the data was recorded in the database",
            "format": "date-time",
          },
          {
            "name": "mvalidtime",
            "title": "Mvalidtime",
            "type": "`$STRING`",
            "short": "Timestamp when the measurement was taken",
            "format": "date-time",
          },
          {
            "name": "mvalue",
            "title": "Mvalue",
            "type": "`$NUMBER`",
            "short": "Measured value",
            "format": "double",
          },
          {
            "name": "sactive",
            "title": "Sactive",
            "type": "`$BOOLEAN`",
            "short": "Whether the station is currently active",
          },
          {
            "name": "savailable",
            "title": "Savailable",
            "type": "`$BOOLEAN`",
            "short": "Whether the station data is available",
          },
          {
            "name": "scode",
            "title": "Scode",
            "type": "`$STRING`",
            "short": "Unique station code identifier",
          },
          {
            "name": "scoordinate",
            "title": "Scoordinate",
            "type": "`$OBJECT`",
            "short": "Geographic coordinates of the station",
          },
          {
            "name": "smetadata",
            "title": "Smetadata",
            "type": "`$OBJECT`",
            "short": "Additional metadata about the station",
          },
          {
            "name": "sname",
            "title": "Sname",
            "type": "`$STRING`",
            "short": "Human-readable station name",
          },
          {
            "name": "stype",
            "title": "Stype",
            "type": "`$STRING`",
            "short": "Station type",
          },
          {
            "name": "tdescription",
            "title": "Tdescription",
            "type": "`$STRING`",
            "short": "Description of the measurement type",
          },
          {
            "name": "tmetadata",
            "title": "Tmetadata",
            "type": "`$OBJECT`",
            "short": "Additional metadata about the measurement type",
          },
          {
            "name": "tname",
            "title": "Tname",
            "type": "`$STRING`",
            "short": "Type of measurement",
          },
          {
            "name": "tunit",
            "title": "Tunit",
            "type": "`$STRING`",
            "short": "Unit of measurement",
          },
        ],
        "name": "environmental_monitoring",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/flat/EnvironmentStation",
                "segments": [
                  {
                    "lit": "flat",
                  },
                  {
                    "lit": "EnvironmentStation",
                  },
                ],
                "parts": [
                  "flat",
                  "EnvironmentStation",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "distinct",
                      "orig": "distinct",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 200,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "select",
                      "orig": "select",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "scode,sname,scoordinate,mvalidtime,mvalue",
                    },
                    {
                      "name": "where",
                      "orig": "where",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "sactive.eq.true",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "distinct",
                    "limit",
                    "offset",
                    "select",
                    "where",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
