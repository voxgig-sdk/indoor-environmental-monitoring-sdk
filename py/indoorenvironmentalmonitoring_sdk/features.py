# IndoorEnvironmentalMonitoring SDK feature factory

from indoorenvironmentalmonitoring_sdk.feature.base_feature import IndoorEnvironmentalMonitoringBaseFeature
from indoorenvironmentalmonitoring_sdk.feature.ratelimit_feature import IndoorEnvironmentalMonitoringRatelimitFeature
from indoorenvironmentalmonitoring_sdk.feature.retry_feature import IndoorEnvironmentalMonitoringRetryFeature
from indoorenvironmentalmonitoring_sdk.feature.test_feature import IndoorEnvironmentalMonitoringTestFeature
from indoorenvironmentalmonitoring_sdk.feature.timeout_feature import IndoorEnvironmentalMonitoringTimeoutFeature


_FEATURES = {
    "base": lambda: IndoorEnvironmentalMonitoringBaseFeature(),
    "ratelimit": lambda: IndoorEnvironmentalMonitoringRatelimitFeature(),
    "retry": lambda: IndoorEnvironmentalMonitoringRetryFeature(),
    "test": lambda: IndoorEnvironmentalMonitoringTestFeature(),
    "timeout": lambda: IndoorEnvironmentalMonitoringTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
