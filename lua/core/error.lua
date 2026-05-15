-- IndoorEnvironmentalMonitoring SDK error

local IndoorEnvironmentalMonitoringError = {}
IndoorEnvironmentalMonitoringError.__index = IndoorEnvironmentalMonitoringError


function IndoorEnvironmentalMonitoringError.new(code, msg, ctx)
  local self = setmetatable({}, IndoorEnvironmentalMonitoringError)
  self.is_sdk_error = true
  self.sdk = "IndoorEnvironmentalMonitoring"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IndoorEnvironmentalMonitoringError:error()
  return self.msg
end


function IndoorEnvironmentalMonitoringError:__tostring()
  return self.msg
end


return IndoorEnvironmentalMonitoringError
