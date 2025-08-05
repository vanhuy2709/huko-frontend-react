export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Hôm qua';
  } else if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} tuần trước`;
  } else {
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

export const shareOnTwitter = (title: string, subtitle: string) => {
  const text = `${title} - ${subtitle}`;
  const url = globalThis.location.href;
  globalThis.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  );
};

export const shareOnFacebook = () => {
  const url = globalThis.location.href;
  globalThis.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
};

export const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(globalThis.location.href);
    alert('Link đã được copy vào clipboard!');
  } catch (error) {
    console.error('Failed to copy:', error);
  }
};
