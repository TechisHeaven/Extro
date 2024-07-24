//Timestamp to date Conversion Function
export function formatTimeStamps(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (isToday) {
    return `Today, ${date.toLocaleTimeString("en-US", options)}`;
  } else if (isYesterday) {
    return `Yesterday, ${date.toLocaleTimeString("en-US", options)}`;
  } else {
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    return `${formattedDate}, ${date.toLocaleTimeString("en-US", options)}`;
  }
}
