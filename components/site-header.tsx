import { NextRequest, NextResponse } from 'next/server';
import { appendContribution, rateLimitRequest } from '@/lib/contributions';
import { contributionSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get('x-forwarded-for') ?? 'local';

  if (!rateLimitRequest(clientIp)) {
    return NextResponse.json({ error: 'Too many contribution submissions. Please wait a moment and try again.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = contributionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const record = await appendContribution(parsed.data);
    return NextResponse.json(
      {
        message: 'Contribution submitted for review.',
        status: 'pending',
        record,
      },
      { status: 202 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Submission failed.' },
      { status: 500 },
    );
  }
}
