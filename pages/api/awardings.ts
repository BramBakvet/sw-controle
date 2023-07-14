import { NextApiRequest, NextApiResponse } from 'next';

export async function fetchAwardings(id: string) {
  try {
    const response = await fetch(`https://www.habbodefensie.nl/api/members/${id}/awardings?from=2000&to=today`);
    const awardings = await response.json();
    return awardings;
  } catch (error) {
    console.error('Error fetching awardings:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id === 'string') {
    try {
      const awardings = await fetchAwardings(id);
      if (awardings) {
        res.status(200).json(awardings);
      } else {
        res.status(500).json({ error: 'Failed to fetch awardings' });
      }
    } catch (error) {
      console.error('Error in API handler:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
