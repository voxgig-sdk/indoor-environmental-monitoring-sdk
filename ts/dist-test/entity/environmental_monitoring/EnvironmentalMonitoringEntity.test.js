"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EnvironmentalMonitoringEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IndoorEnvironmentalMonitoringSDK.test();
        const ent = testsdk.EnvironmentalMonitoring();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('environmental_monitoring hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.IndoorEnvironmentalMonitoringSDK.test(offline).EnvironmentalMonitoring().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.IndoorEnvironmentalMonitoringSDK.test(offline).EnvironmentalMonitoring()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.IndoorEnvironmentalMonitoringSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.EnvironmentalMonitoring().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.IndoorEnvironmentalMonitoringSDK.test().EnvironmentalMonitoring().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.IndoorEnvironmentalMonitoringSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.EnvironmentalMonitoring().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.EnvironmentalMonitoring().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.IndoorEnvironmentalMonitoringSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.EnvironmentalMonitoring().list({ "distinct": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'environmental_monitoring.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "mperiod": { "a": true, "h": "Mperiod", "n": "mperiod", "r": false, "sh": "Measurement period in seconds", "t": "`$INTEGER`", "key$": "mperiod", "index$": 0 }, "mtransactiontime": { "a": true, "fo": "date-time", "h": "Mtransactiontime", "n": "mtransactiontime", "r": false, "sh": "Timestamp when the data was recorded in the database", "t": "`$STRING`", "key$": "mtransactiontime", "index$": 1 }, "mvalidtime": { "a": true, "fo": "date-time", "h": "Mvalidtime", "n": "mvalidtime", "r": false, "sh": "Timestamp when the measurement was taken", "t": "`$STRING`", "key$": "mvalidtime", "index$": 2 }, "mvalue": { "a": true, "fo": "double", "h": "Mvalue", "n": "mvalue", "r": false, "sh": "Measured value", "t": "`$NUMBER`", "key$": "mvalue", "index$": 3 }, "sactive": { "a": true, "h": "Sactive", "n": "sactive", "r": false, "sh": "Whether the station is currently active", "t": "`$BOOLEAN`", "key$": "sactive", "index$": 4 }, "savailable": { "a": true, "h": "Savailable", "n": "savailable", "r": false, "sh": "Whether the station data is available", "t": "`$BOOLEAN`", "key$": "savailable", "index$": 5 }, "scode": { "a": true, "h": "Scode", "n": "scode", "r": false, "sh": "Unique station code identifier", "t": "`$STRING`", "key$": "scode", "index$": 6 }, "scoordinate": { "a": true, "h": "Scoordinate", "n": "scoordinate", "r": false, "sh": "Geographic coordinates of the station", "t": "`$OBJECT`", "key$": "scoordinate", "index$": 7 }, "smetadata": { "a": true, "h": "Smetadata", "n": "smetadata", "r": false, "sh": "Additional metadata about the station", "t": "`$OBJECT`", "key$": "smetadata", "index$": 8 }, "sname": { "a": true, "h": "Sname", "n": "sname", "r": false, "sh": "Human-readable station name", "t": "`$STRING`", "key$": "sname", "index$": 9 }, "stype": { "a": true, "h": "Stype", "n": "stype", "r": false, "sh": "Station type", "t": "`$STRING`", "key$": "stype", "index$": 10 }, "tdescription": { "a": true, "h": "Tdescription", "n": "tdescription", "r": false, "sh": "Description of the measurement type", "t": "`$STRING`", "key$": "tdescription", "index$": 11 }, "tmetadata": { "a": true, "h": "Tmetadata", "n": "tmetadata", "r": false, "sh": "Additional metadata about the measurement type", "t": "`$OBJECT`", "key$": "tmetadata", "index$": 12 }, "tname": { "a": true, "h": "Tname", "n": "tname", "r": false, "sh": "Type of measurement", "t": "`$STRING`", "key$": "tname", "index$": 13 }, "tunit": { "a": true, "h": "Tunit", "n": "tunit", "r": false, "sh": "Unit of measurement", "t": "`$STRING`", "key$": "tunit", "index$": 14 } }, "name": "environmental_monitoring", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /flat/EnvironmentStation", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": false, "k": "query", "n": "distinct", "or": "distinct", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 200, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": "scode,sname,scoordinate,mvalidtime,mvalue", "k": "query", "n": "select", "or": "select", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "sactive.eq.true", "k": "query", "n": "where", "or": "where", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/flat/EnvironmentStation", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "flat" }, { "lit": "EnvironmentStation" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "environmental_monitoring", "name__orig": "environmental_monitoring", "Name": "EnvironmentalMonitoring", "name_": "environmental_monitoring", "name-": "environmental-monitoring", "NAME": "ENVIRONMENTAL_MONITORING", "index$": 0 }, { "active": true, "entity": "environmental_monitoring", "key$": "BasicEnvironmentalMonitoringFlow", "kind": "basic", "name": "BasicEnvironmentalMonitoringFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "environmental_monitoring_ref01" } }], "index$": 0 }] }, 'EnvironmentalMonitoring', { "GET /flat/EnvironmentStation": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "description": "Maximum number of records to return", "required": false, "schema": { "type": "integer", "default": 200, "minimum": 1, "maximum": 1000 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "Number of records to skip for pagination", "required": false, "schema": { "type": "integer", "default": 0, "minimum": 0 }, "index$": 1 }, { "name": "where", "in": "query", "description": "Filter criteria in SQL-like syntax", "required": false, "schema": { "type": "string" }, "example": "sactive.eq.true", "index$": 2 }, { "name": "select", "in": "query", "description": "Comma-separated list of fields to return", "required": false, "schema": { "type": "string" }, "example": "scode,sname,scoordinate,mvalidtime,mvalue", "index$": 3 }, { "name": "distinct", "in": "query", "description": "Return distinct values only", "required": false, "schema": { "type": "boolean", "default": false }, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let environmental_monitoring_ref01_data = Object.values(setup.data.existing.environmental_monitoring)[0];
        // LIST
        const environmental_monitoring_ref01_ent = client.EnvironmentalMonitoring();
        const environmental_monitoring_ref01_match = {};
        const environmental_monitoring_ref01_list = (await environmental_monitoring_ref01_ent.list(environmental_monitoring_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/environmental_monitoring/EnvironmentalMonitoringTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IndoorEnvironmentalMonitoringSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['environmental_monitoring01', 'environmental_monitoring02', 'environmental_monitoring03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'INDOOR_ENVIRONMENTAL_MONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID': idmap,
        'INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE': 'FALSE',
        'INDOOR_ENVIRONMENTAL_MONITORING_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['INDOOR_ENVIRONMENTAL_MONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID'];
    const live = 'TRUE' === env.INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['INDOOR_ENVIRONMENTAL_MONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IndoorEnvironmentalMonitoringSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.INDOOR_ENVIRONMENTAL_MONITORING_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=EnvironmentalMonitoringEntity.test.js.map