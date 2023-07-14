let awardings: string[] | undefined = [];

export const setAwardings = (newAwardings: string[] | undefined) => {
  awardings = newAwardings;
};

export const getAwardings = () => {
  return awardings;
};
