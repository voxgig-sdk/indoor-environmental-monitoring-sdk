# IndoorEnvironmentalMonitoring SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IndoorEnvironmentalMonitoringUtility.registrar = ->(u) {
  u.clean = IndoorEnvironmentalMonitoringUtilities::Clean
  u.done = IndoorEnvironmentalMonitoringUtilities::Done
  u.make_error = IndoorEnvironmentalMonitoringUtilities::MakeError
  u.feature_add = IndoorEnvironmentalMonitoringUtilities::FeatureAdd
  u.feature_hook = IndoorEnvironmentalMonitoringUtilities::FeatureHook
  u.feature_init = IndoorEnvironmentalMonitoringUtilities::FeatureInit
  u.fetcher = IndoorEnvironmentalMonitoringUtilities::Fetcher
  u.make_fetch_def = IndoorEnvironmentalMonitoringUtilities::MakeFetchDef
  u.make_context = IndoorEnvironmentalMonitoringUtilities::MakeContext
  u.make_options = IndoorEnvironmentalMonitoringUtilities::MakeOptions
  u.make_request = IndoorEnvironmentalMonitoringUtilities::MakeRequest
  u.make_response = IndoorEnvironmentalMonitoringUtilities::MakeResponse
  u.make_result = IndoorEnvironmentalMonitoringUtilities::MakeResult
  u.make_point = IndoorEnvironmentalMonitoringUtilities::MakePoint
  u.make_spec = IndoorEnvironmentalMonitoringUtilities::MakeSpec
  u.make_url = IndoorEnvironmentalMonitoringUtilities::MakeUrl
  u.param = IndoorEnvironmentalMonitoringUtilities::Param
  u.prepare_auth = IndoorEnvironmentalMonitoringUtilities::PrepareAuth
  u.prepare_body = IndoorEnvironmentalMonitoringUtilities::PrepareBody
  u.prepare_headers = IndoorEnvironmentalMonitoringUtilities::PrepareHeaders
  u.prepare_method = IndoorEnvironmentalMonitoringUtilities::PrepareMethod
  u.prepare_params = IndoorEnvironmentalMonitoringUtilities::PrepareParams
  u.prepare_path = IndoorEnvironmentalMonitoringUtilities::PreparePath
  u.prepare_query = IndoorEnvironmentalMonitoringUtilities::PrepareQuery
  u.result_basic = IndoorEnvironmentalMonitoringUtilities::ResultBasic
  u.result_body = IndoorEnvironmentalMonitoringUtilities::ResultBody
  u.result_headers = IndoorEnvironmentalMonitoringUtilities::ResultHeaders
  u.transform_request = IndoorEnvironmentalMonitoringUtilities::TransformRequest
  u.transform_response = IndoorEnvironmentalMonitoringUtilities::TransformResponse
}
