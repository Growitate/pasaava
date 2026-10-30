import React, { useState, useEffect } from 'react';
import { Film, Save, Check } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { SiteSettings } from '../../types';

interface AdminHomepagePageProps {
  onNavigate: (path: string) => void;
}

export const AdminHomepagePage: React.FC<AdminHomepagePageProps> = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => storageService.getSettings());
  const [videoUrl, setVideoUrl] = useState(settings.heroVideoUrl);
  const [posterUrl, setPosterUrl] = useState(settings.heroPoster);
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle || 'ENGINEERED FOR THE MODERN ICON');
  const [heroSubtitle, setHeroSubtitle] = useState(
    settings.heroSubtitle || '316L Surgical Stainless Steel • Hypoallergenic • 100% Waterproof'
  );
  const [announcement, setAnnouncement] = useState(settings.announcementText);
  const [saved, setSaved] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    return storageService.subscribe(() => {
      const s = storageService.getSettings();
      setSettings(s);
      setVideoUrl(s.heroVideoUrl);
      setPosterUrl(s.heroPoster);
      setHeroTitle(s.heroTitle || 'ENGINEERED FOR THE MODERN ICON');
      setHeroSubtitle(s.heroSubtitle || '316L Surgical Stainless Steel • Hypoallergenic • 100% Waterproof');
      setAnnouncement(s.announcementText);
    });
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    storageService.updateSettings({
      heroVideoUrl: videoUrl,
      heroPoster: posterUrl,
      heroTitle,
      heroSubtitle,
      announcementText: announcement
    });
    setSaved(true);
    showNotification('Homepage settings saved!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Storefront Presentation
          </span>
          <h2 className="text-xl font-bold text-[#111111] mt-0.5">Homepage & Hero Banner</h2>
          <p className="text-xs text-gray-500">
            Control the main cinematic hero video, fallback poster, and announcement ticker
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white rounded-xl text-xs font-semibold hover:bg-black transition-all cursor-pointer shadow-sm"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Changes Saved!' : 'Save All Changes'}</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 bg-black text-white text-xs font-medium rounded-xl shadow-lg flex items-center justify-between">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Hero Video Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white p-6 rounded-2xl border border-[#EBEBEB] space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Film className="w-4 h-4 text-black" />
            <h3 className="text-sm font-bold text-[#111111]">Hero Video & Poster Configuration</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Hero MP4 Video URL
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="/images/IMG_3889.mp4 or direct MP4 URL"
              className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Poster Image Fallback URL
            </label>
            <input
              type="text"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder="/images/hero-masculine-bold.jpg"
              className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Announcement Bar Ticker Message
            </label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="e.g. Free express shipping across India on orders over ₹999"
              className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="bg-white p-6 rounded-2xl border border-[#EBEBEB] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#111111]">Live Hero Player Preview</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-semibold uppercase">
                16:9 Display
              </span>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black relative border border-gray-200">
              <video
                key={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                poster={posterUrl}
                className="w-full h-full object-cover"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-xl text-[11px] text-gray-600 flex items-center justify-between">
            <span>Live Ticker:</span>
            <span className="font-semibold text-black truncate ml-2">"{announcement}"</span>
          </div>
        </div>
      </div>
    </div>
  );
};
