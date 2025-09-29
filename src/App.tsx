import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VideoGrid } from './components/VideoGrid';
import { VideoModal } from './components/VideoModal';
import { FilterPanel } from './components/FilterPanel';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';
import { GoogleAnalytics, trackEvent } from './components/GoogleAnalytics';
import { useTheme } from './hooks/useTheme';
import { YouTubeVideo, VideoFilters } from './types/youtube';
import { searchVideos, getTrendingVideos } from './services/youtube';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<VideoFilters>({
    uploadDate: 'any',
    type: 'any',
    duration: 'any',
    sortBy: 'relevance'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>();
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [pageTokens, setPageTokens] = useState<{ [key: number]: string }>({});

  // Google Analytics Measurement ID - replace with your actual ID
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
  useEffect(() => {
    loadTrendingVideos();
  }, []);

  const loadTrendingVideos = async () => {
    setLoading(true);
    setCurrentQuery('');
    setCurrentPage(1);
    setPageTokens({});
    try {
      const trendingVideos = await getTrendingVideos();
      setVideos(trendingVideos.slice(0, 20));
      setTotalResults(trendingVideos.length);
      setNextPageToken(undefined);
      setPrevPageToken(undefined);
      trackEvent('page_view', {
        page_title: 'Home - Trending Videos',
        content_type: 'trending'
      });
    } catch (error) {
      console.error('Error loading trending videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, resetPage = true) => {
    setLoading(true);
    if (resetPage) {
      setCurrentPage(1);
      setPageTokens({});
    }
    setCurrentQuery(query);
    
    try {
      const pageToken = resetPage ? undefined : pageTokens[currentPage];
      const searchResults = await searchVideos(query, filters, pageToken);
      setVideos(searchResults.items);
      setNextPageToken(searchResults.nextPageToken);
      setPrevPageToken(searchResults.prevPageToken);
      setTotalResults(searchResults.pageInfo.totalResults);
      
      trackEvent('search', {
        search_term: query,
        results_count: searchResults.items.length,
        filters: filters
      });
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: VideoFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setPageTokens({});
    
    if (currentQuery) {
      handleSearch(currentQuery, true);
    }
  };

  const handlePageChange = async (page: number) => {
    if (!currentQuery) return;
    
    setLoading(true);
    setCurrentPage(page);
    
    try {
      let pageToken: string | undefined;
      
      if (page > currentPage && nextPageToken) {
        pageToken = nextPageToken;
        setPageTokens(prev => ({ ...prev, [page]: nextPageToken }));
      } else if (page < currentPage && prevPageToken) {
        pageToken = prevPageToken;
      } else if (pageTokens[page]) {
        pageToken = pageTokens[page];
      }
      
      const searchResults = await searchVideos(currentQuery, filters, pageToken);
      setVideos(searchResults.items);
      setNextPageToken(searchResults.nextPageToken);
      setPrevPageToken(searchResults.prevPageToken);
      
      // Store next page token for future navigation
      if (searchResults.nextPageToken) {
        setPageTokens(prev => ({ ...prev, [page + 1]: searchResults.nextPageToken! }));
      }
      
      trackEvent('page_change', {
        page: page,
        search_term: currentQuery
      });
    } catch (error) {
      console.error('Error changing page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    trackEvent('video_click', {
      video_id: video.id.videoId,
      video_title: video.snippet.title,
      channel_title: video.snippet.channelTitle
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200 ${theme}`}>
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      
      <Header 
        onSearch={handleSearch}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {currentQuery ? `Search Results for "${currentQuery}"` : 'Authentic Content'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {currentQuery ? 
              `${totalResults.toLocaleString()} results curated and filtered for authentic content` :
              'Curated videos free from AI-generated content'
            }
          </p>
        </div>
        
        {currentQuery && (
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />
        )}
        
        <VideoGrid 
          videos={videos}
          loading={loading}
          onVideoClick={handleVideoClick}
        />
        
        {currentQuery && !loading && (
          <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            resultsPerPage={15}
            onPageChange={handlePageChange}
            hasNextPage={!!nextPageToken}
            hasPrevPage={currentPage > 1}
          />
        )}
      </main>

      <VideoModal 
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      
      <Footer />
    </div>
  );
}

export default App;