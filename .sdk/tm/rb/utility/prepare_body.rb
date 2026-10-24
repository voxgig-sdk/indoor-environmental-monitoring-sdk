# IndoorEnvironmentalMonitoring SDK utility: prepare_body
require_relative 'media'
module IndoorEnvironmentalMonitoringUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return IndoorEnvironmentalMonitoringUtilities.raw_body(ctx.reqdata) if IndoorEnvironmentalMonitoringUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
