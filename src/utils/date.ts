export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getDaysRemaining = (endDate: string | Date): number => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isExpiringSoon = (endDate: string | Date, threshold: number = 30): boolean => {
  const daysRemaining = getDaysRemaining(endDate);
  return daysRemaining <= threshold;
};