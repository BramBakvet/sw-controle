import { NextApiRequest, NextApiResponse } from 'next';

export async function fetchQualifications(id: string) {
  try {
    const response = await fetch(`https://www.habbodefensie.nl/api/members/${id}/qualifications`);
    const qualifications = await response.json();
    return qualifications;
  } catch (error) {
    console.error('Error fetching qualifications:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id === 'string') {
    try {
      const qualifications = await fetchQualifications(id);
      if (qualifications) {
        res.status(200).json(qualifications);
      } else {
        res.status(500).json({ error: 'Failed to fetch qualifications' });
      }
    } catch (error) {
      console.error('Error in API handler:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid ID' });
  }
}
