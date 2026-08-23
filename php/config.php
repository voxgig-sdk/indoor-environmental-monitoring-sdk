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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'short' => 'Measurement period in seconds',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'mtransactiontime',
              'short' => 'Timestamp when the data was recorded in the database',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'mvalidtime',
              'short' => 'Timestamp when the measurement was taken',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'mvalue',
              'short' => 'Measured value',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'sactive',
              'short' => 'Whether the station is currently active',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'savailable',
              'short' => 'Whether the station data is available',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'scode',
              'short' => 'Unique station code identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'scoordinate',
              'short' => 'Geographic coordinates of the station',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'smetadata',
              'short' => 'Additional metadata about the station',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sname',
              'short' => 'Human-readable station name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'stype',
              'short' => 'Station type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tdescription',
              'short' => 'Description of the measurement type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tmetadata',
              'short' => 'Additional metadata about the measurement type',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'tname',
              'short' => 'Type of measurement',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tunit',
              'short' => 'Unit of measurement',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'environmental_monitoring',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'distinct',
                        'orig' => 'distinct',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 200,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'scode,sname,scoordinate,mvalidtime,mvalue',
                        'kind' => 'query',
                        'name' => 'select',
                        'orig' => 'select',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'sactive.eq.true',
                        'kind' => 'query',
                        'name' => 'where',
                        'orig' => 'where',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/flat/EnvironmentStation',
                  'parts' => [
                    'flat',
                    'EnvironmentStation',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
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
