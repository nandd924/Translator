import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'ho-hindi-translator',
    dataset: process.env.DATASET_PATH ?? './data/public/entries.jsonl',
    timestamp: new Date().toISOString(),
  });
}
