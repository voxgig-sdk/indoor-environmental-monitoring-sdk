import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "environmental_monitoring",
    "accessor": "EnvironmentalMonitoring",
    "op": "list",
    "method": "GET",
    "path": "/flat/EnvironmentStation",
    "args": [],
    "select": {
      "distinct": "v1",
      "limit": 200,
      "offset": 0,
      "select": "scode,sname,scoordinate,mvalidtime,mvalue",
      "where": "sactive.eq.true"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset",
      "where",
      "select",
      "distinct"
    ],
    "queryArgs": [
      {
        "name": "distinct",
        "wire": "distinct"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      },
      {
        "name": "select",
        "wire": "select"
      },
      {
        "name": "where",
        "wire": "where"
      }
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
