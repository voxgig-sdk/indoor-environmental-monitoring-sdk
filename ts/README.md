# IndoorEnvironmentalMonitoring TypeScript SDK

The TypeScript SDK for the IndoorEnvironmentalMonitoring API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install indoor-environmental-monitoring
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { IndoorEnvironmentalMonitoringSDK } from 'indoor-environmental-monitoring'

const client = new IndoorEnvironmentalMonitoringSDK({
  apikey: process.env.INDOOR-ENVIRONMENTAL-MONITORING_APIKEY,
})
```

### 2. List environmentalmonitorings

```ts
const result = await client.EnvironmentalMonitoring().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = IndoorEnvironmentalMonitoringSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new IndoorEnvironmentalMonitoringSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new IndoorEnvironmentalMonitoringSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
INDOOR-ENVIRONMENTAL-MONITORING_TEST_LIVE=TRUE
INDOOR-ENVIRONMENTAL-MONITORING_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### IndoorEnvironmentalMonitoringSDK

#### Constructor

```ts
new IndoorEnvironmentalMonitoringSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `EnvironmentalMonitoring(data?)` | `EnvironmentalMonitoringEntity` | Create a EnvironmentalMonitoring entity instance. |
| `tester(testopts?, sdkopts?)` | `IndoorEnvironmentalMonitoringSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `IndoorEnvironmentalMonitoringSDK.test(testopts?, sdkopts?)` | `IndoorEnvironmentalMonitoringSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): IndoorEnvironmentalMonitoringSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### EnvironmentalMonitoring

| Field | Description |
| --- | --- |
| `mperiod` |  |
| `mtransactiontime` |  |
| `mvalidtime` |  |
| `mvalue` |  |
| `sactive` |  |
| `savailable` |  |
| `scode` |  |
| `scoordinate` |  |
| `smetadata` |  |
| `sname` |  |
| `stype` |  |
| `tdescription` |  |
| `tmetadata` |  |
| `tname` |  |
| `tunit` |  |

Operations: list.

API path: `/flat/EnvironmentStation`



## Entities


### EnvironmentalMonitoring

Create an instance: `const environmental_monitoring = client.EnvironmentalMonitoring()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `mperiod` | ``$INTEGER`` |  |
| `mtransactiontime` | ``$STRING`` |  |
| `mvalidtime` | ``$STRING`` |  |
| `mvalue` | ``$NUMBER`` |  |
| `sactive` | ``$BOOLEAN`` |  |
| `savailable` | ``$BOOLEAN`` |  |
| `scode` | ``$STRING`` |  |
| `scoordinate` | ``$OBJECT`` |  |
| `smetadata` | ``$OBJECT`` |  |
| `sname` | ``$STRING`` |  |
| `stype` | ``$STRING`` |  |
| `tdescription` | ``$STRING`` |  |
| `tmetadata` | ``$OBJECT`` |  |
| `tname` | ``$STRING`` |  |
| `tunit` | ``$STRING`` |  |

#### Example: List

```ts
const environmental_monitorings = await client.EnvironmentalMonitoring().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
indoor-environmental-monitoring/
├── src/
│   ├── IndoorEnvironmentalMonitoringSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { IndoorEnvironmentalMonitoringSDK } from 'indoor-environmental-monitoring'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
