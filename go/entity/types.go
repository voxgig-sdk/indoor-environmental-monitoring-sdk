// Typed models for the IndoorEnvironmentalMonitoring SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// EnvironmentalMonitoring is the typed data model for the environmental_monitoring entity.
type EnvironmentalMonitoring struct {
	Mperiod *int `json:"mperiod,omitempty"`
	Mtransactiontime *string `json:"mtransactiontime,omitempty"`
	Mvalidtime *string `json:"mvalidtime,omitempty"`
	Mvalue *float64 `json:"mvalue,omitempty"`
	Sactive *bool `json:"sactive,omitempty"`
	Savailable *bool `json:"savailable,omitempty"`
	Scode *string `json:"scode,omitempty"`
	Scoordinate *map[string]any `json:"scoordinate,omitempty"`
	Smetadata *map[string]any `json:"smetadata,omitempty"`
	Sname *string `json:"sname,omitempty"`
	Stype *string `json:"stype,omitempty"`
	Tdescription *string `json:"tdescription,omitempty"`
	Tmetadata *map[string]any `json:"tmetadata,omitempty"`
	Tname *string `json:"tname,omitempty"`
	Tunit *string `json:"tunit,omitempty"`
}

// EnvironmentalMonitoringListMatch is the typed request payload for EnvironmentalMonitoring.ListTyped.
type EnvironmentalMonitoringListMatch struct {
	Mperiod *int `json:"mperiod,omitempty"`
	Mtransactiontime *string `json:"mtransactiontime,omitempty"`
	Mvalidtime *string `json:"mvalidtime,omitempty"`
	Mvalue *float64 `json:"mvalue,omitempty"`
	Sactive *bool `json:"sactive,omitempty"`
	Savailable *bool `json:"savailable,omitempty"`
	Scode *string `json:"scode,omitempty"`
	Scoordinate *map[string]any `json:"scoordinate,omitempty"`
	Smetadata *map[string]any `json:"smetadata,omitempty"`
	Sname *string `json:"sname,omitempty"`
	Stype *string `json:"stype,omitempty"`
	Tdescription *string `json:"tdescription,omitempty"`
	Tmetadata *map[string]any `json:"tmetadata,omitempty"`
	Tname *string `json:"tname,omitempty"`
	Tunit *string `json:"tunit,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
