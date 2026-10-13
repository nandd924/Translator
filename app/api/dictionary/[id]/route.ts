import { NextRequest, NextResponse } from 'next/server';
import { getPublicEntries, searchEntries } from '@/lib/dictionary';
import { dictionaryQuerySchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get('q') ?? '';
  const direction = (searchParams.get('direction') ?? 'ho-hi') as 'ho-hi' | 'hi-ho';

  const parsed = dictionaryQuerySchema.safeParse({ q: rawQuery, direction });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const entries = await getPublicEntries();
    const results = searchEntries(entries, parsed.data.q, parsed.data.direction);
    const limit = Number(searchParams.get('limit') ?? '20');
    const page = Number(searchParams.get('page') ?? '1');
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);

    return NextResponse.json({
      query: parsed.data.q,
      direction: parsed.data.direction,
      total: results.length,
      page,
      limit,
      results: paginated,
      empty: paginated.length === 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Dictionary search failed.' },
      { status: 500 },
    );
  }
}
