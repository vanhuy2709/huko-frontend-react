import { useState, useEffect } from 'react';
import './blog.css';
import './blog-detail.css';
import { copyToClipboard, formatDate, shareOnFacebook, shareOnTwitter } from '@utils/format';

// Format functions
const formatContent = (content: string) => {
  // Simple HTML tag removal using DOM parsing approach
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const plainText = tempDiv.textContent || '';

  return plainText.split('\n\n').map((paragraph: string, index: number) => {
    if (paragraph.trim()) {
      return (
        <p key={index} className="blog-paragraph">
          {paragraph}
        </p>
      );
    }
    return null;
  });
};

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState<IProject | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!selectedBlog) return;

    const handleScroll = () => {
      const scrolled = globalThis.scrollY;
      const maxHeight = document.documentElement.scrollHeight - globalThis.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    globalThis.addEventListener('scroll', handleScroll);
    return () => globalThis.removeEventListener('scroll', handleScroll);
  }, [selectedBlog]);

  return (
    <article className="blog-detail">
      {/* Reading Progress Bar */}
      <div className="reading-progress">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => setSelectedBlog(null)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M12 19L5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Quay lại
      </button>

      {/* Social Share Buttons */}
      <div className="social-share">
        <button
          onClick={() =>
            shareOnTwitter(
              'Khám Phá Thế Giới Three.js: Tạo Trải Nghiệm 3D Tuyệt Vời',
              'Hướng dẫn toàn diện về việc tạo ra những ứng dụng web 3D ấn tượng với Three.js và WebGL'
            )
          }
          className="share-button twitter"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </button>

        <button onClick={shareOnFacebook} className="share-button facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        <button onClick={copyToClipboard} className="share-button copy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
      </div>

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="breadcrumb-container">
          <button onClick={() => setSelectedBlog(null)} className="breadcrumb-link">
            Blog
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">
            {'Khám Phá Thế Giới Three.js: Tạo Trải Nghiệm 3D Tuyệt Vời'}
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <div className="blog-meta">
            <span className="blog-category">{'Technology'}</span>
            <span className="blog-separator">•</span>
            <span className="blog-read-time">{8} phút đọc</span>
          </div>

          <h1 className="blog-title">
            {'Khám Phá Thế Giới Three.js: Tạo Trải Nghiệm 3D Tuyệt Vời'}
          </h1>

          <p className="blog-subtitle">
            {
              'Hướng dẫn toàn diện về việc tạo ra những ứng dụng web 3D ấn tượng với Three.js và WebGL'
            }
          </p>

          <div className="blog-author-info">
            <img src={'/assets/images/img2_.jpg'} alt={'Văn Huy'} className="author-avatar" />
            <div className="author-details">
              <span className="author-name">{'Văn Huy'}</span>
              <span className="publish-date">{formatDate('2024-01-15T10:00:00Z')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="blog-cover">
        <img
          src={'/assets/images/img1_.jpg'}
          alt={'Khám Phá Thế Giới Three.js: Tạo Trải Nghiệm 3D Tuyệt Vời'}
          className="cover-image"
        />
      </div>

      {/* Content */}
      <div className="blog-content">
        <div className="blog-content-wrapper">
          {/* Video if exists */}
          {
            <div className="blog-video">
              <video controls className="video-player" poster={'/assets/images/img1_.jpg'}>
                <source src={'/assets/textures/kda.mp4'} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            </div>
          }

          {/* Article Content */}
          <div className="blog-article">
            {formatContent(
              '# Giới thiệu về Three.js\n\nThree.js là một thư viện JavaScript mạnh mẽ giúp tạo ra những trải nghiệm 3D tuyệt vời trên web. Với Three.js, bạn có thể xây dựng từ những game đơn giản đến những ứng dụng 3D phức tạp.\n\n## Bắt đầu với Three.js\n\nĐể bắt đầu với Three.js, bạn cần hiểu ba thành phần cơ bản: Scene, Camera và Renderer. Đây là nền tảng của mọi ứng dụng Three.js.\n\nScene là không gian 3D nơi bạn đặt các đối tượng. Camera xác định góc nhìn của người dùng. Renderer chịu trách nhiệm vẽ scene lên canvas.\n\n## Tạo hình học và vật liệu\n\nThree.js cung cấp nhiều loại hình học có sẵn như BoxGeometry, SphereGeometry, PlaneGeometry. Bạn cũng có thể tạo hình học tùy chỉnh hoặc import từ các phần mềm 3D như Blender.\n\nVật liệu quyết định cách bề mặt của đối tượng phản ứng với ánh sáng. MeshBasicMaterial không bị ảnh hưởng bởi ánh sáng, trong khi MeshLambertMaterial và MeshPhongMaterial có thể tạo ra hiệu ứng ánh sáng phức tạp hơn.\n\n## Ánh sáng và bóng đổ\n\nÁnh sáng là yếu tố quan trọng để tạo nên không gian 3D chân thực. Three.js hỗ trợ nhiều loại ánh sáng: AmbientLight, DirectionalLight, PointLight, SpotLight.\n\nBóng đổ thêm chiều sâu cho scene. Để sử dụng bóng đổ, bạn cần enable shadow map trong renderer, đặt light để cast shadow, và object để receive shadow.'
            )}
          </div>

          {/* Tags */}
          {['Three.js', 'WebGL', '3D', 'JavaScript', 'Web Development'].length > 0 && (
            <div className="blog-tags">
              <h3 className="tags-title">Tags</h3>
              <div className="tags-list">
                {['Three.js', 'WebGL', '3D', 'JavaScript', 'Web Development'].map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="author-bio">
            <img src={'/assets/images/img2_.jpg'} alt={'Văn Huy'} className="author-bio-avatar" />
            <div className="author-bio-content">
              <h3 className="author-bio-name">{'Văn Huy'}</h3>
              {
                <p className="author-bio-text">
                  {
                    'Fullstack Developer với niềm đam mê về công nghệ 3D và trải nghiệm người dùng. Chuyên sâu về React, Three.js và các công nghệ web hiện đại.'
                  }
                </p>
              }
            </div>
          </div>

          {/* Mobile Social Share */}
          <div className="social-share-mobile">
            <h3 className="share-title">Chia sẻ bài viết</h3>
            <div className="share-buttons-mobile">
              <button
                onClick={() =>
                  shareOnTwitter(
                    'Khám Phá Thế Giới Three.js: Tạo Trải Nghiệm 3D Tuyệt Vời',
                    'Khám Phá Thế Giới Three.js: Tạo Trải Nghiệm 3D Tuyệt Vời'
                  )
                }
                className="share-button twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span>Twitter</span>
              </button>

              <button onClick={shareOnFacebook} className="share-button facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>

              <button onClick={copyToClipboard} className="share-button copy">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPage;
