import React from 'react';
import { Shield, AlertTriangle, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Content Filtering</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We use advanced algorithms to filter out AI-generated and synthetic content, 
              promoting authentic human-created videos.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Disclaimer</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This website is not affiliated with, endorsed by, or connected to YouTube, Google, 
              or Alphabet Inc. in any way. All video content is sourced from YouTube's public API.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Fair Use</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This service operates under fair use principles for educational and informational 
              purposes. All content rights belong to their respective creators and YouTube.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <div className="text-center space-y-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <strong>Legal Notice:</strong> This is an independent project that uses YouTube's public API 
              to display video content. We do not host, store, or own any video content. All videos, 
              thumbnails, titles, and descriptions are the property of their respective creators and YouTube. 
              This service is provided for educational and research purposes only.
            </p>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              YouTube is a trademark of Google LLC. This website is not endorsed by or affiliated 
              with Google LLC or YouTube in any way.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>© 2024 YouTube minus AI Slop</span>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};