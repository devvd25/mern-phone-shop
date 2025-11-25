import React, { useEffect, useState } from 'react';
import api from '../api/axios.js';

export default function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentDuration, setCurrentDuration] = useState(5000);

  useEffect(() => {
    async function loadBanners() {
      try {
        const { data } = await api.get('/banners');
        setBanners(data);
        if (data.length > 0) {
          setCurrentDuration(data[0].duration || 5000);
        }
      } catch (err) {
        console.error('Error loading banners:', err);
      }
    }
    loadBanners();
  }, []);

  // Auto slide with dynamic duration per banner
  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % banners.length;
        setCurrentDuration(banners[nextIndex].duration || 5000);
        return nextIndex;
      });
    }, currentDuration);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length, currentDuration]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setCurrentDuration(banners[index].duration || 5000);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + banners.length) % banners.length;
    setCurrentIndex(prevIndex);
    setCurrentDuration(banners[prevIndex].duration || 5000);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % banners.length;
    setCurrentIndex(nextIndex);
    setCurrentDuration(banners[nextIndex].duration || 5000);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div
      className="banner-slider position-relative"
      style={{
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '3rem',
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides Container */}
      <div
        className="slides-wrapper d-flex"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={banner._id}
            className="slide"
            style={{
              minWidth: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            {banner.link ? (
              <a href={banner.link} style={{ display: 'block', height: '100%' }}>
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </a>
            ) : (
              <img
                src={banner.imageUrl}
                alt={banner.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-3"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              opacity: 0.7,
              border: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              zIndex: 10,
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
          >
            ‹
          </button>
          <button
            onClick={goToNext}
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              opacity: 0.7,
              border: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              zIndex: 10,
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
          >
            ›
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x mb-2"
          style={{ zIndex: 10 }}
        >
          <div className="d-flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="btn btn-sm p-0"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentIndex === index ? 'white' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
