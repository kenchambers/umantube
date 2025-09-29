import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { YouTubeVideo } from '../types/youtube';

interface VideoModalProps {
  video: YouTubeVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  if (!isOpen || !video) return null;

  const youtubeUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
            {video.snippet.title}
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Watch on YouTube"
            >
              <ExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="aspect-video mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
              title={video.snippet.title}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {video.snippet.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {video.snippet.channelTitle}
              </p>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Watch on YouTube
              </a>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {video.snippet.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};