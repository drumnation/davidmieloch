import { buildContentOpsSnapshot } from '../../../../../src/content-ops/server';
import { assertReadEnabled, jsonData, readDisabledResponse } from '../_lib/respond';

export function GET() {
  if (!assertReadEnabled()) return readDisabledResponse();

  const snapshot = buildContentOpsSnapshot();

  return jsonData({
    latestLiveArticle: snapshot.latestLiveArticle,
    counts: snapshot.counts,
    blockers: snapshot.blockers,
    warnings: snapshot.warnings,
    nextActions: snapshot.nextActions,
  });
}
