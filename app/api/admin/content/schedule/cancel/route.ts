import { cancelContentOpsSchedule } from '../../../../../../src/content-ops/actions';
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
    const result = cancelContentOpsSchedule({
      slug: String(body.slug ?? ''),
    });

    return jsonData(result);
  } catch (error) {
    return jsonError(error, 400);
  }
}
