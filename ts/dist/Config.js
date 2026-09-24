"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'IndoorEnvironmentalMonitoring',
        slug: "indoor-environmental-monitoring",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://mobility.api.opendatahub.com/v2",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            environmental_monitoring: {},
        }
    };
    entity = {
        "environmental_monitoring": {
            "fields": [
                {
                    "name": "mperiod",
                    "title": "Mperiod",
                    "type": "`$INTEGER`",
                    "short": "Measurement period in seconds"
                },
                {
                    "name": "mtransactiontime",
                    "title": "Mtransactiontime",
                    "type": "`$STRING`",
                    "short": "Timestamp when the data was recorded in the database",
                    "format": "date-time"
                },
                {
                    "name": "mvalidtime",
                    "title": "Mvalidtime",
                    "type": "`$STRING`",
                    "short": "Timestamp when the measurement was taken",
                    "format": "date-time"
                },
                {
                    "name": "mvalue",
                    "title": "Mvalue",
                    "type": "`$NUMBER`",
                    "short": "Measured value",
                    "format": "double"
                },
                {
                    "name": "sactive",
                    "title": "Sactive",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the station is currently active"
                },
                {
                    "name": "savailable",
                    "title": "Savailable",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the station data is available"
                },
                {
                    "name": "scode",
                    "title": "Scode",
                    "type": "`$STRING`",
                    "short": "Unique station code identifier"
                },
                {
                    "name": "scoordinate",
                    "title": "Scoordinate",
                    "type": "`$OBJECT`",
                    "short": "Geographic coordinates of the station"
                },
                {
                    "name": "smetadata",
                    "title": "Smetadata",
                    "type": "`$OBJECT`",
                    "short": "Additional metadata about the station"
                },
                {
                    "name": "sname",
                    "title": "Sname",
                    "type": "`$STRING`",
                    "short": "Human-readable station name"
                },
                {
                    "name": "stype",
                    "title": "Stype",
                    "type": "`$STRING`",
                    "short": "Station type"
                },
                {
                    "name": "tdescription",
                    "title": "Tdescription",
                    "type": "`$STRING`",
                    "short": "Description of the measurement type"
                },
                {
                    "name": "tmetadata",
                    "title": "Tmetadata",
                    "type": "`$OBJECT`",
                    "short": "Additional metadata about the measurement type"
                },
                {
                    "name": "tname",
                    "title": "Tname",
                    "type": "`$STRING`",
                    "short": "Type of measurement"
                },
                {
                    "name": "tunit",
                    "title": "Tunit",
                    "type": "`$STRING`",
                    "short": "Unit of measurement"
                }
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
                                    "lit": "flat"
                                },
                                {
                                    "lit": "EnvironmentStation"
                                }
                            ],
                            "parts": [
                                "flat",
                                "EnvironmentStation"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "distinct",
                                        "orig": "distinct",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 200
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "select",
                                        "orig": "select",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "scode,sname,scoordinate,mvalidtime,mvalue"
                                    },
                                    {
                                        "name": "where",
                                        "orig": "where",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "sactive.eq.true"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "distinct",
                                    "limit",
                                    "offset",
                                    "select",
                                    "where"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map