# IndoorEnvironmentalMonitoring SDK utility: make_context

from indoorenvironmentalmonitoring_sdk.core.context import IndoorEnvironmentalMonitoringContext


def make_context_util(ctxmap, basectx):
    return IndoorEnvironmentalMonitoringContext(ctxmap, basectx)
