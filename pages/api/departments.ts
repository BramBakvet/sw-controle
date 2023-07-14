import { NextApiRequest, NextApiResponse } from 'next';

export async function fetchAssignments(id: string) {
  try {
    const response = await fetch(`https://www.habbodefensie.nl/api/members/${id}/assignments`);
    const assignments = await response.json();
    return assignments;
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id === 'string') {
        try {
            const assignments = await fetchAssignments(id);
            if (assignments) {
              res.status(200).json(assignments);
            } else {
              res.status(500).json({ error: 'Failed to fetch assignments' });
            }
          } catch (error) {
            console.error('Error in API handler:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
      }
}
