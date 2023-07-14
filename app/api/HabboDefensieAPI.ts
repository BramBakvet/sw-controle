export async function getServerSideProps(searchValue: string) {
  try {
    const response = await fetch(`/api/members?searchValue=${searchValue}`);
    const member = await response.json();
    return {
      props: { member }
    };
  } catch (error) {
    console.error('Error fetching members:', error);
    return {
      props: { member: null },
    };
  }
}

export async function getDepartmentProps(id: string | undefined) {
  try {
    const response = await fetch(`/api/departments?id=${id}`);
    const member = await response.json();

    return {
      props: { member }
    };
  } catch (error) {
    console.error('Error fetching members:', error);
    return {
      props: { member: null },
    };
  }
}

export async function getQualificationsProps(id: string | undefined) {
  try {
    const response = await fetch(`/api/qualifications?id=${id}`);
    const qualifications = await response.json();
    return {
      props: { qualifications }
    };
  } catch (error) {
    console.error('Error fetching qualifications:', error);
    return {
      props: { qualifications: null },
    };
  }
}

export async function getAwardingsProps(id: string | undefined) {
  try {
    const response = await fetch(`/api/awardings?id=${id}`);
    const awardings = await response.json();

    return {
      props: {
        awardings: awardings || [],
      },
    };
  } catch (error) {
    console.error('Error fetching awardings:', error);
    return {
      props: {
        awardings: [],
      },
    };
  }
}








