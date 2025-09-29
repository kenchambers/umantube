import React from 'react';
import { YouTubeVideo } from '../types/youtube';
import { VideoCard } from './VideoCard';
import { Loader2, Shield } from 'lucide-react';

interface VideoGridProps {
  videos: YouTubeVideo[];
  loading: boolean;
  onVideoClick: (video: YouTubeVideo) => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading, onVideoClick }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">
          Filtering out AI-generated content...
        </span>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-20">
        <Shield className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No authentic content found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Try a different search term or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id.videoId}
          video={video}
          onClick={() => onVideoClick(video)}
        />
      ))}
    </div>
  );
};