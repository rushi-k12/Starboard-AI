// app/api/compare/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
const Papa = require('papaparse');

interface Property {
  address: string;
  square_feet: string;
  lot_size: string;
  year_built: string;
  property_type: string;
  zoning: string;
  market_value: string;
  use_type: string;
  confidence: number;
}

export async function POST(req: NextRequest) {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'clean_industrial_properties.csv');
    const fileContent = await fs.readFile(csvPath, 'utf-8');

    const parsed = Papa.parse<Property>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    if (!parsed.data || parsed.data.length === 0) {
      return NextResponse.json({ error: 'No data found in CSV' }, { status: 500 });
    }

    // Limit to top 5 records
    const topListings = parsed.data.slice(0, 5).map((row) => ({
      ...row,
      confidence: parseFloat(row.confidence?.toString() || '100') || 100.0,
    }));

    return NextResponse.json(topListings);
    } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('CSV API Error:', errorMessage);
    return NextResponse.json({ error: 'Server error', details: errorMessage }, { status: 500 });
  }

}
