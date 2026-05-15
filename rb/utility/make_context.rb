# IndoorEnvironmentalMonitoring SDK utility: make_context
require_relative '../core/context'
module IndoorEnvironmentalMonitoringUtilities
  MakeContext = ->(ctxmap, basectx) {
    IndoorEnvironmentalMonitoringContext.new(ctxmap, basectx)
  }
end
