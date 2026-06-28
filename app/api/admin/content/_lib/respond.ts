import { NextResponse } from 'next/server';

export function readDisabledResponse() {
  return NextResponse.json({ ok: false, error: 'disabled' }, { status: 404 });
}

export function writeDisabledResponse() {
  return NextResponse.json(
    { ok: false, error: 'write disabled' },
    { status: 404 },
  );
}

export function assertReadEnabled() {
  return process.env.CONTENT_OPS_ENABLED === '1';
}

export function assertWriteEnabled() {
  return (
    process.env.CONTENT_OPS_ENABLED === '1' &&
    process.env.CONTENT_OPS_WRITE_ENABLED === '1'
  );
}

export function jsonData<T>(data: T) {
  return NextResponse.json({ ok: true, data });
}

export function jsonError(error: unknown, status = 500) {
  return NextResponse.json(
    { ok: false, error: error instanceof Error ? error.message : String(error) },
    { status },
  );
}
