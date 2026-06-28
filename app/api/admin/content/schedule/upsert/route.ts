import { upsertContentOpsSchedule } from '../../../../../../src/content-ops/actions';
import {
  assertWriteEnabled,
  jsonData,
  jsonError,
  writeDisabledResponse,
} from '../../_lib/respond';

export async function POST(request: Request) {
  if (!assertWriteEnabled()) return writeDisabledResponse();

  try {
    const body = await request.json();
    const result = upsertContentOpsSchedule({
      slug: String(body.slug ?? ''),
      title: String(body.title ?? body.slug ?? ''),
      scheduledAt: String(body.scheduledAt ?? ''),
    });

    return jsonData(result);
  } catch (error) {
    return jsonError(error, 400);
  }
}
