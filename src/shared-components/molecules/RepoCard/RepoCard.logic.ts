export const formatDate = (dateString: string): string => {
  // Parse the input date string
  const date = new Date(dateString);
  
  // Just in case we get an invalid date
  if (isNaN(date.getTime())) {
    return 'Unknown date';
  }
  
  // Format as "Month Day, Year" (like GitHub displays)
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  // Calculate time differences
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = (now.getMonth() - date.getMonth()) + 
                     (now.getFullYear() - date.getFullYear()) * 12;
  const diffYears = now.getFullYear() - date.getFullYear();
  
  // Adjust year difference if the anniversary hasn't occurred yet
  let adjustedYearDiff = diffYears;
  if (now.getMonth() < date.getMonth() || 
      (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())) {
    adjustedYearDiff--;
  }
  
  // Format the time ago based on the most appropriate unit
  let timeAgo = '';
  if (adjustedYearDiff > 0) {
    timeAgo = `${adjustedYearDiff} ${adjustedYearDiff === 1 ? 'year' : 'years'} ago`;
  } else if (diffMonths > 0) {
    timeAgo = `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  } else if (diffWeeks > 0) {
    timeAgo = `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays > 0) {
    timeAgo = `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else {
    timeAgo = 'today';
  }
  
  return `${formattedDate} (${timeAgo})`;
};

export const truncateDescription = (description: string, maxLength: number = 150): string => {
  if (description.length <= maxLength) return description;
  return `${description.substring(0, maxLength)}...`;
}; 