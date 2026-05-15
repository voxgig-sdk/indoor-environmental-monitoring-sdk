# IndoorEnvironmentalMonitoring SDK utility: feature_add
module IndoorEnvironmentalMonitoringUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
