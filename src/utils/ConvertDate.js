export const formatTimeAgo = (timestampString) => {
  if (timestampString === undefined) return "";
  const timestamp = new Date(timestampString).getTime();
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - timestamp;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 6) {
    // Nếu thời gian cách hiện tại trên 1 tuần, hiển thị ngày
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  } else if (days > 0) {
    return `${days} ngày trước`;
  } else if (hours > 0) {
    return `${hours} giờ trước`;
  } else if (minutes > 0) {
    return `${minutes} phút trước`;
  } else {
    return `${seconds} giây trước`;
  }
};
