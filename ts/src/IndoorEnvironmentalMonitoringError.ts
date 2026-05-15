
import { Context } from './Context'


class IndoorEnvironmentalMonitoringError extends Error {

  isIndoorEnvironmentalMonitoringError = true

  sdk = 'IndoorEnvironmentalMonitoring'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IndoorEnvironmentalMonitoringError
}

