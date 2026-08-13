# IndoorEnvironmentalMonitoring SDK feature factory

from indoorenvironmentalmonitoring_sdk.feature.base_feature import IndoorEnvironmentalMonitoringBaseFeature
from indoorenvironmentalmonitoring_sdk.feature.test_feature import IndoorEnvironmentalMonitoringTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IndoorEnvironmentalMonitoringBaseFeature(),
        "test": lambda: IndoorEnvironmentalMonitoringTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
