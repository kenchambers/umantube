import React from 'react';
import { VideoFilters } from '../types/youtube';
import { Filter, ChevronDown } from 'lucide-react';

interface FilterPanelProps {
  filters: VideoFilters;
  onFiltersChange: (filters: VideoFilters) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle
}) => {
  const updateFilter = (key: keyof VideoFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Search filters</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-4 p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Search filters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Upload Date Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Upload Date
              </h4>
              <div className="space-y-2">
                {[
                  { value: 'any', label: 'Any time' },
                  { value: 'hour', label: 'Last hour' },
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'This week' },
                  { value: 'month', label: 'This month' },
                  { value: 'year', label: 'This year' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="uploadDate"
                      value={option.value}
                      checked={filters.uploadDate === option.value}
                      onChange={(e) => updateFilter('uploadDate', e.target.value)}
                      className="mr-2 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Type
              </h4>
              <div className="space-y-2">
                {[
                  { value: 'any', label: 'Any' },
                  { value: 'video', label: 'Video' },
                  { value: 'channel', label: 'Channel' },
                  { value: 'playlist', label: 'Playlist' },
                  { value: 'movie', label: 'Movie' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={option.value}
                      checked={filters.type === option.value}
                      onChange={(e) => updateFilter('type', e.target.value)}
                      className="mr-2 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Duration
              </h4>
              <div className="space-y-2">
                {[
                  { value: 'any', label: 'Any' },
                  { value: 'short', label: 'Under 4 minutes' },
                  { value: 'medium', label: '4-20 minutes' },
                  { value: 'long', label: 'Over 20 minutes' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value={option.value}
                      checked={filters.duration === option.value}
                      onChange={(e) => updateFilter('duration', e.target.value)}
                      className="mr-2 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Sort By
              </h4>
              <div className="space-y-2">
                {[
                  { value: 'relevance', label: 'Relevance' },
                  { value: 'date', label: 'Upload date' },
                  { value: 'viewCount', label: 'View count' },
                  { value: 'rating', label: 'Rating' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy"
                      value={option.value}
                      checked={filters.sortBy === option.value}
                      onChange={(e) => updateFilter('sortBy', e.target.value)}
                      className="mr-2 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};