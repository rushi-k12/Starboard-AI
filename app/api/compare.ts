// pages/api/compare.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';
import * as tf from '@tensorflow/tfjs';

const loadCSV = () => {
  const filePath = path.join(process.cwd(), 'public', 'clean_industrial_properties.csv');
  const csvData = fs.readFileSync(filePath, 'utf8');
  const { data } = Papa.parse<Record<string, string>>(csvData, { header: true });
  return data.filter((row) => row.square_feet && row.land_area && row.year_built);
};

const getNumeric = (row: Record<string, string>, keys: string[]) =>
  keys.map((k) => parseFloat(row[k]) || 0);

const normalize = (X: number[][]) => {
  const t = tf.tensor2d(X);
  const mean = t.mean(0);
  const std = t.sub(mean).pow(2).mean(0).sqrt();
  return t.sub(mean).div(std);
};

const cosineSimilarity = (a: tf.Tensor, b: tf.Tensor) => {
  const dot = a.mul(b).sum();
  const normA = a.norm();
  const normB = b.norm();
  return dot.div(normA.mul(normB));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'Missing address' });

  const df = loadCSV();
  const features = ['square_feet', 'land_area', 'year_built'];
  const X = df.map((row) => getNumeric(row, features));
  const Xnorm = normalize(X);

  const addrLower = address.toString().toLowerCase();
  const index = df.findIndex((row) => row.address?.toLowerCase().includes(addrLower));
  if (index === -1) return res.status(404).json({ error: 'Address not found' });

  const inputVec = Xnorm.slice([index, 0], [1, -1]);
  const scores: { i: number; score: number }[] = [];

  for (let i = 0; i < Xnorm.shape[0]; i++) {
    if (i === index) continue;
    const rowVec = Xnorm.slice([i, 0], [1, -1]);
    const sim = cosineSimilarity(inputVec, rowVec).arraySync() as number;
    scores.push({ i, score: sim });
  }

  scores.sort((a, b) => b.score - a.score);
  const top = scores.slice(0, 5).map(({ i, score }) => ({
    ...df[i],
    confidence: Math.round(score * 100)
  }));

  res.status(200).json(top);
}
