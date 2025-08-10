export const convertToEmbedYoutubeUrl = (oldUrl: string) => {
  try {
    const urlObj = new URL(oldUrl);
    let videoId = '';
    let queryString = urlObj.search; // giữ nguyên toàn bộ query string

    // Nếu là dạng youtu.be
    if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.replace('/', '');
    }
    // Nếu là dạng youtube.com/watch?v=...
    else if (urlObj.hostname.includes('youtube.com')) {
      const params = new URLSearchParams(urlObj.search);
      videoId = params.get('v') || '';
      params.delete('v'); // bỏ v đi để query gọn hơn
      queryString = params.toString() ? `?${params.toString()}` : '';
    }

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}${queryString}`;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};
