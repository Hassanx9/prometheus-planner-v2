import { NextResponse } from 'next/server';
import seedData from '@/src/skill-tree/data/seed/skilltree-seed.json';

export async function GET() {
  try {
    // Return classes from seed data
    // In production, this could load from a database
    return NextResponse.json(seedData.classes);
  } catch (error) {
    console.error('Error loading classes:', error);
    return NextResponse.json(
      { error: 'Failed to load classes' },
      { status: 500 }
    );
  }
}
