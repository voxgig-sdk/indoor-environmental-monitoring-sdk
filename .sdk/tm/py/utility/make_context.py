# IndoorEnvironmentalMonitoring SDK utility: make_context

from core.context import IndoorEnvironmentalMonitoringContext


def make_context_util(ctxmap, basectx):
    return IndoorEnvironmentalMonitoringContext(ctxmap, basectx)
