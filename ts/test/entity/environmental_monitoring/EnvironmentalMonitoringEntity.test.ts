

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"mperiod":{"a":true,"h":"Mperiod","n":"mperiod","r":false,"sh":"Measurement period in seconds","t":"`$INTEGER`","key$":"mperiod","index$":0},"mtransactiontime":{"a":true,"fo":"date-time","h":"Mtransactiontime","n":"mtransactiontime","r":false,"sh":"Timestamp when the data was recorded in the database","t":"`$STRING`","key$":"mtransactiontime","index$":1},"mvalidtime":{"a":true,"fo":"date-time","h":"Mvalidtime","n":"mvalidtime","r":false,"sh":"Timestamp when the measurement was taken","t":"`$STRING`","key$":"mvalidtime","index$":2},"mvalue":{"a":true,"fo":"double","h":"Mvalue","n":"mvalue","r":false,"sh":"Measured value","t":"`$NUMBER`","key$":"mvalue","index$":3},"sactive":{"a":true,"h":"Sactive","n":"sactive","r":false,"sh":"Whether the station is currently active","t":"`$BOOLEAN`","key$":"sactive","index$":4},"savailable":{"a":true,"h":"Savailable","n":"savailable","r":false,"sh":"Whether the station data is available","t":"`$BOOLEAN`","key$":"savailable","index$":5},"scode":{"a":true,"h":"Scode","n":"scode","r":false,"sh":"Unique station code identifier","t":"`$STRING`","key$":"scode","index$":6},"scoordinate":{"a":true,"h":"Scoordinate","n":"scoordinate","r":false,"sh":"Geographic coordinates of the station","t":"`$OBJECT`","key$":"scoordinate","index$":7},"smetadata":{"a":true,"h":"Smetadata","n":"smetadata","r":false,"sh":"Additional metadata about the station","t":"`$OBJECT`","key$":"smetadata","index$":8},"sname":{"a":true,"h":"Sname","n":"sname","r":false,"sh":"Human-readable station name","t":"`$STRING`","key$":"sname","index$":9},"stype":{"a":true,"h":"Stype","n":"stype","r":false,"sh":"Station type","t":"`$STRING`","key$":"stype","index$":10},"tdescription":{"a":true,"h":"Tdescription","n":"tdescription","r":false,"sh":"Description of the measurement type","t":"`$STRING`","key$":"tdescription","index$":11},"tmetadata":{"a":true,"h":"Tmetadata","n":"tmetadata","r":false,"sh":"Additional metadata about the measurement type","t":"`$OBJECT`","key$":"tmetadata","index$":12},"tname":{"a":true,"h":"Tname","n":"tname","r":false,"sh":"Type of measurement","t":"`$STRING`","key$":"tname","index$":13},"tunit":{"a":true,"h":"Tunit","n":"tunit","r":false,"sh":"Unit of measurement","t":"`$STRING`","key$":"tunit","index$":14}},"name":"environmental_monitoring","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /flat/EnvironmentStation","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"distinct","or":"distinct","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":200,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"scode,sname,scoordinate,mvalidtime,mvalue","k":"query","n":"select","or":"select","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"sactive.eq.true","k":"query","n":"where","or":"where","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/flat/EnvironmentStation","q":{"exist":["distinct","limit","offset","select","where"]},"r":{},"s":[{"lit":"flat"},{"lit":"EnvironmentStation"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"environmental_monitoring","name__orig":"environmental_monitoring","Name":"EnvironmentalMonitoring","name_":"environmental_monitoring","name-":"environmental-monitoring","NAME":"ENVIRONMENTAL_MONITORING","index$":0}, {"active":true,"entity":"environmental_monitoring","key$":"BasicEnvironmentalMonitoringFlow","kind":"basic","name":"BasicEnvironmentalMonitoringFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"environmental_monitoring_ref01"}}],"index$":0}]}, 'EnvironmentalMonitoring', {"GET /flat/EnvironmentStation":{"protocol":"http","operationId":"getEnvironmentalData","responses":{"200":{"description":"Successful response with environmental monitoring data","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"description":"Environmental monitoring station data with measurements","properties":{"mperiod":{"description":"Measurement period in seconds","type":"integer","key$":"mperiod"},"mtransactiontime":{"description":"Timestamp when the data was recorded in the database","format":"date-time","type":"string","key$":"mtransactiontime"},"mvalidtime":{"description":"Timestamp when the measurement was taken","format":"date-time","type":"string","key$":"mvalidtime"},"mvalue":{"description":"Measured value","format":"double","type":"number","key$":"mvalue"},"sactive":{"description":"Whether the station is currently active","type":"boolean","key$":"sactive"},"savailable":{"description":"Whether the station data is available","type":"boolean","key$":"savailable"},"scode":{"description":"Unique station code identifier","type":"string","key$":"scode"},"scoordinate":{"description":"Geographic coordinates of the station","properties":{"srid":{"default":4326,"description":"Spatial Reference System Identifier","type":"integer"},"x":{"description":"Longitude","format":"double","type":"number"},"y":{"description":"Latitude","format":"double","type":"number"}},"type":"object","key$":"scoordinate"},"smetadata":{"description":"Additional metadata about the station","type":"object","key$":"smetadata"},"sname":{"description":"Human-readable station name","type":"string","key$":"sname"},"stype":{"description":"Station type","example":"EnvironmentStation","type":"string","key$":"stype"},"tdescription":{"description":"Description of the measurement type","type":"string","key$":"tdescription"},"tmetadata":{"description":"Additional metadata about the measurement type","type":"object","key$":"tmetadata"},"tname":{"description":"Type of measurement","enum":["temperature","humidity","co2","pressure","air-quality-index"],"type":"string","key$":"tname"},"tunit":{"description":"Unit of measurement","example":"°C, %, ppm","type":"string","key$":"tunit"}},"type":"object","x-ref":"#/components/schemas/EnvironmentalStation","index$":0},"key$":"data","type":"array"},"offset":{"description":"Current offset for pagination","key$":"offset","type":"integer"},"limit":{"description":"Current limit for pagination","key$":"limit","type":"integer"}}},"examples":{"environmentalData":{"summary":"Example environmental monitoring data","value":{"data":[{"scode":"NOI-BZ-01","sname":"NOI Techpark Bolzano - Office Area 1","stype":"EnvironmentStation","scoordinate":{"x":11.3568,"y":46.4983},"sactive":true,"mperiod":300,"mtransactiontime":"2023-10-15T14:30:00Z","mvalidtime":"2023-10-15T14:25:00Z","mvalue":22.5,"tname":"temperature","tunit":"°C"}],"offset":0,"limit":200}}}}}},"400":{"description":"Bad request - Invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"message":{"type":"string","description":"Error message"},"timestamp":{"type":"string","format":"date-time","description":"Timestamp of the error"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"message":{"type":"string","description":"Error message"},"timestamp":{"type":"string","format":"date-time","description":"Timestamp of the error"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"limit","in":"query","description":"Maximum number of records to return","required":false,"schema":{"type":"integer","default":200,"minimum":1,"maximum":1000},"index$":0},{"name":"offset","in":"query","description":"Number of records to skip for pagination","required":false,"schema":{"type":"integer","default":0,"minimum":0},"index$":1},{"name":"where","in":"query","description":"Filter criteria in SQL-like syntax","required":false,"schema":{"type":"string"},"example":"sactive.eq.true","index$":2},{"name":"select","in":"query","description":"Comma-separated list of fields to return","required":false,"schema":{"type":"string"},"example":"scode,sname,scoordinate,mvalidtime,mvalue","index$":3},{"name":"distinct","in":"query","description":"Return distinct values only","required":false,"schema":{"type":"boolean","default":false},"index$":4}],"securitySource":"unspecified"}})
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
  
