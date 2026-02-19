# IFS Self-Therapy Program

## Overview
This is a React + Vite frontend application for an Internal Family Systems (IFS) self-therapy curriculum. It features PIN-based authentication, personalized curriculum delivery based on child wound assessment results, and comprehensive healing exercises.

## Recent Changes (February 2026)
- Complete UI rebrand: All purple/pink colors replaced with warm amber/emerald/earthy tones across 35+ files
- App name: "Internal Family Systems" with phoenix logo displayed in full (not cropped)
- Progress saving fix: DataContext now polls for auth changes and initializes userId immediately from localStorage, ensuring save functions work after login
- Gamification system wired up: awardXP() in DataContext triggers from module completion (100 XP), journal entries (25 XP), assessment completion (50 XP), exercise completion (30 XP), and parts mapping (20 XP). Badges auto-initialize and progress correctly.
- Assessment consolidation: Single wound assessment on /assessments page; Home page "Take Assessment" buttons now navigate to /assessments instead of inline duplicate
- Therapist Dashboard Quick Actions fully functional: Create New Client PIN (generates unique 6-digit PIN, saves to Supabase), Send Reminder (compose with templates, copy to clipboard, save log), Export All Reports (CSV download with all client data), View Group Analytics (wound distribution, engagement status, progress stats)
- Client Personalization Panel in Therapist Dashboard: Client Insights tab now shows full wound assessment scores, primary/secondary wounds, and per-module personalization details (wound focus, healing goals, tailored activities)
- Co-Therapy Session page (/co-therapy): Therapist selects a client and guides 9 IFS therapy activities together with step-by-step instructions, therapist clinical guidance, observation checklists, per-step notes, client reflections, timer, and progress saving to client's Supabase record with coTherapy flag
- LearningModuleRenderer refactored to delegate rendering to LearningModuleEnhanced, enabling all 12 interactive activity types in curriculum modules
- Fixed SSO callback routing: Replit proxy URL-encodes query params into pathname (`/sso/callback%3Fsso_token=X`), so App.jsx now checks `location.pathname.startsWith('/sso/callback')` before Routes to bypass React Router matching; SSOCallback uses `extractSSOToken()` to parse token from encoded paths
- tokenAuth.js `cleanTokenFromURL` uses `startsWith` instead of strict equality for SSO path check
- Fixed dark mode text visibility: Home page cards (Recommendations, Assessments, Healing Tools, IFS Principles) now use dark backgrounds in dark mode instead of invisible light text on light bg
- Journal entries now save to Supabase (ifs_journal_entries table) with localStorage fallback
- Journal streak calculation is real (counts consecutive days with entries from today backward)
- Journal average mood is real (calculates from all entry moods)
- Journal page fully theme-aware with dark mode support
- Protective Parts assessment: "Add All to Map" button added, parts auto-save to Supabase via PartsContext
- Protective Parts assessment links to Parts Studio for visualization after adding parts
- PWA support: manifest.json, service worker, iOS meta tags for installable mobile app
- Admin role system: user_role column (client vs therapist), role-based route protection
- Enhanced Admin Dashboard wired to real Supabase data (replaces mock data)
- Admin PIN: therapists with user_role='therapist' see admin icon in header, clients cannot access /admin
- Dark mode text visibility fix: Home page text colors are now theme-aware
- ThemeContext: added `tc()` helper and `darkTextMap` for dark-mode-safe text colors
- Supabase migrations organized into supabase/migrations/ (001-016) with CREATE IF NOT EXISTS
- Supabase edge function: supabase/functions/create-client/ for generating new clients with unique PINs
- Added 7 MORE interactive activity types: true-false-quiz, drag-to-rank, letter-to-parts, scenario-cards, emotion-wheel, fill-in-blank, parts-dialogue
- Full meditation scripts: Cultivating Self Energy (18 steps), Safe Place Visualization (18 steps), Body-Based Connection (17 steps) with breathing cues, pause indicators, rich sensory detail
- Enhanced Therapist Dashboard: Lesson Plans tab with detailed session guides for all 5 modules, Client Insights tab with answer review, flagged responses, session prep, therapist feedback
- Step progression blocking: clients must answer all reflection questions before advancing to next step, with visual warning and locked button
- Integrated new activity types across all 5 curriculum modules for varied engagement
- Consolidated assessment naming: Removed "Burdens of the Exile" naming, unified as "IFS Wound Assessment"
- Added answer textareas to reflection questions in learning modules (both LearningModule and LearningModuleEnhanced)
- Added 5 new interactive activity types: guided-visualization, matching-exercise, safety-checklist, mindfulness-timer, scale-rating
- Created Therapist Dashboard (/therapist-dashboard) with client overview, session notes, progress tracking, alerts
- Created Progress Timeline (/progress-timeline) with visual milestone tracking and journey stats
- Created Mood & Energy Tracker (/mood-tracker) with daily check-ins, trend visualization, parts connection
- Created Gamification Hub (/gamification) with badges, streaks, XP/level system, weekly challenges
- Created AI Parts Dialogue (/parts-dialogue) with Perplexity AI-powered conversations with inner parts
- Enhanced Progress Reports: comprehensive downloadable report including assessment, mood, streaks, achievements
- Added links to all new features from Home page Interactive Healing Tools section
- Switched to bottom navigation bar (Home, Curriculum, Assessments, Journal, Integration) with top bar showing only IFS Healing name + Settings/Avatar/Logout
- Theme system overhaul: App wrapper now uses ThemeContext for global background, all pages inherit themed background
- Bottom nav and header are theme-aware including dark mode support
- Login page redesigned with muted soft colors (slate/purple pastels)
- Profile page made responsive for mobile (stacking buttons, adaptive padding)
- Fixed "Take Assessment" button to link to /assessments
- Enhanced Protective Parts assessment results with identified parts listing, descriptions, roles, strategies, and "Add to Map" buttons for direct Parts Mapping integration
- Added 7 new therapist-client activities
- Added Assessments page with 3 structured self-assessments (IFS Wound, Protective Parts, Self-Energy)
- Added PartsContext for bidirectional sync between Parts Mapping and Parts Visualization Studio
- Added assessment insights cards to Home dashboard with quick-access links

