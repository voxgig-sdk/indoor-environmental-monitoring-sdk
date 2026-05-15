<?php
declare(strict_types=1);

// IndoorEnvironmentalMonitoring SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

IndoorEnvironmentalMonitoringUtility::setRegistrar(function (IndoorEnvironmentalMonitoringUtility $u): void {
    $u->clean = [IndoorEnvironmentalMonitoringClean::class, 'call'];
    $u->done = [IndoorEnvironmentalMonitoringDone::class, 'call'];
    $u->make_error = [IndoorEnvironmentalMonitoringMakeError::class, 'call'];
    $u->feature_add = [IndoorEnvironmentalMonitoringFeatureAdd::class, 'call'];
    $u->feature_hook = [IndoorEnvironmentalMonitoringFeatureHook::class, 'call'];
    $u->feature_init = [IndoorEnvironmentalMonitoringFeatureInit::class, 'call'];
    $u->fetcher = [IndoorEnvironmentalMonitoringFetcher::class, 'call'];
    $u->make_fetch_def = [IndoorEnvironmentalMonitoringMakeFetchDef::class, 'call'];
    $u->make_context = [IndoorEnvironmentalMonitoringMakeContext::class, 'call'];
    $u->make_options = [IndoorEnvironmentalMonitoringMakeOptions::class, 'call'];
    $u->make_request = [IndoorEnvironmentalMonitoringMakeRequest::class, 'call'];
    $u->make_response = [IndoorEnvironmentalMonitoringMakeResponse::class, 'call'];
    $u->make_result = [IndoorEnvironmentalMonitoringMakeResult::class, 'call'];
    $u->make_point = [IndoorEnvironmentalMonitoringMakePoint::class, 'call'];
    $u->make_spec = [IndoorEnvironmentalMonitoringMakeSpec::class, 'call'];
    $u->make_url = [IndoorEnvironmentalMonitoringMakeUrl::class, 'call'];
    $u->param = [IndoorEnvironmentalMonitoringParam::class, 'call'];
    $u->prepare_auth = [IndoorEnvironmentalMonitoringPrepareAuth::class, 'call'];
    $u->prepare_body = [IndoorEnvironmentalMonitoringPrepareBody::class, 'call'];
    $u->prepare_headers = [IndoorEnvironmentalMonitoringPrepareHeaders::class, 'call'];
    $u->prepare_method = [IndoorEnvironmentalMonitoringPrepareMethod::class, 'call'];
    $u->prepare_params = [IndoorEnvironmentalMonitoringPrepareParams::class, 'call'];
    $u->prepare_path = [IndoorEnvironmentalMonitoringPreparePath::class, 'call'];
    $u->prepare_query = [IndoorEnvironmentalMonitoringPrepareQuery::class, 'call'];
    $u->result_basic = [IndoorEnvironmentalMonitoringResultBasic::class, 'call'];
    $u->result_body = [IndoorEnvironmentalMonitoringResultBody::class, 'call'];
    $u->result_headers = [IndoorEnvironmentalMonitoringResultHeaders::class, 'call'];
    $u->transform_request = [IndoorEnvironmentalMonitoringTransformRequest::class, 'call'];
    $u->transform_response = [IndoorEnvironmentalMonitoringTransformResponse::class, 'call'];
});
