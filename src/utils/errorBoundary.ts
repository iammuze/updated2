export const logError = (error: Error, info: { componentStack: string }) => {
  // In production, send to error tracking service
  console.error('Error:', error);
  console.error('Component Stack:', info.componentStack);
};

export const formatErrorMessage = (error: Error): string => {
  return `${error.name}: ${error.message}`;
};

export const isNetworkError = (error: Error): boolean => {
  return error.message.toLowerCase().includes('network') || 
         error.message.toLowerCase().includes('failed to fetch');
};