# IFS Self-Therapy Program

## Overview
This is a React + Vite frontend application for an Internal Family Systems (IFS) self-therapy curriculum. It features PIN-based authentication, personalized curriculum delivery based on child wound assessment results, and comprehensive healing exercises.

## Recent Changes (January 2026)
- Added Profile page with assessment results display and PDF export functionality
- Fixed UUID generation for proper Supabase compatibility
- Added PersonalizationModal with detailed post-quiz personalization display
- Added Perplexity AI integration for enhanced personalization (with local fallback)
- Added SectionedLearningContent for breaking modules into digestible sections
- Added reflection questions between module sections
- Enhanced module question input fields with Supabase storage
- Added Module 5: Advanced Healing Exercises & Daily Practices with 6 new activities
- Created SQL schema for storing module question answers (`module_answers_schema.sql`)
- Added future features roadmap (`FUTURE_FEATURES.md`)

## Tech Stack
- **Frontend**: React 19, Vite 7
- **Styling**: TailwindCSS 3
- **Routing**: React Router DOM 7
- **Backend Service**: Supabase (external)
- **AI Enhancement**: Perplexity API (optional)
- **Icons**: Lucide React

## Project Structure
```
src/
├── App.jsx              # Main application component with routing
├── components/          # Reusable UI components
│   ├── LearningModuleEnhanced.jsx  # Enhanced module viewer with interactive elements
│   ├── LearningModuleRenderer.jsx  # Module content renderer with sectioning support
│   ├── SectionedLearningContent.jsx # Breaks content into readable sections
│   ├── PersonalizationModal.jsx    # Post-quiz personalization display
│   ├── CurriculumSystem.jsx        # Curriculum display and navigation
│   └── ...
├── contexts/            # React context providers
│   └── DataContext.jsx  # Global state and Supabase data management
├── data/
│   ├── curriculumData.js    # Comprehensive IFS curriculum modules (5 modules)
│   └── ifsData.js           # IFS-specific data and definitions
├── lib/
│   ├── supabase.js              # Supabase client and helper functions
│   ├── supabasePersonalization.js   # Assessment and personalization logic
│   ├── aiCurriculumPersonalizer.js  # AI-powered curriculum customization
│   └── perplexityService.js     # Perplexity AI integration for personalization
├── pages/               # Page components
└── utils/               # Utility functions
```

## Curriculum Modules
1. **Module 1**: Foundations of IFS & Your Inner Child
2. **Module 2**: Deep Dive into Inner Child Wounds  
3. **Module 3**: The Protective System (Managers & Firefighters)
4. **Module 4**: Healing Protocols & Integration
5. **Module 5**: Advanced Healing Exercises & Daily Practices

## Key Features
- **Profile Page**: View assessment results with detailed wound scores and PDF export
- **Personalized Curriculum**: Adapts content based on child wound assessment (abandonment, shame, neglect, betrayal)
- **Personalization Modal**: Clear display of what has been personalized after assessment
- **Sectioned Learning**: Modules broken into digestible sections (3 paragraphs each) with reflection questions
- **Interactive Exercises**: Wound selector, belief mapper, body scan, guided meditations
- **Question Input Fields**: Users can input answers which are saved to Supabase
- **Progress Tracking**: Module completion and exercise progress saved to database
- **Offline Support**: LocalStorage fallback when Supabase is unavailable
- **AI Enhancement**: Optional Perplexity AI for richer personalization

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)
- **Lint**: `npm run lint`

## Configuration
- Vite configured to run on `0.0.0.0:5000` with all hosts allowed for Replit compatibility
- Static deployment configured with `dist` as the public directory
- Vercel deployment uses `vite` framework preset

## Environment Variables
- `VITE_PERPLEXITY_API_KEY` - Optional: Enables AI-enhanced personalization

## Database Tables (Supabase)
- `ifs_clients` - User data (expects UUID format for client_id)
- `ifs_assessment_results` - Child wound assessment scores
- `ifs_client_progress` - Module completion progress
- `ifs_module_answers` - Question responses (see `module_answers_schema.sql`)
- `ifs_interactive_data` - Interactive element data
- `ifs_journal_entries` - User journal entries
- `ifs_parts` - Identified internal parts
- `ifs_exercise_progress` - Exercise completion tracking

## Deployment
The app deploys to Vercel as a static site:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Notes
- The app requires Supabase configuration for full functionality
- PIN-based authentication system for secure user access
- Run `module_answers_schema.sql` in Supabase SQL Editor to create the answers table
- Perplexity AI is optional - the app works fully with local personalization fallback
