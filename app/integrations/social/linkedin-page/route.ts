import { NextResponse } from 'next/server';

const POSTIZ_LINKEDIN_PAGE_CALLBACK =
  'https://social-davidmieloch.brain-garden.io/integrations/social/linkedin-page';

export function GET(request: Request) {
  const incomingUrl = new URL(request.url);
  const postizUrl = new URL(POSTIZ_LINKEDIN_PAGE_CALLBACK);
  postizUrl.search = incomingUrl.search;

  return NextResponse.redirect(postizUrl);
}
