# IndoorEnvironmentalMonitoring TypeScript SDK Reference

Complete API reference for the IndoorEnvironmentalMonitoring TypeScript SDK.


## IndoorEnvironmentalMonitoringSDK

### Constructor

```ts
new IndoorEnvironmentalMonitoringSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IndoorEnvironmentalMonitoringSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = IndoorEnvironmentalMonitoringSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `IndoorEnvironmentalMonitoringSDK` instance in test mode.


### Instance Methods

#### `EnvironmentalMonitoring(data?: object)`

Create a new `EnvironmentalMonitoring` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentalMonitoringEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `IndoorEnvironmentalMonitoringSDK.test()`.

**Returns:** `IndoorEnvironmentalMonitoringSDK` instance in test mode.


---

## EnvironmentalMonitoringEntity

```ts
const environmental_monitoring = client.EnvironmentalMonitoring()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mperiod` | `number` | No | Measurement period in seconds |
| `mtransactiontime` | `string` | No | Timestamp when the data was recorded in the database |
| `mvalidtime` | `string` | No | Timestamp when the measurement was taken |
| `mvalue` | `number` | No | Measured value |
| `sactive` | `boolean` | No | Whether the station is currently active |
| `savailable` | `boolean` | No | Whether the station data is available |
| `scode` | `string` | No | Unique station code identifier |
| `scoordinate` | `Record<string, any>` | No | Geographic coordinates of the station |
| `smetadata` | `Record<string, any>` | No | Additional metadata about the station |
| `sname` | `string` | No | Human-readable station name |
| `stype` | `string` | No | Station type |
| `tdescription` | `string` | No | Description of the measurement type |
| `tmetadata` | `Record<string, any>` | No | Additional metadata about the measurement type |
| `tname` | `string` | No | Type of measurement |
| `tunit` | `string` | No | Unit of measurement |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EnvironmentalMonitoring().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentalMonitoringEntity` instance with the same client and
options.

#### `client()`

Return the parent `IndoorEnvironmentalMonitoringSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new IndoorEnvironmentalMonitoringSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

