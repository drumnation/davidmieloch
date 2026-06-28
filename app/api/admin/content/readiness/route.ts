import { buildContentOpsSnapshot } from '../../../../../src/content-ops/server';
import { assertReadEnabled, jsonData, readDisabledResponse } from '../_lib/respond';

export function GET() {
  if (!assertReadEnabled()) return readDisabledResponse();

  return jsonData(buildContentOpsSnapshot().readiness);
}
