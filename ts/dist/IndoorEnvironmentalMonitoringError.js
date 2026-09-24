"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndoorEnvironmentalMonitoringError = void 0;
class IndoorEnvironmentalMonitoringError extends Error {
    isIndoorEnvironmentalMonitoringError = true;
    sdk = 'IndoorEnvironmentalMonitoring';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.IndoorEnvironmentalMonitoringError = IndoorEnvironmentalMonitoringError;
//# sourceMappingURL=IndoorEnvironmentalMonitoringError.js.map