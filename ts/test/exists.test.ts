
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IndoorEnvironmentalMonitoringSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IndoorEnvironmentalMonitoringSDK.test()
    equal(testsdk instanceof IndoorEnvironmentalMonitoringSDK, true,
      'IndoorEnvironmentalMonitoringSDK.test() must return a client synchronously')
  })

})
