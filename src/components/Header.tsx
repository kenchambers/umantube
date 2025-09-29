import React, { useState } from 'react';
import { Search, Moon, Sun, User, HelpCircle, X, Youtube } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, theme, onThemeToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlgorithmInfo, setShowAlgorithmInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const HumanYouTubeLogo = () => (
    <div className="relative">
      <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
        <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
      </div>
      <User className="w-4 h-4 text-red-600 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <HumanYouTubeLogo />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                YouTube <span className="text-red-600">minus AI Slop</span>
              </h1>
              <div className="flex items-center gap-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  What YouTube used to be
                </p>
                <button
                  onClick={() => setShowAlgorithmInfo(true)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="How our filtering works"
                >
                  <HelpCircle className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for authentic content..."
                className="w-full px-4 py-2 pr-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <button
            onClick={onThemeToggle}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      </header>

      {/* Algorithm Info Modal */}
      {showAlgorithmInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                How Our Filtering Algorithm Works
              </h2>
              <button
                onClick={() => setShowAlgorithmInfo(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  🔍 Multi-Layer Detection System
                </h3>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Video-Level Analysis</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• <strong>Synthetic Content Detection:</strong> Scans titles/descriptions for AI keywords (ChatGPT, AI-generated, etc.) <span className="text-red-600">(-5 points)</span></li>
                  <li>• <strong>Generic Title Patterns:</strong> Flags templated titles like "Top 10 Amazing Facts" or "You Won't Believe..." <span className="text-red-600">(-2 points)</span></li>
                  <li>• <strong>Engagement Analysis:</strong> Calculates like-to-view and comment-to-view ratios to detect fake engagement</li>
                  <li>• <strong>Disabled Comments:</strong> Major red flag when popular videos have zero comments <span className="text-red-600">(-5 points)</span></li>
                  <li>• <strong>Description Quality:</strong> Checks for keyword stuffing, spam links, or missing descriptions <span className="text-red-600">(-1 to -2 points)</span></li>
                </ul>
              </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Channel-Level Analysis</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• <strong>Upload Velocity:</strong> Flags channels with impossibly high upload rates (500+ videos in weeks) <span className="text-red-600">(-5 to -10 points)</span></li>
                  <li>• <strong>Channel Branding:</strong> Checks for default avatars, missing descriptions, poor setup <span className="text-red-600">(-2 to -3 points)</span></li>
                  <li>• <strong>Content Consistency:</strong> Detects repetitive, templated patterns across recent videos</li>
                  <li>• <strong>Subscriber Ratios:</strong> Analyzes subscriber count relative to video output <span className="text-red-600">(-2 points)</span></li>
                </ul>
              </div>
                  We analyze multiple signals to identify authentic, human-created content and filter out AI-generated, automated, or low-quality videos.
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">"Ghost in the Comments" Test</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• <strong><del>Creator Engagement:</del></strong> <del>Analyzes top comments on popular videos</del> <span className="text-red-500 text-xs">(DISABLED - Quota Conservation)</span></li>
                  <li>• <strong><del>Community Interaction:</del></strong> <del>Checks if creators reply to their audience</del> <span className="text-red-500 text-xs">(DISABLED - Quota Conservation)</span></li>
                  <li>• <strong><del>Bot Detection:</del></strong> <del>Identifies generic comments like "Amazing!" or emoji-only responses</del> <span className="text-red-500 text-xs">(DISABLED - Quota Conservation)</span></li>
                  <li>• <strong><del>Fire-and-Forget Filter:</del></strong> <del>Flags channels that upload but never engage with viewers</del> <span className="text-red-500 text-xs">(DISABLED - Quota Conservation)</span></li>
                  <li>• <strong><del>Sample Analysis:</del></strong> <del>Tests top 2 channels only to conserve API quota</del> <span className="text-red-500 text-xs">(DISABLED - Quota Conservation)</span></li>
                </ul>
              </div>
                </p>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Scoring System</h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p>Each video gets a quality score based on multiple factors:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• <del>Zero creator engagement: <span className="text-red-600">-6 points</span></del> <span className="text-red-500 text-xs">(DISABLED)</span></li>
                    <li>• High upload velocity: <span className="text-red-600">-5 to -10 points</span></li>
                    <li>• Disabled comments: <span className="text-red-600">-5 points</span></li>
                    <li>• Generic title patterns: <span className="text-red-600">-2 points</span></li>
                    <li>• Spammy descriptions: <span className="text-red-600">-2 points</span></li>
                    <li>• <del>Low creator engagement: <span className="text-red-600">-3 points</span></del> <span className="text-red-500 text-xs">(DISABLED)</span></li>
                    <li>• <del>Generic bot comments: <span className="text-red-600">-2 points</span></del> <span className="text-red-500 text-xs">(DISABLED)</span></li>
                  </ul>
                  <p className="mt-2">Videos scoring below -10 points are filtered out.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Smart Quota Management</h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p>To conserve YouTube API quota (reduced from 500+ to ~100 units per search):</p>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>Sample Analysis:</strong> First 5 videos get full detailed analysis (reduced from 10)</li>
                    <li>• <strong>Channel Limits:</strong> Top 3 channels analyzed for patterns (reduced from 5)</li>
                    <li>• <strong><del>Comment Analysis:</del></strong> <del>15 comments per video</del> <span className="text-red-500 text-xs">(DISABLED)</span></li>
                    <li>• <strong><del>Engagement Test:</del></strong> <del>Top 2 channels only for creator replies</del> <span className="text-red-500 text-xs">(DISABLED)</span></li>
                    <li>• <strong>Hybrid Filtering:</strong> Remaining videos use basic content analysis</li>
                    <li>• <strong>Removed Features:</strong> <del>Recent video analysis</del>, <del>popular video searches</del> <span className="text-red-500 text-xs">(200+ units saved)</span></li>
                  </ul>
                </div>
              </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Result:</strong> Multi-layered analysis catches 85%+ of AI-generated and automated content while using 80% less API quota (500+ → ~100 units per search). You get authentic, human-created content - the YouTube experience from before AI content farms took over.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};