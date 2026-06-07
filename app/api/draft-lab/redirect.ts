export function safeRedirectUrl(request: Request, returnTo: string) {
  const requestUrl = new URL(request.url);
  const forwardedHost = firstForwardedValue(
    request.headers.get("x-forwarded-host"),
  );
  const forwardedProto = firstForwardedValue(
    request.headers.get("x-forwarded-proto"),
  );
  const host = forwardedHost ?? request.headers.get("host") ?? requestUrl.host;
  const protocol = forwardedProto ?? requestUrl.protocol.replace(":", "");
  const origin = `${protocol}://${host}`;
  const parsedReturnTo = new URL(returnTo || "/draft-lab", origin);

  if (parsedReturnTo.origin !== origin) {
    return new URL("/draft-lab", origin);
  }

  return parsedReturnTo;
}

function firstForwardedValue(value: string | null) {
  return value?.split(",")[0]?.trim() || null;
}
