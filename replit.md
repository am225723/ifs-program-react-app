# IFS Self-Therapy Program

## Overview
This project is a React + Vite frontend application for an Internal Family Systems (IFS) self-therapy curriculum. It provides personalized healing journeys through PIN-based authentication, curriculum tailored by child wound assessments, and a comprehensive suite of interactive healing exercises. The application aims to empower users in their self-discovery and healing process within the IFS framework, offering tools for introspection, progress tracking, and connection with their inner parts, ultimately fostering self-leadership and emotional well-being.

## User Preferences
I prefer iterative development with clear communication at each major step. Please ask before making significant architectural changes or adding new external dependencies. I value a clean, readable codebase and well-documented functions. Ensure that all UI components are responsive and theme-aware, supporting both light and dark modes. Prioritize user experience with intuitive navigation and clear visual feedback.

## System Architecture
The application is built with React 19 and Vite 7, utilizing TailwindCSS 3 for styling and React Router DOM 7 for navigation. It follows a component-based architecture with reusable UI components and dedicated context providers for global state management.

**Key Architectural Decisions:**
- **PIN-based Authentication**: Secure access via unique 6-digit PINs for client and therapist roles.
- **Personalized Curriculum Delivery**: Content adapts based on "child wound assessment" results (e.g., helplessness, shame), applying personalization at module and activity levels.
- **Interactive Learning Modules**: Curriculum modules feature reflection questions and diverse interactive activity types (e.g., quizzes, guided visualization, parts dialogue).
- **Comprehensive Tracking Systems**: Includes progress tracking for modules, exercises, mood & energy, journal entries, and gamification (XP, levels, badges, streaks).
- **Role-Based Access Control**: Differentiates 'client' and 'therapist' roles, with specific dashboards and features. The UI displays "Advisor" for therapists.
- **UI/UX Design**: Modern, theme-aware design (including dark mode) with amber/emerald/earthy color schemes and a glassmorphism header. Navigation uses a bottom bar for key sections and a top bar for branding/settings.
- **Data Persistence**: All user and application data is stored in Supabase, with a schema covering assessments, personalized content, progress, journal entries, parts mapping, and gamification.
- **PWA Support**: Includes manifest.json and service worker for installable mobile application capabilities.

**Core Features:**
- **Assessment Suite**: IFS Wound, Protective Parts, Self-Energy, and Attachment Style assessments.
- **Parts Visualization Studio**: Drag-and-drop interface for mapping and visualizing internal parts.
- **Unified Advisor Super Dashboard**: Merged admin + therapist dashboard with full client management (create/edit clients, PIN generation/display, status toggle, CSV export), session notes with templates (Initial Intake, Parts Work, Unburdening, Crisis, Check-In), progress tracking, client insights with activity timeline and smart recommendations engine, risk dashboard with intervention alerts, exportable PDF reports, lesson plans (editable, wound-specific), caseload overview cards (secondary wound badges, mood trend dots, module progress). Routes: `/therapist-dashboard` and `/admin` both point to the unified dashboard.
- **Advisor-Client Messaging**: Two-way secure messaging with read receipts and quick message templates.
- **Homework Assignment System**: Advisors assign categorized homework with priorities and due dates; clients complete assignments with reflection notes.
- **Progress Reports**: Comprehensive report generation with assessment scores, module completion, mood/energy trends, and gamification stats.
- **Co-Therapy Session Page**: Facilitates guided therapy activities between therapist and client, with a collapsible Client Parts Map reference panel showing parts grouped by type (Managers/Firefighters/Exiles) with roles, notes, and primary wound context.
- **Gamification Hub**: Integrates XP, levels, badges, and streaks.
- **AI Parts Dialogue**: Perplexity AI-powered conversations with inner parts, including voice mode.
- **Parts Relationship Map**: Interactive SVG graph visualization of connections between inner parts.
- **Unburdening Protocol**: Guided 8-step ceremony for releasing emotional burdens.
- **Assessment Builder**: Therapists can create custom assessments for clients.
- **Journal Voice Dictation**: Continuous speech-to-text for journal entries, with therapist visibility and automatic keyword scanning for concerning content (sending alerts to therapists).
- **Profile Assessment Display**: Shows all assessment results on the user profile.
- **Guided Meditations**: IFS-focused guided meditations (12 total across Foundation, Parts Work, and Grounding categories) with timed guidance, browser text-to-speech voice narration (toggleable, with speed control), and voice reflection recording.
- **Daily Check-In**: Structured 3-step IFS check-in (Self-energy slider, active parts selector, daily intention/reflection) with low-energy alerts to advisors.
- **Mood & Parts Analytics**: SVG-based dashboard with custom charts, heatmaps, and trend analysis for mood and parts, with an advisor insights panel.
- **Micro-Learning & Affirmations**: Short guided exercises and personalized affirmation generation.
- **Progress Milestones & Celebrations**: Visual milestone cards with confetti celebrations for achievements (first module, streaks, assessments, journal entries, etc.). Route: `/milestones`.
- **Parts Journal**: Dedicated journal mode for writing to/from specific inner parts with type-specific prompts, part tagging, and filtering. Integrated into the existing Journal page.
- **Resource Library**: Curated IFS resources (books, articles, exercises, meditations) organized by wound type and healing stage with personalized recommendations. Route: `/resource-library`.
- **Weekly Reflection Summary**: Auto-generated weekly digest with mood trends, parts activity, module progress, and Self-energy metrics with SVG mini charts. Route: `/weekly-reflection`.
- **Inner Child Letter Writing**: Guided letter-writing tool with two modes (to/from inner child), wound-specific prompts, guided structure, favorites, and letter history. Route: `/letters`.
- **Parts Check-In Cards**: Daily card draws featuring parts from the user's map with type-specific reflective prompts and saved reflections. Route: `/parts-cards`.
- **Wound Healing Progress Tracker**: Visual journey map with 6 healing stages, progress markers, module tracking, and before/after assessment comparison. Route: `/healing-tracker`.

**Curriculum Modules (11 total):**
- **Wound-Personalized Modules**: Modules 1-4 (Foundations, Wounds Deep Dive, Protective System, Self Leadership), Module 5 (6 F's Protocol Mastery), Module 6 (Inner Child Unburdening & Integration), Module 5 Bonus (Advanced Healing Exercises), Module 7 (Reparenting Your Inner Child), Module 8 (Somatic Healing & Body Wisdom), Module 9 (Relationships & Attachment Patterns), Module 10 (Transforming the Inner Critic). All these modules are deeply personalized based on the user's identified wound type.

**Wound Personalization Architecture:**
- Modules contain `woundPersonalization` objects with specific content for each wound type (abandonment, shame, neglect, betrayal, helplessness).
- `LearningModuleEnhanced.jsx` dynamically renders personalized content for learning sections, activities, and specific wizards.
- Dynamic content engines (`dynamicLessonContent.js`, `dynamicActivityContent.js`) generate personalized narratives and activity prompts by integrating user assessment data (parts, Self-Energy scores, wound type).
- **Dual-Wound Support**: The system supports addressing both primary and secondary wounds, including dual-wound unburdening steps and curriculum display options.
- **Attachment Style Assessment Integration**: Results from the attachment style assessment feed into relevant curriculum modules.

## External Dependencies
- **Supabase**: Primary backend for database, authentication, and edge functions.
- **Perplexity API**: Used for AI-enhanced personalization and AI Parts Dialogue.
- **Lucide React**: Icon library.