## Previous Changes (January 2026)
- Added Parts Visualization Studio with drag-and-drop parts mapping and visual customization
- Added Micro-Learning page with 6 guided 2-minute healing exercises
- Added Custom Affirmations generator personalized to wound profile with favorites
- Enhanced Therapy Integration page with 8 guided therapist-client activities, tabbed navigation, progress tracking
- Completed Module 6 (Integration) with 5 new interactive activities for deeper IFS work
- Added Theme Customization Settings page with 5 color themes (Calm Waters, Nurturing Garden, Inner Warmth, Safe Sanctuary, Peaceful Night dark mode)
- Added animation controls (enable/disable, speed options) for accessibility
- Modernized UI with glassmorphism header and improved navigation
- Added personalized dashboard for returning users showing wound profile and recommendations
- Added wound-specific exercise recommendations and daily affirmations
- Added Profile page with assessment results display and PDF export functionality
- Fixed UUID generation for proper Supabase compatibility
- Added PersonalizationModal with detailed post-quiz personalization display
- Added Perplexity AI integration for enhanced personalization (with local fallback)
- Added SectionedLearningContent for breaking modules into digestible sections
- Added reflection questions between module sections
- Enhanced module question input fields with Supabase storage
- Added Module 5: Advanced Healing Exercises & Daily Practices with 6 new activities
- Created SQL schema for storing module question answers (see `supabase/migrations/012_create_ifs_module_answers.sql`)
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
- Supabase URL and anon key are hardcoded in `src/lib/supabase.js`

## Data Storage
- ALL data saves to Supabase (zero localStorage for data)
- Only session auth (client_id, pin, name, role) uses localStorage for login persistence
- Complete SQL schema: `supabase/complete_schema.sql` (run in Supabase SQL Editor)

## Database Tables (Supabase) - 20 tables total
Complete schema in `supabase/complete_schema.sql`:
- `ifs_clients` - User data and PIN authentication
- `ifs_assessment_results` - Child wound assessment scores
- `ifs_personalized_curriculum` - Customized module content per client
- `ifs_client_progress` - Module completion progress
- `ifs_module_answers` - Question responses
- `ifs_journal_entries` - User journal entries
- `ifs_parts` - Identified internal parts (with x, y, size for visual mapping)
- `ifs_interactive_data` - Generic key-value data for modules
- `ifs_exercise_progress` - Exercise completion tracking
- `ifs_therapist_notes` - Therapist session notes
- `ifs_milestones` - Client achievement milestones
- `ifs_content_library` - Shared content resources
- `ifs_mood_entries` - Mood & energy tracking entries
- `ifs_therapy_sessions` - Client-recorded therapy sessions
- `ifs_therapy_homework` - Therapy homework assignments
- `ifs_parts_dialogue` - AI parts dialogue conversation history
- `ifs_gamification` - XP, levels, badges, streaks, challenges
- `ifs_client_preferences` - Theme, animation, favorite affirmations
- `ifs_therapist_feedback` - Therapist feedback on client answers
- `ifs_therapy_activity_progress` - Therapy activity completion

## Supabase Edge Functions
- `supabase/functions/create-client/` - Creates new clients with auto-generated unique 6-digit PIN

## Deployment
The app deploys as a static site:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Notes
- The app requires Supabase for full functionality (no localStorage fallbacks)
- PIN-based authentication system for secure user access
- Run `supabase/complete_schema.sql` in Supabase SQL Editor to set up ALL 20 tables
- Perplexity AI is optional - the app works fully with local personalization fallback
