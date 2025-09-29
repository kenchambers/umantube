import { YouTubeVideo, YouTubeSearchResponse, VideoFilters } from '../types/youtube';
import { scoreContent, shouldFilterContent, ContentScore, ChannelData, CommentThread, analyzeCreatorEngagement, CreatorEngagementData } from './contentAnalysis';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Mock data for demo purposes
const mockVideos: YouTubeVideo[] = [
  {
    id: { videoId: 'dQw4w9WgXcQ' },
    snippet: {
      title: 'Real Content - No AI Generated',
      description: 'This is authentic human-created content...',
      thumbnails: {
        medium: { url: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop' },
        high: { url: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=480&h=270&fit=crop' }
      },
      channelTitle: 'Authentic Creator',
      publishedAt: '2024-01-15T10:00:00Z',
      channelId: 'UC_authentic_creator_123'
    },
    statistics: {
      viewCount: '1234567',
      likeCount: '45678'
    }
  },
  {
    id: { videoId: 'dQw4w9WgXcR' },
    snippet: {
      title: 'Human Made Tutorial',
      description: 'Learn something new with genuine human expertise...',
      thumbnails: {
        medium: { url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop' },
        high: { url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=480&h=270&fit=crop' }
      },
      channelTitle: 'Real Tutorials',
      publishedAt: '2024-01-14T15:30:00Z',
      channelId: 'UC_real_tutorials_456'
    },
    statistics: {
      viewCount: '890123',
      likeCount: '23456'
    }
  },
  {
    id: { videoId: 'dQw4w9WgXcS' },
    snippet: {
      title: 'Authentic Music Performance',
      description: 'Live performance by real musicians...',
      thumbnails: {
        medium: { url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop' },
        high: { url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=480&h=270&fit=crop' }
      },
      channelTitle: 'Live Music',
      publishedAt: '2024-01-13T20:45:00Z',
      channelId: 'UC_live_music_789'
    },
    statistics: {
      viewCount: '456789',
      likeCount: '12345'
    }
  }
];

// Get detailed video information including statistics
const getVideoDetails = async (videoIds: string[]): Promise<YouTubeVideo[]> => {
  if (!API_KEY || videoIds.length === 0) return [];
  
  // Limit to 5 videos max to save quota (was 10)
  const limitedIds = videoIds.slice(0, 5);
  
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&fields=items(id,snippet(title,description,channelId,channelTitle,publishedAt,thumbnails.medium,thumbnails.high,tags),statistics(viewCount,likeCount,commentCount))&id=${limitedIds.join(',')}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 403) {
        console.warn('YouTube API key invalid or quota exceeded for video details. Using basic video data.');
        return [];
      }
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items.map((item: any) => ({
      id: { videoId: item.id },
      snippet: item.snippet,
      statistics: item.statistics
    }));
  } catch (error) {
    console.warn('Error fetching video details, using basic filtering:', error);
    return [];
  }
};

// Get channel information
const getChannelDetails = async (channelIds: string[]): Promise<ChannelData[]> => {
  if (!API_KEY || channelIds.length === 0) return [];
  
  // Limit to 3 unique channels max to save quota (was 5)
  const uniqueIds = [...new Set(channelIds)].slice(0, 3);
  
  try {
    const response = await fetch(
      `${BASE_URL}/channels?part=snippet,statistics&fields=items(id,snippet(title,description,publishedAt,thumbnails.default),statistics(viewCount,subscriberCount,videoCount))&id=${uniqueIds.join(',')}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 403) {
        console.warn('YouTube API key invalid or quota exceeded. Using fallback mode.');
        return [];
      }
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.warn('Error fetching channel details, falling back to basic filtering:', error);
    return [];
  }
};


// Get comment threads for a video
const getVideoComments = async (videoId: string, maxResults: number = 15): Promise<CommentThread[]> => {
  if (!API_KEY) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/commentThreads?part=snippet&fields=items(snippet.topLevelComment.snippet(authorChannelId.value,textDisplay,likeCount),snippet.totalReplyCount)&videoId=${videoId}&order=relevance&maxResults=${maxResults}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      // Comments might be disabled, return empty array
      if (response.status === 403 || response.status === 404) {
        return [];
      }
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.warn('Error fetching video comments:', error);
    return [];
  }
};


// Analyze creator engagement across multiple videos
const analyzeChannelCreatorEngagement = async (channelId: string): Promise<CreatorEngagementData | undefined> => {
  if (!API_KEY) return undefined;
  
  try {
    // QUOTA OPTIMIZATION: Skip expensive channel video search
    // Instead, analyze comments on the videos we already have from search results
    console.log('Skipping creator engagement analysis to save quota');
    return undefined;
    
    // TODO: Re-enable this feature when we implement caching or have higher quota
  } catch (error) {
    console.warn('Error analyzing creator engagement:', error);
    return undefined;
  }
};

// Advanced content filtering using multi-layered analysis
const filterLowQualityContent = async (videos: YouTubeVideo[]): Promise<YouTubeVideo[]> => {
  if (videos.length === 0) {
    return [];
  }
  
  if (!API_KEY) {
    // For mock data, use simple filtering
    return videos.filter(video => {
      const score = scoreContent(video);
      console.log(`Mock video "${video.snippet.title}" scored: ${score.score} (reasons: ${score.reasons.join(', ')})`);
      return !shouldFilterContent(score, -15); // Very lenient threshold for mock data
    });
  }
  
  try {
    // QUOTA OPTIMIZATION: Reduce sample size from 10 to 5 videos
    const sampleVideos = videos.slice(0, 5);
    const remainingVideos = videos.slice(5);
    
    // Get detailed video information for sample
    const videoIds = sampleVideos.map(v => v.id.videoId);
    const detailedVideos = await getVideoDetails(videoIds);
    
    // Merge detailed info back into videos
    const mergedVideos = sampleVideos.map(video => {
      const detailed = detailedVideos.find(d => d.id.videoId === video.id.videoId);
      return detailed || video;
    });
    
    // Get unique channel IDs for analysis (reduced to 3)
    const channelIds = [...new Set(mergedVideos.map(v => v.snippet.channelId))].slice(0, 3);
    const channelData = await getChannelDetails(channelIds);
    
    // Create channel map for quick lookup
    const channelMap = new Map(channelData.map(c => [c.id, c]));
    
    // QUOTA OPTIMIZATION: Skip creator engagement analysis entirely
    const engagementMap = new Map();
    
    // Filter sample videos with full analysis
    const filteredSample = mergedVideos.filter(video => {
      const channel = channelMap.get(video.snippet.channelId);
      const engagement = engagementMap.get(video.snippet.channelId);
      const recentVideos = []; // Skip to save quota
      
      const score = scoreContent(video, channel, recentVideos, engagement);
      const shouldFilter = shouldFilterContent(score, -10);
      
      console.log(`Filter - "${video.snippet.title.substring(0, 50)}..." scored: ${score.score}, filtered: ${shouldFilter}`);
      if (score.reasons.length > 0) {
        console.log(`  Reasons: ${score.reasons.slice(0, 2).join(', ')}`);
      }
      
      return !shouldFilter;
    });
    
    // Apply basic filtering to remaining videos
    const basicFiltered = remainingVideos.filter(video => {
      const score = scoreContent(video);
      const shouldFilter = shouldFilterContent(score, -15);
      return !shouldFilter;
    });
    
    const finalResults = [...filteredSample, ...basicFiltered];
    console.log(`✅ Filtered: ${finalResults.length}/${videos.length} videos passed quality check`);
    
    return finalResults;
  } catch (error) {
    console.warn('Error in advanced content filtering, using fallback:', error);
    // Fallback to basic filtering
    return videos.filter(video => {
      const score = scoreContent(video);
      return !shouldFilterContent(score, -15);
    });
  }
};

// Convert filter values to YouTube API parameters
const getPublishedAfter = (uploadDate: string): string | undefined => {
  const now = new Date();
  switch (uploadDate) {
    case 'hour':
      return new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    case 'today':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    case 'week':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    case 'month':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    case 'year':
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
    default:
      return undefined;
  }
};

const getVideoDuration = (duration: string): string | undefined => {
  switch (duration) {
    case 'short':
      return 'short';
    case 'medium':
      return 'medium';
    case 'long':
      return 'long';
    default:
      return undefined;
  }
};

export const searchVideos = async (
  query: string = 'trending', 
  filters: VideoFilters,
  pageToken?: string,
  maxResults: number = 15
): Promise<YouTubeSearchResponse> => {
  // For demo purposes, return mock data
  if (!API_KEY) {
    console.log('Using mock data - set VITE_YOUTUBE_API_KEY for real API access');
    const filteredVideos = await filterLowQualityContent(mockVideos);
    return {
      items: filteredVideos,
      pageInfo: {
        totalResults: filteredVideos.length,
        resultsPerPage: maxResults
      }
    };
  }

  try {
    // Build query parameters
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: maxResults.toString(),
      q: query,
      type: filters.type === 'any' ? 'video' : filters.type,
      order: filters.sortBy,
      fields: 'items(id.videoId,snippet(title,description,channelId,channelTitle,publishedAt,thumbnails.medium,thumbnails.high,tags)),nextPageToken,prevPageToken,pageInfo',
      key: API_KEY
    });

    // Add optional parameters
    if (pageToken) {
      params.append('pageToken', pageToken);
    }

    const publishedAfter = getPublishedAfter(filters.uploadDate);
    if (publishedAfter) {
      params.append('publishedAfter', publishedAfter);
    }

    const videoDuration = getVideoDuration(filters.duration);
    if (videoDuration) {
      params.append('videoDuration', videoDuration);
    }

    const response = await fetch(
      `${BASE_URL}/search?${params.toString()}`
    );

    if (!response.ok) {
      if (response.status === 403) {
        console.warn('YouTube API key invalid or quota exceeded. Using mock data.');
        const filteredVideos = await filterLowQualityContent(mockVideos);
        return {
          items: filteredVideos,
          pageInfo: {
            totalResults: filteredVideos.length,
            resultsPerPage: maxResults
          }
        };
      }
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data: YouTubeSearchResponse = await response.json();
    
    // QUOTA OPTIMIZATION: Use search results directly, get details only for filtering
    const filteredVideos = await filterLowQualityContent(data.items);
    
    console.log(`✅ Search quota used: ~${100 + (filteredVideos.length > 5 ? 2 : 1)} units`);
    
    return {
      items: filteredVideos,
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken,
      pageInfo: data.pageInfo
    };
  } catch (error) {
    console.warn('Error fetching videos, using mock data:', error);
    const filteredVideos = await filterLowQualityContent(mockVideos);
    return {
      items: filteredVideos,
      pageInfo: {
        totalResults: filteredVideos.length,
        resultsPerPage: maxResults
      }
    };
  }
};

export const getTrendingVideos = async (): Promise<YouTubeVideo[]> => {
  if (!API_KEY) {
    return await filterLowQualityContent(mockVideos);
  }
  
  try {
    // Get trending videos from different regions for better content variety
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&fields=items(id,snippet(title,description,channelId,channelTitle,publishedAt,thumbnails.medium,thumbnails.high,tags),statistics(viewCount,likeCount,commentCount))&chart=mostPopular&maxResults=15&regionCode=US&key=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 403) {
        console.warn('YouTube API key invalid or quota exceeded for trending videos. Using mock data.');
        return await filterLowQualityContent(mockVideos);
      }
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    const videos = data.items.map((item: any) => ({
      id: { videoId: item.id },
      snippet: item.snippet,
      statistics: item.statistics
    }));
    
    // Filter out synthetic content
    const filteredVideos = await filterLowQualityContent(videos);
    
    console.log(`✅ Trending quota used: ~1 unit, filtered: ${filteredVideos.length}/${data.items.length}`);
    
    return filteredVideos;
  } catch (error) {
    console.warn('Error fetching trending videos, using mock data:', error);
    return await filterLowQualityContent(mockVideos);
  }
};