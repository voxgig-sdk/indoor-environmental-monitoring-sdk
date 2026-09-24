package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "IndoorEnvironmentalMonitoring",
			"slug": "indoor-environmental-monitoring",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://mobility.api.opendatahub.com/v2",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"environmental_monitoring": map[string]any{},
			},
		},
		"entity": map[string]any{
			"environmental_monitoring": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "mperiod",
						"title": "Mperiod",
						"type": "`$INTEGER`",
						"short": "Measurement period in seconds",
					},
					map[string]any{
						"name": "mtransactiontime",
						"title": "Mtransactiontime",
						"type": "`$STRING`",
						"short": "Timestamp when the data was recorded in the database",
						"format": "date-time",
					},
					map[string]any{
						"name": "mvalidtime",
						"title": "Mvalidtime",
						"type": "`$STRING`",
						"short": "Timestamp when the measurement was taken",
						"format": "date-time",
					},
					map[string]any{
						"name": "mvalue",
						"title": "Mvalue",
						"type": "`$NUMBER`",
						"short": "Measured value",
						"format": "double",
					},
					map[string]any{
						"name": "sactive",
						"title": "Sactive",
						"type": "`$BOOLEAN`",
						"short": "Whether the station is currently active",
					},
					map[string]any{
						"name": "savailable",
						"title": "Savailable",
						"type": "`$BOOLEAN`",
						"short": "Whether the station data is available",
					},
					map[string]any{
						"name": "scode",
						"title": "Scode",
						"type": "`$STRING`",
						"short": "Unique station code identifier",
					},
					map[string]any{
						"name": "scoordinate",
						"title": "Scoordinate",
						"type": "`$OBJECT`",
						"short": "Geographic coordinates of the station",
					},
					map[string]any{
						"name": "smetadata",
						"title": "Smetadata",
						"type": "`$OBJECT`",
						"short": "Additional metadata about the station",
					},
					map[string]any{
						"name": "sname",
						"title": "Sname",
						"type": "`$STRING`",
						"short": "Human-readable station name",
					},
					map[string]any{
						"name": "stype",
						"title": "Stype",
						"type": "`$STRING`",
						"short": "Station type",
					},
					map[string]any{
						"name": "tdescription",
						"title": "Tdescription",
						"type": "`$STRING`",
						"short": "Description of the measurement type",
					},
					map[string]any{
						"name": "tmetadata",
						"title": "Tmetadata",
						"type": "`$OBJECT`",
						"short": "Additional metadata about the measurement type",
					},
					map[string]any{
						"name": "tname",
						"title": "Tname",
						"type": "`$STRING`",
						"short": "Type of measurement",
					},
					map[string]any{
						"name": "tunit",
						"title": "Tunit",
						"type": "`$STRING`",
						"short": "Unit of measurement",
					},
				},
				"name": "environmental_monitoring",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/flat/EnvironmentStation",
								"segments": []any{
									map[string]any{
										"lit": "flat",
									},
									map[string]any{
										"lit": "EnvironmentStation",
									},
								},
								"parts": []any{
									"flat",
									"EnvironmentStation",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "distinct",
											"orig": "distinct",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 200,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "select",
											"orig": "select",
											"type": "`$STRING`",
											"kind": "query",
											"example": "scode,sname,scoordinate,mvalidtime,mvalue",
										},
										map[string]any{
											"name": "where",
											"orig": "where",
											"type": "`$STRING`",
											"kind": "query",
											"example": "sactive.eq.true",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"distinct",
										"limit",
										"offset",
										"select",
										"where",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
