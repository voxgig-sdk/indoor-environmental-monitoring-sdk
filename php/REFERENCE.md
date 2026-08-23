# IndoorEnvironmentalMonitoring PHP SDK Reference

Complete API reference for the IndoorEnvironmentalMonitoring PHP SDK.


## IndoorEnvironmentalMonitoringSDK

### Constructor

```php
require_once __DIR__ . '/indoorenvironmentalmonitoring_sdk.php';

$client = new IndoorEnvironmentalMonitoringSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IndoorEnvironmentalMonitoringSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = IndoorEnvironmentalMonitoringSDK::test();
```


### Instance Methods

#### `EnvironmentalMonitoring($data = null)`

Create a new `EnvironmentalMonitoringEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): IndoorEnvironmentalMonitoringUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## EnvironmentalMonitoringEntity

```php
$environmental_monitoring = $client->EnvironmentalMonitoring();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mperiod` | `int` | No | Measurement period in seconds |
| `mtransactiontime` | `string` | No | Timestamp when the data was recorded in the database |
| `mvalidtime` | `string` | No | Timestamp when the measurement was taken |
| `mvalue` | `float` | No | Measured value |
| `sactive` | `bool` | No | Whether the station is currently active |
| `savailable` | `bool` | No | Whether the station data is available |
| `scode` | `string` | No | Unique station code identifier |
| `scoordinate` | `array` | No | Geographic coordinates of the station |
| `smetadata` | `array` | No | Additional metadata about the station |
| `sname` | `string` | No | Human-readable station name |
| `stype` | `string` | No | Station type |
| `tdescription` | `string` | No | Description of the measurement type |
| `tmetadata` | `array` | No | Additional metadata about the measurement type |
| `tname` | `string` | No | Type of measurement |
| `tunit` | `string` | No | Unit of measurement |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->EnvironmentalMonitoring()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EnvironmentalMonitoringEntity`

Create a new `EnvironmentalMonitoringEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new IndoorEnvironmentalMonitoringSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

