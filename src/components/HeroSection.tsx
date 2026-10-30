import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { storageService } from '../services/storageService';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate: _onNavigate }) => {
  const [settings, setSettings] = useState(() => storageService.getSettings());
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return storageService.subscribe(() => {
      setSettings(storageService.getSettings());
    });
  }, []);

  // Update viewport state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Standardize on universal H.264 MP4 format to ensure seamless playback across all browsers and devices
  const rawDesktopVideo = (settings.heroVideoUrl && settings.heroVideoUrl !== '/videos/hero-banner.mp4')
    ? settings.heroVideoUrl
    : '/images/IMG_3889.mp4';
  const desktopVideoUrl = rawDesktopVideo.toLowerCase().endsWith('.mov')
    ? '/images/IMG_3889.mp4'
    : rawDesktopVideo;

  const desktopPoster = (settings.heroPoster && settings.heroPoster !== '/images/hero-masculine-bold.jpg')
    ? settings.heroPoster
    : '/images/hero-desktop-poster.jpg';

  const rawMobileVideo = settings.heroMobileVideoUrl || '/images/IMG_3418.mp4';
  const mobileVideoUrl = rawMobileVideo.toLowerCase().endsWith('.mov')
    ? '/images/IMG_3418.mp4'
    : rawMobileVideo;

  const mobilePoster = settings.heroMobilePoster || '/images/hero-mobile-poster.jpg';

  const currentVideoUrl = isMobile ? mobileVideoUrl : desktopVideoUrl;
  const currentPoster = isMobile ? mobilePoster : desktopPoster;

  // Function to ensure video always plays continuously without play/pause controls
  const playActiveVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = isMuted;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsVideoReady(true);
        })
        .catch(() => {
          // If browser restricts unmuted autoplay, enforce muted state and retry
          video.muted = true;
          video.play()
            .then(() => setIsVideoReady(true))
            .catch(() => {});
        });
    }
  }, [isMuted]);

  useEffect(() => {
    setIsVideoReady(false);
    playActiveVideo();

    // In case strict mobile browser policies require user engagement before video playback starts
    const handleFirstUserGesture = () => {
      playActiveVideo();
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('scroll', handleFirstUserGesture);
    };

    window.addEventListener('touchstart', handleFirstUserGesture, { passive: true });
    window.addEventListener('click', handleFirstUserGesture, { passive: true });
    window.addEventListener('scroll', handleFirstUserGesture, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('scroll', handleFirstUserGesture);
    };
  }, [currentVideoUrl, playActiveVideo]);

  // Audio Mute/Unmute toggle only (video plays uninterrupted)
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      videoRef.current.play().catch(() => {});
    }
  };

  // If the browser or OS pauses playback (e.g. background tab or battery saver), auto-resume
  const handleAutoResume = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!document.hidden && video.paused) {
      video.play().catch(() => {});
    }
  };

  return (
    <section
      className="hero-banner-mobile relative w-full h-[calc(100vh-36px)] [height:calc(100dvh-36px)] min-h-[calc(100vh-36px)] [min-height:calc(100dvh-36px)] overflow-hidden bg-[#0c0c0c] select-none"
    >
      {/* Full-Width Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0c0c0c]">
        {/* Instant Poster Image: Shown immediately on load with zero flash while video streams */}
        <img
          src={currentPoster}
          alt="PASAAVA Hero"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Optimized Video Stream - Mounted for active viewport to save bandwidth and guarantee smooth 60fps */}
        <video
          ref={videoRef}
          key={currentVideoUrl}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          poster={currentPoster}
          preload="auto"
          onLoadedData={() => setIsVideoReady(true)}
          onPlaying={() => setIsVideoReady(true)}
          onPause={handleAutoResume}
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'opacity, transform'
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-700 ease-out ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={currentVideoUrl} type="video/mp4" />
        </video>

        {/* Soft top gradient to blend smoothly with floating header */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none z-[1]" />
      </div>

      {/* Audio Mute / Unmute Control ONLY */}
      <div className="hero-mute-btn absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-20">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          title={isMuted ? 'Unmute audio' : 'Mute audio'}
          className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-white/40 text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white/90 group-hover:text-white transition-colors">
                Sound Off
              </span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white transition-colors">
                Sound On
              </span>
              <span className="flex items-end gap-[2px] h-3 w-3 ml-0.5" aria-hidden="true">
                <span className="w-[2px] h-full bg-emerald-400 rounded-full animate-pulse" />
                <span className="w-[2px] h-2/3 bg-emerald-400 rounded-full animate-pulse [animation-delay:150ms]" />
                <span className="w-[2px] h-4/5 bg-emerald-400 rounded-full animate-pulse [animation-delay:300ms]" />
              </span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};

