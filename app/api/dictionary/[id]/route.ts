import { NextRequest, NextResponse } from 'next/server';
import { getPublicEntries } from '@/lib/dictionary';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const entries = await getPublicEntries();
    const entry = entries.find((item) => item.id === params.id);

    if (!entry) {
      return NextResponse.json(
        { error: 'No dictionary entry found for the provided ID.' },
        { status: 404 },
      );
    }

    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not fetch dictionary entry.' },
      { status: 500 },
    );
  }
}
