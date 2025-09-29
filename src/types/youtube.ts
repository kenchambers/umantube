export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    channelId: string;
    thumbnails: {
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
    tags?: string[];
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface VideoFilters {
  uploadDate: 'any' | 'hour' | 'today' | 'week' | 'month' | 'year';
  type: 'any' | 'video' | 'channel' | 'playlist' | 'movie';
  duration: 'any' | 'short' | 'medium' | 'long';
  sortBy: 'relevance' | 'date' | 'viewCount' | 'rating';
}