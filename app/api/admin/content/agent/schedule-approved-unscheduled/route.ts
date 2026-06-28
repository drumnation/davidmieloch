import { scheduleApprovedUnscheduledContent } from '../../../../../../src/content-ops/actions';
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
    const result = scheduleApprovedUnscheduledContent({
      startAt: body.startAt ? String(body.startAt) : undefined,
      intervalDays: body.intervalDays ? Number(body.intervalDays) : undefined,
      write: Boolean(body.write),
    });

    return jsonData(result);
  } catch (error) {
    return jsonError(error, 400);
  }
}
