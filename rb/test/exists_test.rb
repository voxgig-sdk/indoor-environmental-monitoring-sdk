# IndoorEnvironmentalMonitoring SDK exists test

require "minitest/autorun"
require_relative "../IndoorEnvironmentalMonitoring_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = IndoorEnvironmentalMonitoringSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
