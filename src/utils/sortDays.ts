const dayOrder: Record<string, number> = {
  'MONDAY': 1,
  'TUESDAY': 2,
  'WEDNESDAY': 3,
  'THURSDAY': 4,
  'FRIDAY': 5,
  'SATURDAY': 6,
  'SUNDAY': 7
};

export const sortAvailability = (slots: any[]) => {
  return slots.sort((a, b) => {
    const dayDiff = dayOrder[a.dayOfWeek.toUpperCase()] - dayOrder[b.dayOfWeek.toUpperCase()];
    
    if (dayDiff === 0) {
      return a.startTime.localeCompare(b.startTime);
    }
    
    return dayDiff;
  });
};