import { NextRequest, NextResponse } from 'next/server';
import { getPublicEntries } from '@/lib/dictionary';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const entries = await getPublicEntries();
    const result = entries.find((entry) => entry.id === params.id);

    if (!result) {
      return NextResponse.json({ error: 'No dictionary entry found for the provided ID.' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not fetch dictionary entry.' },
      { status: 500 },
    );
  }
}
