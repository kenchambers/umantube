import React from 'react';
import { YouTubeVideo } from '../types/youtube';
import { Eye, ThumbsUp, Calendar } from 'lucide-react';

interface VideoCardProps {
  video: YouTubeVideo;
  onClick: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const formatViewCount = (count: string) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return count;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  return (
    <div 
      className="group cursor-pointer transition-all duration-200 hover:scale-105"
      onClick={onClick}
    >
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">
          {video.snippet.title}
        </h3>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
          {video.snippet.channelTitle}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          {video.statistics && (
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{formatViewCount(video.statistics.viewCount)} views</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(video.snippet.publishedAt)}</span>
          </div>
          
          {video.statistics && (
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              <span>{formatViewCount(video.statistics.likeCount)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};