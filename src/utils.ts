export const getDate = (created_at_i: number) => {
  const date = new Date(created_at_i * 1000);
  const currentDate = new Date();
  const timeDifference = (currentDate.getTime() - date.getTime()) / (1000 * 60);

  return timeDifference < 60
    ? `${Math.floor(timeDifference)} m`
    : `${Math.floor(timeDifference / 60)} h`;
};
