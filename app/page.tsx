'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Type definition
type Property = {
  address: string;
  square_feet: string;
  lot_size: string;
  year_built: string;
  property_type: string;
  zoning: string;
  market_value: string;
  use_type: string;
  confidence: number;
};

export default function Home() {
  const [address, setAddress] = useState('');
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'API Error');
      }

      const data = await res.json();
      setResults(data);
        } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
    }
 finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">🏠 Industrial Property Comparables – Cook County</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Enter address or keyword (e.g., warehouse, Cicero, etc.)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button onClick={handleCompare} disabled={loading}>
          {loading ? 'Comparing...' : 'Compare'}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((property, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-1">
              <p className="font-semibold text-lg">{property.address}</p>
              <p>📐 Area: {property.square_feet} sqft</p>
              <p>🌱 Land: {property.lot_size} sqft</p>
              <p>🏗️ Built: {property.year_built}</p>
              <p>🏷️ Type: {property.property_type}</p>
              <p>🗺️ Zoning: {property.zoning}</p>
              <p>💰 Market Value: {property.market_value}</p>
              <p className="text-sm text-muted-foreground">
                Confidence: {property.confidence.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
