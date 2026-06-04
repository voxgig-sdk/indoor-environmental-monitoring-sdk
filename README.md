# IndoorEnvironmentalMonitoring SDK

Indoor humidity, temperature and CO2 readings from NOI Techpark stations in Bolzano and Brunico

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Indoor Environmental Monitoring

The [Open Data Hub Mobility API](https://mobility.api.opendatahub.com/v2) is a public data service run by [NOI Techpark](https://opendatahub.com/) in South Tyrol, Italy. This SDK targets the indoor environmental monitoring data, covering humidity, temperature and CO2 measurements collected at NOI Techpark facilities in Bolzano and Brunico to support research on indoor air quality, energy efficiency and occupant well-being.

What you get from the API:

- Station metadata for the indoor monitoring sites
- Time-series measurements for humidity, temperature and CO2
- Both hierarchical (`tree`) and flattened (`flat`) views of stations, data types and measurements
- An OpenAPI v3 specification served from `/apispec`

The API is open and does not require authentication for read access. CORS is reported as disabled, so browser-side calls may need a proxy. The same v2 mobility endpoint exposes many other South Tyrol mobility domains alongside the indoor sensors.

## Try it

**TypeScript**
```bash
npm install indoor-environmental-monitoring
```

**Python**
```bash
pip install indoor-environmental-monitoring-sdk
```

**PHP**
```bash
composer require voxgig/indoor-environmental-monitoring-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/indoor-environmental-monitoring-sdk/go
```

**Ruby**
```bash
gem install indoor-environmental-monitoring-sdk
```

**Lua**
```bash
luarocks install indoor-environmental-monitoring-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { IndoorEnvironmentalMonitoringSDK } from 'indoor-environmental-monitoring'

const client = new IndoorEnvironmentalMonitoringSDK({})

// List all environmentalmonitorings
const environmentalmonitorings = await client.EnvironmentalMonitoring().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o indoor-environmental-monitoring-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "indoor-environmental-monitoring": {
      "command": "/abs/path/to/indoor-environmental-monitoring-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **EnvironmentalMonitoring** | Indoor environmental sensor stations and their humidity, temperature and CO2 time-series, accessible through the mobility API's `tree` and `flat` node endpoints under `https://mobility.api.opendatahub.com/v2/`. | `/flat/EnvironmentStation` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from indoorenvironmentalmonitoring_sdk import IndoorEnvironmentalMonitoringSDK

client = IndoorEnvironmentalMonitoringSDK({})

# List all environmentalmonitorings
environmentalmonitorings, err = client.EnvironmentalMonitoring(None).list(None, None)
```

### PHP

```php
<?php
require_once 'indoorenvironmentalmonitoring_sdk.php';

$client = new IndoorEnvironmentalMonitoringSDK([]);

// List all environmentalmonitorings
[$environmentalmonitorings, $err] = $client->EnvironmentalMonitoring(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/indoor-environmental-monitoring-sdk/go"

client := sdk.NewIndoorEnvironmentalMonitoringSDK(map[string]any{})

// List all environmentalmonitorings
environmentalmonitorings, err := client.EnvironmentalMonitoring(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "IndoorEnvironmentalMonitoring_sdk"

client = IndoorEnvironmentalMonitoringSDK.new({})

# List all environmentalmonitorings
environmentalmonitorings, err = client.EnvironmentalMonitoring(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("indoor-environmental-monitoring_sdk")

local client = sdk.new({})

-- List all environmentalmonitorings
local environmentalmonitorings, err = client:EnvironmentalMonitoring(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = IndoorEnvironmentalMonitoringSDK.test()
const result = await client.EnvironmentalMonitoring().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = IndoorEnvironmentalMonitoringSDK.test(None, None)
result, err = client.EnvironmentalMonitoring(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = IndoorEnvironmentalMonitoringSDK::test(null, null);
[$result, $err] = $client->EnvironmentalMonitoring(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.EnvironmentalMonitoring(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = IndoorEnvironmentalMonitoringSDK.test(nil, nil)
result, err = client.EnvironmentalMonitoring(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:EnvironmentalMonitoring(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Indoor Environmental Monitoring

- Upstream: [https://mobility.api.opendatahub.com/v2](https://mobility.api.opendatahub.com/v2)
- API docs: [https://mobility.api.opendatahub.com/v2/apispec](https://mobility.api.opendatahub.com/v2/apispec)

- Data is published under the [Creative Commons CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) public domain dedication
- No attribution is legally required, but crediting the Open Data Hub South Tyrol / NOI Techpark is appreciated
- The Open Data Hub platform is operated by [NOI S.p.A.](https://opendatahub.com/) in South Tyrol / Alto Adige, Italy

---

Generated from the Indoor Environmental Monitoring OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
