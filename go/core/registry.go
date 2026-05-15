package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEnvironmentalMonitoringEntityFunc func(client *IndoorEnvironmentalMonitoringSDK, entopts map[string]any) IndoorEnvironmentalMonitoringEntity

