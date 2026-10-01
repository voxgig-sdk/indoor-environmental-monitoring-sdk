"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "environmental_monitoring",
        "accessor": "EnvironmentalMonitoring",
        "op": "list",
        "method": "GET",
        "path": "/flat/EnvironmentStation",
        "args": [],
        "select": {
            "distinct": "v1",
            "limit": "v1",
            "offset": "v1",
            "select": "scode,sname,scoordinate,mvalidtime,mvalue",
            "where": "sactive.eq.true"
        },
        "headers": [],
        "query": [
            "limit",
            "offset",
            "where",
            "select",
            "distinct"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "scode": "NOI-BZ-01",
                    "sname": "NOI Techpark Bolzano - Office Area 1",
                    "stype": "EnvironmentStation",
                    "scoordinate": {
                        "x": 11.3568,
                        "y": 46.4983
                    },
                    "sactive": true,
                    "mperiod": 300,
                    "mtransactiontime": "2023-10-15T14:30:00Z",
                    "mvalidtime": "2023-10-15T14:25:00Z",
                    "mvalue": 22.5,
                    "tname": "temperature",
                    "tunit": "°C"
                }
            ],
            "offset": 0,
            "limit": 200
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map