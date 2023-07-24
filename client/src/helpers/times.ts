export const formatTime = (date: any) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const calculateTotalTime = (intervals: any[]) => {
  let totalMinutes = 0;

  intervals.forEach((interval) => {
    const startTime = new Date(interval.startTime);
    const endTime = new Date(interval.endTime);
    const difference = endTime.getTime() - startTime.getTime();
    totalMinutes += difference / (1000 * 60);
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hours and ${minutes} minutes`;
};
