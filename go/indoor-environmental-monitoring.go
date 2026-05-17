package voxgigindoorenvironmentalmonitoringsdk

import (
	"github.com/voxgig-sdk/indoor-environmental-monitoring-sdk/go/core"
	"github.com/voxgig-sdk/indoor-environmental-monitoring-sdk/go/entity"
	"github.com/voxgig-sdk/indoor-environmental-monitoring-sdk/go/feature"
	_ "github.com/voxgig-sdk/indoor-environmental-monitoring-sdk/go/utility"
)

// Type aliases preserve external API.
type IndoorEnvironmentalMonitoringSDK = core.IndoorEnvironmentalMonitoringSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IndoorEnvironmentalMonitoringEntity = core.IndoorEnvironmentalMonitoringEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IndoorEnvironmentalMonitoringError = core.IndoorEnvironmentalMonitoringError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEnvironmentalMonitoringEntityFunc = func(client *core.IndoorEnvironmentalMonitoringSDK, entopts map[string]any) core.IndoorEnvironmentalMonitoringEntity {
		return entity.NewEnvironmentalMonitoringEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIndoorEnvironmentalMonitoringSDK = core.NewIndoorEnvironmentalMonitoringSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
