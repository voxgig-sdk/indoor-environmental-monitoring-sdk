# ProjectName SDK exists test

import pytest
from indoorenvironmentalmonitoring_sdk import IndoorEnvironmentalMonitoringSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IndoorEnvironmentalMonitoringSDK.test(None, None)
        assert testsdk is not None
