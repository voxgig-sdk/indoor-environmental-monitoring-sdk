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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"short": "Measurement period in seconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mtransactiontime",
						"short": "Timestamp when the data was recorded in the database",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mvalidtime",
						"short": "Timestamp when the measurement was taken",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mvalue",
						"short": "Measured value",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "sactive",
						"short": "Whether the station is currently active",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "savailable",
						"short": "Whether the station data is available",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "scode",
						"short": "Unique station code identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scoordinate",
						"short": "Geographic coordinates of the station",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "smetadata",
						"short": "Additional metadata about the station",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sname",
						"short": "Human-readable station name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stype",
						"short": "Station type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tdescription",
						"short": "Description of the measurement type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tmetadata",
						"short": "Additional metadata about the measurement type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "tname",
						"short": "Type of measurement",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tunit",
						"short": "Unit of measurement",
						"type": "`$STRING`",
					},
				},
				"name": "environmental_monitoring",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "distinct",
											"orig": "distinct",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 200,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "scode,sname,scoordinate,mvalidtime,mvalue",
											"kind": "query",
											"name": "select",
											"orig": "select",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "sactive.eq.true",
											"kind": "query",
											"name": "where",
											"orig": "where",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/flat/EnvironmentStation",
								"parts": []any{
									"flat",
									"EnvironmentStation",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
