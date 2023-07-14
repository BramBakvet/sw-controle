import { NextApiRequest, NextApiResponse } from 'next';

export async function fetchMember(searchValue: string) {
  try {
    const response = await fetch(`https://www.habbodefensie.nl/api/members/search/${searchValue}`);
    const member = await response.json();
    return member;
  } catch (error) {
    console.error('Error fetching members:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { searchValue } = req.query;

  if (typeof searchValue === 'string') {
    const member = await fetchMember(searchValue);
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(500).json({ error: 'Failed to fetch member' });
    }
  } else {
    res.status(400).json({ error: 'Invalid search value' });
  }
}