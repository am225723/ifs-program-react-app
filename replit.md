# IFS Self-Therapy Program

## Overview
This project is a React + Vite frontend application designed for an Internal Family Systems (IFS) self-therapy curriculum. Its primary purpose is to provide personalized healing journeys through PIN-based authentication, curriculum tailored by child wound assessments, and a comprehensive suite of interactive healing exercises. The application aims to empower users in their self-discovery and healing process within the IFS framework, offering tools for introspection, progress tracking, and connection with their inner parts.

## User Preferences
I prefer iterative development with clear communication at each major step. Please ask before making significant architectural changes or adding new external dependencies. I value a clean, readable codebase and well-documented functions. Ensure that all UI components are responsive and theme-aware, supporting both light and dark modes. Prioritize user experience with intuitive navigation and clear visual feedback.

## System Architecture
The application is built with React 19 and Vite 7, utilizing TailwindCSS 3 for styling and React Router DOM 7 for navigation. It follows a component-based architecture, with reusable UI components, dedicated context providers for global state management (e.g., `DataContext` for Supabase interactions), and separate pages for different functionalities.

**Key Architectural Decisions:**
- **PIN-based Authentication**: Secure access is managed via unique 6-digit PINs, primarily for client and therapist roles.
- **Personalized Curriculum Delivery**: The core of the system involves a sophisticated personalization engine that adapts curriculum content based on a user's "child wound assessment" results (e.g., helplessness, shame, neglect, betrayal). This personalization is applied at a module and activity level.
- **Interactive Learning Modules**: Curriculum modules are broken into digestible sections with reflection questions and incorporate a wide array of interactive activity types (e.g., true-false quiz, drag-to-rank, guided visualization, parts dialogue).
- **Comprehensive Tracking Systems**: Includes progress tracking for module completion, exercise progress, mood & energy, journal entries, and gamification elements (XP, levels, badges, streaks).
- **Role-Based Access Control**: Differentiates between 'client' and 'therapist' roles (stored value), with specific dashboards and features accessible based on user role. The UI displays "Advisor" instead of "Therapist" throughout the interface, while internal role values and DB column names remain as `therapist` for data compatibility.
- **UI/UX Design**: Employs a modern design language with theme-awareness (including dark mode), amber/emerald/earthy color schemes, and a glassmorphism header. Navigation is primarily through a bottom navigation bar for key sections and a top bar for branding and settings.
- **Data Persistence**: All user and application data is persistently stored in Supabase, with robust schema design covering assessments, personalized content, progress, journal entries, parts mapping, and gamification.
- **Offline Support**: While primary data storage is Supabase, some session authentication details use localStorage for login persistence.
- **PWA Support**: Includes manifest.json and service worker for installable mobile application capabilities.

**Core Features:**
- **Assessment Suite**: IFS Wound, Protective Parts, and Self-Energy assessments.
- **Parts Visualization Studio**: Drag-and-drop interface for mapping and visualizing internal parts.
- **Advisor Dashboard**: Client management, session notes, progress tracking, client insights (wound assessment, protective parts, self-energy, journal entries, module progress, gamification, session prep), quick actions (create PIN, send reminders, export reports, messaging, homework, reports). Alerts have functional "View" buttons that navigate to the relevant client's Insights tab. Lesson Plans tab includes client selector for viewing personalized curriculum vs standard, with inline module editing (title, description, estimated minutes). Route: `/therapist-dashboard`.
- **Advisor-Client Messaging**: Two-way secure messaging between advisors and clients via `TherapistMessages.jsx` and `ClientInbox.jsx`. Uses `ifs_messages` table with sender_role (`'therapist'` stored value), read receipts, and quick message templates. Route: `/advisor-messages`.
- **Homework Assignment System**: Advisors assign categorized homework (journaling, parts-work, meditation, etc.) with priorities and due dates via `TherapistHomework.jsx`. Clients view/complete assignments with reflection notes via `ClientHomework.jsx`. Uses extended `ifs_therapy_homework` table. Route: `/advisor-homework`.
- **Progress Reports**: Comprehensive report generation with assessment scores, module completion, mood/energy trends, homework rates, gamification stats, and text export via `TherapistReports.jsx`. Route: `/advisor-reports`.
- **Co-Therapy Session Page**: Facilitates guided therapy activities between therapist and client with step-by-step instructions and progress saving.
- **Gamification Hub**: Integrates XP, levels, badges, and streaks to encourage engagement.
- **AI Parts Dialogue**: Perplexity AI-powered conversations with inner parts, with voice mode (speech-to-text input and text-to-speech responses using Web Speech API).
- **Parts Relationship Map**: Interactive SVG graph visualization showing connections between inner parts with relationship types (protects, triggers, comforts, conflicts, allies).
- **Unburdening Protocol**: Guided 8-step ceremony for releasing emotional burdens, with Supabase persistence and progress tracking.
- **Assessment Builder**: Therapists can create custom assessments with multiple question types; clients take them via `/custom-assessment/:id`.
- **Journal Voice Dictation**: Continuous speech-to-text dictation for journal entries using Web Speech API. Journal includes therapist visibility notice and automatic keyword scanning for concerning content (self-harm, crisis language, etc.) that sends alerts to therapists via messaging system.
- **Journal Safety Alerts**: When a journal entry contains concerning keywords (suicide, self-harm, abuse, relapse, etc.), the system automatically sends an alert message to all active therapists. The Therapist Dashboard also scans recent journal entries and displays `danger`-level alerts with pulsing indicators for entries with concerning language.
- **Profile Assessment Display**: Profile page shows all assessment results: Wound Assessment (with fallback from interactive data), Protective Parts Assessment (with identified parts listed by type — managers, firefighters, exiles — showing name, description, role, and intensity), Self-Energy Assessment, and Custom Assessment results.
- **Guided Meditations**: 6 IFS-focused guided meditations (Self Energy, Parts Check-In, Inner Safe Place, Protector Appreciation, IFS Body Scan, Compassion Breathing) with step-by-step timed guidance, silent meditation timer, and voice reflection recording via MediaRecorder API.
- **Micro-Learning & Affirmations**: Short guided exercises and personalized affirmation generator.
- **Theme & Animation Customization**: User preferences for visual and motion accessibility.

## External Dependencies
- **Supabase**: Primary backend service for database, authentication, and edge functions.
- **Perplexity API**: Used for AI-enhanced personalization and AI Parts Dialogue (optional).
- **Lucide React**: Icon library for UI elements.