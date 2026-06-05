const POSTIZ_LINKEDIN_PAGE_CALLBACK =
  'https://social-davidmieloch.brain-garden.io/integrations/social/linkedin-page';

export function GET(request: Request) {
  const incomingUrl = new URL(request.url);
  const postizUrl = new URL(POSTIZ_LINKEDIN_PAGE_CALLBACK);
  postizUrl.search = incomingUrl.search;

  const escapedTarget = postizUrl.toString().replaceAll('"', '&quot;');

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${escapedTarget}" />
    <title>LinkedIn authorization</title>
  </head>
  <body>
    <a href="${escapedTarget}">Continue LinkedIn authorization</a>
    <script>window.location.replace(${JSON.stringify(postizUrl.toString())});</script>
  </body>
</html>`,
    {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/html; charset=utf-8',
      },
    },
  );
}
