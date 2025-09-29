# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UmanTube is a React application that provides a YouTube-like interface with content filtering to promote authentic, human-created content over AI-generated material. The app uses the YouTube Data API v3 to search and display videos with advanced filtering mechanisms.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type checking
npm run typecheck

# Preview production build
npm run preview
```

## Architecture

### Core Structure
- **React + TypeScript**: Built with Vite for fast development
- **Tailwind CSS**: For styling with dark/light theme support
- **YouTube Data API v3**: For video data retrieval
- **Content Analysis Engine**: Custom filtering system to identify authentic content

### Key Directories
- `src/components/`: React components (Header, VideoGrid, VideoModal, etc.)
- `src/services/`: API services (YouTube API, content analysis)
- `src/hooks/`: Custom React hooks (useTheme)
- `src/types/`: TypeScript type definitions

### Component Architecture
- `App.tsx`: Main application component managing state and routing
- `VideoGrid.tsx`: Displays video cards in a responsive grid
- `VideoModal.tsx`: Modal for video details and playback
- `FilterPanel.tsx`: Advanced search filters
- `Header.tsx`: Navigation with search and theme toggle

### Services Layer
- `youtube.ts`: YouTube API integration with quota optimization
- `contentAnalysis.ts`: Content scoring and filtering algorithms

### Key Features
1. **Content Filtering**: Multi-layered analysis to filter out AI-generated content
2. **Theme Support**: Dark/light mode with system preference detection
3. **Advanced Search**: Filters by upload date, duration, type, and sorting
4. **Google Analytics**: Event tracking for user interactions
5. **Quota Optimization**: Efficient YouTube API usage to minimize costs

### Environment Variables
- `VITE_YOUTUBE_API_KEY`: YouTube Data API v3 key (required for production)
- `VITE_GA_MEASUREMENT_ID`: Google Analytics measurement ID (optional)

### State Management
- Uses React hooks for local component state
- Global theme state managed via useTheme hook
- Video data and pagination managed in App.tsx

### Content Analysis System
The app includes a sophisticated content analysis engine that:
- Scores videos based on authenticity indicators
- Analyzes channel metadata and engagement patterns
- Filters out likely AI-generated or low-quality content
- Provides fallback behavior when API quota is limited

### Development Notes
- Mock data is provided for development without API keys
- Quota optimization reduces API calls to essential requests only
- Components follow a consistent pattern with proper TypeScript interfaces