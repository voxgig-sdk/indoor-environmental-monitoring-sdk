# IndoorEnvironmentalMonitoring SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IndoorEnvironmentalMonitoringFeatures
  def self.make_feature(name)
    case name
    when "base"
      IndoorEnvironmentalMonitoringBaseFeature.new
    when "test"
      IndoorEnvironmentalMonitoringTestFeature.new
    else
      IndoorEnvironmentalMonitoringBaseFeature.new
    end
  end
end
