# IndoorEnvironmentalMonitoring SDK feature factory

from feature.base_feature import IndoorEnvironmentalMonitoringBaseFeature
from feature.test_feature import IndoorEnvironmentalMonitoringTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IndoorEnvironmentalMonitoringBaseFeature(),
        "test": lambda: IndoorEnvironmentalMonitoringTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
