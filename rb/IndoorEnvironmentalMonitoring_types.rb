# frozen_string_literal: true

# Typed models for the IndoorEnvironmentalMonitoring SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# EnvironmentalMonitoring entity data model.
#
# @!attribute [rw] mperiod
#   @return [Integer, nil]
#
# @!attribute [rw] mtransactiontime
#   @return [String, nil]
#
# @!attribute [rw] mvalidtime
#   @return [String, nil]
#
# @!attribute [rw] mvalue
#   @return [Float, nil]
#
# @!attribute [rw] sactive
#   @return [Boolean, nil]
#
# @!attribute [rw] savailable
#   @return [Boolean, nil]
#
# @!attribute [rw] scode
#   @return [String, nil]
#
# @!attribute [rw] scoordinate
#   @return [Hash, nil]
#
# @!attribute [rw] smetadata
#   @return [Hash, nil]
#
# @!attribute [rw] sname
#   @return [String, nil]
#
# @!attribute [rw] stype
#   @return [String, nil]
#
# @!attribute [rw] tdescription
#   @return [String, nil]
#
# @!attribute [rw] tmetadata
#   @return [Hash, nil]
#
# @!attribute [rw] tname
#   @return [String, nil]
#
# @!attribute [rw] tunit
#   @return [String, nil]
EnvironmentalMonitoring = Struct.new(
  :mperiod,
  :mtransactiontime,
  :mvalidtime,
  :mvalue,
  :sactive,
  :savailable,
  :scode,
  :scoordinate,
  :smetadata,
  :sname,
  :stype,
  :tdescription,
  :tmetadata,
  :tname,
  :tunit,
  keyword_init: true
)

# Match filter for EnvironmentalMonitoring#list (any subset of EnvironmentalMonitoring fields).
#
# @!attribute [rw] mperiod
#   @return [Integer, nil]
#
# @!attribute [rw] mtransactiontime
#   @return [String, nil]
#
# @!attribute [rw] mvalidtime
#   @return [String, nil]
#
# @!attribute [rw] mvalue
#   @return [Float, nil]
#
# @!attribute [rw] sactive
#   @return [Boolean, nil]
#
# @!attribute [rw] savailable
#   @return [Boolean, nil]
#
# @!attribute [rw] scode
#   @return [String, nil]
#
# @!attribute [rw] scoordinate
#   @return [Hash, nil]
#
# @!attribute [rw] smetadata
#   @return [Hash, nil]
#
# @!attribute [rw] sname
#   @return [String, nil]
#
# @!attribute [rw] stype
#   @return [String, nil]
#
# @!attribute [rw] tdescription
#   @return [String, nil]
#
# @!attribute [rw] tmetadata
#   @return [Hash, nil]
#
# @!attribute [rw] tname
#   @return [String, nil]
#
# @!attribute [rw] tunit
#   @return [String, nil]
EnvironmentalMonitoringListMatch = Struct.new(
  :mperiod,
  :mtransactiontime,
  :mvalidtime,
  :mvalue,
  :sactive,
  :savailable,
  :scode,
  :scoordinate,
  :smetadata,
  :sname,
  :stype,
  :tdescription,
  :tmetadata,
  :tname,
  :tunit,
  keyword_init: true
)

