<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK configuration

class IndoorEnvironmentalMonitoringConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "IndoorEnvironmentalMonitoring",
                "slug" => "indoor-environmental-monitoring",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://mobility.api.opendatahub.com/v2",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "environmental_monitoring" => [],
                ],
            ],
            "entity" => [
        'environmental_monitoring' => [
          'fields' => [
            [
              'name' => 'mperiod',
              'title' => 'Mperiod',
              'type' => '`$INTEGER`',
              'short' => 'Measurement period in seconds',
            ],
            [
              'name' => 'mtransactiontime',
              'title' => 'Mtransactiontime',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the data was recorded in the database',
              'format' => 'date-time',
            ],
            [
              'name' => 'mvalidtime',
              'title' => 'Mvalidtime',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the measurement was taken',
              'format' => 'date-time',
            ],
            [
              'name' => 'mvalue',
              'title' => 'Mvalue',
              'type' => '`$NUMBER`',
              'short' => 'Measured value',
              'format' => 'double',
            ],
            [
              'name' => 'sactive',
              'title' => 'Sactive',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the station is currently active',
            ],
            [
              'name' => 'savailable',
              'title' => 'Savailable',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the station data is available',
            ],
            [
              'name' => 'scode',
              'title' => 'Scode',
              'type' => '`$STRING`',
              'short' => 'Unique station code identifier',
            ],
            [
              'name' => 'scoordinate',
              'title' => 'Scoordinate',
              'type' => '`$OBJECT`',
              'short' => 'Geographic coordinates of the station',
            ],
            [
              'name' => 'smetadata',
              'title' => 'Smetadata',
              'type' => '`$OBJECT`',
              'short' => 'Additional metadata about the station',
            ],
            [
              'name' => 'sname',
              'title' => 'Sname',
              'type' => '`$STRING`',
              'short' => 'Human-readable station name',
            ],
            [
              'name' => 'stype',
              'title' => 'Stype',
              'type' => '`$STRING`',
              'short' => 'Station type',
            ],
            [
              'name' => 'tdescription',
              'title' => 'Tdescription',
              'type' => '`$STRING`',
              'short' => 'Description of the measurement type',
            ],
            [
              'name' => 'tmetadata',
              'title' => 'Tmetadata',
              'type' => '`$OBJECT`',
              'short' => 'Additional metadata about the measurement type',
            ],
            [
              'name' => 'tname',
              'title' => 'Tname',
              'type' => '`$STRING`',
              'short' => 'Type of measurement',
            ],
            [
              'name' => 'tunit',
              'title' => 'Tunit',
              'type' => '`$STRING`',
              'short' => 'Unit of measurement',
            ],
          ],
          'name' => 'environmental_monitoring',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/flat/EnvironmentStation',
                  'segments' => [
                    [
                      'lit' => 'flat',
                    ],
                    [
                      'lit' => 'EnvironmentStation',
                    ],
                  ],
                  'parts' => [
                    'flat',
                    'EnvironmentStation',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'distinct',
                        'orig' => 'distinct',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                        'example' => false,
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 200,
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'select',
                        'orig' => 'select',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'scode,sname,scoordinate,mvalidtime,mvalue',
                      ],
                      [
                        'name' => 'where',
                        'orig' => 'where',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'sactive.eq.true',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'distinct',
                      'limit',
                      'offset',
                      'select',
                      'where',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IndoorEnvironmentalMonitoringFeatures::make_feature($name);
    }
}
