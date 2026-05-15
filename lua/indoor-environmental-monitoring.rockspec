package = "voxgig-sdk-indoor-environmental-monitoring"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/indoor-environmental-monitoring-sdk.git"
}
description = {
  summary = "IndoorEnvironmentalMonitoring SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["indoor-environmental-monitoring_sdk"] = "indoor-environmental-monitoring_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
