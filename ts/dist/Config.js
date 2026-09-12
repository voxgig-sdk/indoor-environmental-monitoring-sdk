"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
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
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
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
                    "short": "Measurement period in seconds",
                    "type": "`$INTEGER`"
                },
                {
                    "format": "date-time",
                    "name": "mtransactiontime",
                    "short": "Timestamp when the data was recorded in the database",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "mvalidtime",
                    "short": "Timestamp when the measurement was taken",
                    "type": "`$STRING`"
                },
                {
                    "format": "double",
                    "name": "mvalue",
                    "short": "Measured value",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "sactive",
                    "short": "Whether the station is currently active",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "savailable",
                    "short": "Whether the station data is available",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "scode",
                    "short": "Unique station code identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "scoordinate",
                    "short": "Geographic coordinates of the station",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "smetadata",
                    "short": "Additional metadata about the station",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "sname",
                    "short": "Human-readable station name",
                    "type": "`$STRING`"
                },
                {
                    "name": "stype",
                    "short": "Station type",
                    "type": "`$STRING`"
                },
                {
                    "name": "tdescription",
                    "short": "Description of the measurement type",
                    "type": "`$STRING`"
                },
                {
                    "name": "tmetadata",
                    "short": "Additional metadata about the measurement type",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "tname",
                    "short": "Type of measurement",
                    "type": "`$STRING`"
                },
                {
                    "name": "tunit",
                    "short": "Unit of measurement",
                    "type": "`$STRING`"
                }
            ],
            "name": "environmental_monitoring",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": false,
                                        "kind": "query",
                                        "name": "distinct",
                                        "orig": "distinct",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": 200,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "scode,sname,scoordinate,mvalidtime,mvalue",
                                        "kind": "query",
                                        "name": "select",
                                        "orig": "select",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "sactive.eq.true",
                                        "kind": "query",
                                        "name": "where",
                                        "orig": "where",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
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
                            "select": {
                                "exist": [
                                    "distinct",
                                    "limit",
                                    "offset",
                                    "select",
                                    "where"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "parts": [
                                "flat",
                                "EnvironmentStation"
                            ]
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