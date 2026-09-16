

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IndoorEnvironmentalMonitoringSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('EnvironmentalMonitoringEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IndoorEnvironmentalMonitoringSDK.test()
    const ent = testsdk.EnvironmentalMonitoring()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'environmental_monitoring.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"mperiod","req":false,"short":"Measurement period in seconds","type":"`$INTEGER`","index$":0},{"active":true,"format":"date-time","name":"mtransactiontime","req":false,"short":"Timestamp when the data was recorded in the database","type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"mvalidtime","req":false,"short":"Timestamp when the measurement was taken","type":"`$STRING`","index$":2},{"active":true,"format":"double","name":"mvalue","req":false,"short":"Measured value","type":"`$NUMBER`","index$":3},{"active":true,"name":"sactive","req":false,"short":"Whether the station is currently active","type":"`$BOOLEAN`","index$":4},{"active":true,"name":"savailable","req":false,"short":"Whether the station data is available","type":"`$BOOLEAN`","index$":5},{"active":true,"name":"scode","req":false,"short":"Unique station code identifier","type":"`$STRING`","index$":6},{"active":true,"name":"scoordinate","req":false,"short":"Geographic coordinates of the station","type":"`$OBJECT`","index$":7},{"active":true,"name":"smetadata","req":false,"short":"Additional metadata about the station","type":"`$OBJECT`","index$":8},{"active":true,"name":"sname","req":false,"short":"Human-readable station name","type":"`$STRING`","index$":9},{"active":true,"name":"stype","req":false,"short":"Station type","type":"`$STRING`","index$":10},{"active":true,"name":"tdescription","req":false,"short":"Description of the measurement type","type":"`$STRING`","index$":11},{"active":true,"name":"tmetadata","req":false,"short":"Additional metadata about the measurement type","type":"`$OBJECT`","index$":12},{"active":true,"name":"tname","req":false,"short":"Type of measurement","type":"`$STRING`","index$":13},{"active":true,"name":"tunit","req":false,"short":"Unit of measurement","type":"`$STRING`","index$":14}],"name":"environmental_monitoring","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":false,"kind":"query","name":"distinct","orig":"distinct","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"example":200,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":"scode,sname,scoordinate,mvalidtime,mvalue","kind":"query","name":"select","orig":"select","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":"sactive.eq.true","kind":"query","name":"where","orig":"where","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /flat/EnvironmentStation","json":"{\"operationId\":\"getEnvironmentalData\",\"parameters\":[{\"description\":\"Maximum number of records to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":200,\"maximum\":1000,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of records to skip for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Filter criteria in SQL-like syntax\",\"example\":\"sactive.eq.true\",\"in\":\"query\",\"name\":\"where\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of fields to return\",\"example\":\"scode,sname,scoordinate,mvalidtime,mvalue\",\"in\":\"query\",\"name\":\"select\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Return distinct values only\",\"in\":\"query\",\"name\":\"distinct\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"environmentalData\":{\"summary\":\"Example environmental monitoring data\",\"value\":{\"data\":[{\"mperiod\":300,\"mtransactiontime\":\"2023-10-15T14:30:00Z\",\"mvalidtime\":\"2023-10-15T14:25:00Z\",\"mvalue\":22.5,\"sactive\":true,\"scode\":\"NOI-BZ-01\",\"scoordinate\":{\"x\":11.3568,\"y\":46.4983},\"sname\":\"NOI Techpark Bolzano - Office Area 1\",\"stype\":\"EnvironmentStation\",\"tname\":\"temperature\",\"tunit\":\"°C\"}],\"limit\":200,\"offset\":0}}},\"schema\":{\"properties\":{\"data\":{\"items\":{\"description\":\"Environmental monitoring station data with measurements\",\"properties\":{\"mperiod\":{\"description\":\"Measurement period in seconds\",\"type\":\"integer\"},\"mtransactiontime\":{\"description\":\"Timestamp when the data was recorded in the database\",\"format\":\"date-time\",\"type\":\"string\"},\"mvalidtime\":{\"description\":\"Timestamp when the measurement was taken\",\"format\":\"date-time\",\"type\":\"string\"},\"mvalue\":{\"description\":\"Measured value\",\"format\":\"double\",\"type\":\"number\"},\"sactive\":{\"description\":\"Whether the station is currently active\",\"type\":\"boolean\"},\"savailable\":{\"description\":\"Whether the station data is available\",\"type\":\"boolean\"},\"scode\":{\"description\":\"Unique station code identifier\",\"type\":\"string\"},\"scoordinate\":{\"description\":\"Geographic coordinates of the station\",\"properties\":{\"srid\":{\"default\":4326,\"description\":\"Spatial Reference System Identifier\",\"type\":\"integer\"},\"x\":{\"description\":\"Longitude\",\"format\":\"double\",\"type\":\"number\"},\"y\":{\"description\":\"Latitude\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"smetadata\":{\"description\":\"Additional metadata about the station\",\"type\":\"object\"},\"sname\":{\"description\":\"Human-readable station name\",\"type\":\"string\"},\"stype\":{\"description\":\"Station type\",\"example\":\"EnvironmentStation\",\"type\":\"string\"},\"tdescription\":{\"description\":\"Description of the measurement type\",\"type\":\"string\"},\"tmetadata\":{\"description\":\"Additional metadata about the measurement type\",\"type\":\"object\"},\"tname\":{\"description\":\"Type of measurement\",\"enum\":[\"temperature\",\"humidity\",\"co2\",\"pressure\",\"air-quality-index\"],\"type\":\"string\"},\"tunit\":{\"description\":\"Unit of measurement\",\"example\":\"°C, %, ppm\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"limit\":{\"description\":\"Current limit for pagination\",\"type\":\"integer\"},\"offset\":{\"description\":\"Current offset for pagination\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with environmental monitoring data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"timestamp\":{\"description\":\"Timestamp of the error\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"timestamp\":{\"description\":\"Timestamp of the error\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/flat/EnvironmentStation","segments":[{"lit":"flat"},{"lit":"EnvironmentStation"}],"select":{"exist":["distinct","limit","offset","select","where"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"environmental_monitoring","name__orig":"environmental_monitoring","Name":"EnvironmentalMonitoring","name_":"environmental_monitoring","name-":"environmental-monitoring","NAME":"ENVIRONMENTAL_MONITORING","index$":0}, {"active":true,"entity":"environmental_monitoring","key$":"BasicEnvironmentalMonitoringFlow","kind":"basic","name":"BasicEnvironmentalMonitoringFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"environmental_monitoring_ref01"}}],"index$":0}]}, 'EnvironmentalMonitoring')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let environmental_monitoring_ref01_data = Object.values(setup.data.existing.environmental_monitoring)[0] as any

    // LIST
    const environmental_monitoring_ref01_ent = client.EnvironmentalMonitoring()
    const environmental_monitoring_ref01_match: any = {}

    const environmental_monitoring_ref01_list = (await environmental_monitoring_ref01_ent.list(environmental_monitoring_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/environmental_monitoring/EnvironmentalMonitoringTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IndoorEnvironmentalMonitoringSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['environmental_monitoring01','environmental_monitoring02','environmental_monitoring03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'INDOOR_ENVIRONMENTAL_MONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID': idmap,
    'INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE': 'FALSE',
    'INDOOR_ENVIRONMENTAL_MONITORING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['INDOOR_ENVIRONMENTAL_MONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID']

  const live = 'TRUE' === env.INDOOR_ENVIRONMENTAL_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['INDOOR_ENVIRONMENTAL_MONITORING_TEST_ENVIRONMENTAL_MONITORING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IndoorEnvironmentalMonitoringSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
