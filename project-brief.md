# Underscore - Project Brief
## Design & User Experience Document

---

## 🎯 Project Overview

**Project Name:** Underscore

**Tagline:** TBD (exploring options like "The soundtrack to your story")

**Concept:** A web application that uses AI to generate personalized cinematic instrumental playlists perfectly matched to the mood, themes, and atmosphere of books users are reading.

**Brand Essence:**
- The name "Underscore" refers to the musical underscore in films - the background music that enhances emotion without overwhelming the story
- This is exactly what Underscore does for reading: provides the perfect musical backdrop that enhances immersion without distraction

---

## 🎨 Design Vision

### Core Brand Attributes
- **Cinematic & Sophisticated**: Premium feel, like a well-scored film
- **Immersive & Atmospheric**: Creates deep reading experiences
- **Intelligent & Intuitive**: AI-powered but human-centered
- **Warm & Inviting**: Cozy reading meets premium sound design

### Visual Direction
- **Color Palette**: 
  - Primary: Deep navy or charcoal (cinematic, sophisticated)
  - Accent: Warm amber/gold (reading light, cinematic warmth)
  - Alternative: Deep purple/plum (creative, premium, Spotify-esque)
  - Neutrals: Warm grays, cream (readability)
  
- **Typography**: 
  - Brand/Headings: Elegant serif (Crimson Text, Playfair Display, Lora)
  - UI/Body: Clean sans-serif (Inter, System fonts for performance)
  - Consider: Mix of cinematic elegance + modern tech clarity
  
- **Imagery**: 
  - High-quality book covers (central to experience)
  - Cinematic photography (moody, atmospheric)
  - Sound wave visualizations (subtle, elegant)
  - Cozy reading environments
  
- **Logo Concept**: 
  - Could incorporate underscore line (_) with sound wave
  - Musical staff line beneath text
  - Minimalist, sophisticated mark

### Mood Board References
- Film score websites (Hans Zimmer, Ludwig Göransson portfolios)
- Premium music apps (Spotify, Apple Music aesthetic)
- Literary sites (Goodreads, literary magazine design)
- Notion's clean UI + Audible's warmth

---

## 👥 Target Users

### Primary Persona: The Immersive Reader
**Demographics:**
- Age: 25-45
- Occupation: Creative professionals, knowledge workers, educators
- Tech-savvy: Comfortable with multiple apps/services

**Behaviors:**
- Reads 20-40 books per year
- Active on Goodreads
- Uses Kindle, Apple Books, or physical books
- Listens to music during various activities
- Values atmosphere and quality experiences
- Seeks ways to enhance daily rituals

**Pain Points:**
- Struggles to find the right music for reading
- Music with lyrics is too distracting
- Generic playlists don't match book mood
- Manually curating playlists takes too much time

**Goals:**
- Create the perfect reading atmosphere
- Discover new instrumental music
- Make reading more immersive
- Track and organize reading life

### Secondary Persona: The Classic Literature Explorer
**Demographics:**
- Age: 22-35
- Students, young professionals
- Medium-high tech comfort

**Behaviors:**
- Wants to read classics but finds them intimidating
- Looks for curated, guided experiences
- Appreciates free, accessible content
- Socially motivated (shares achievements)

**Pain Points:**
- Classic literature feels dry or inaccessible
- Doesn't know where to start
- Needs motivation to finish longer books

**Goals:**
- Make classic reading more engaging
- Build cultural literacy
- Feel accomplished
- Share progress socially

---

## 🎭 Key User Journeys

### Journey 1: First-Time Visitor (Public Domain Discovery)

**Goal:** Hook new users with immediate value, zero friction

**Steps:**

1. **Landing Page** (10 seconds)
   - Hero: "Underscore - The soundtrack to your story"
   - Beautiful cinematic visual
   - CTA: "Explore Free Classics"

2. **Browse Public Domain Library** (30 seconds)
   - Grid of beautiful book covers
   - Filters: Genre, Era, Mood
   - Hover shows mood tags
   - Spot "Pride and Prejudice"

3. **Book Detail** (20 seconds)
   - Large cover, description
   - AI analysis preview: "Witty, romantic, elegant"
   - Mood tags visible
   - CTA: "Generate Playlist"

4. **Generation Experience** (15 seconds)
   - Loading with elegant animation
   - "AI is analyzing themes and composing your score..."
   - Builds anticipation

5. **Playlist Reveal** (1-2 minutes)
   - 15 cinematic instrumental tracks
   - Each track: title, artist, mood tags
   - Preview player (30-second clips)
   - Can preview without signup

6. **Conversion** (Decision point)
   - "Sign up to export to Spotify"
   - "Save this playlist" requires account
   - Social proof
   - OR continue exploring

**Key Design Requirements:**
- Fast, fluid, beautiful experience
- No friction until conversion
- Instant audio gratification
- Build desire to save/export

---

### Journey 2: Connected User (Personal Library)

**Goal:** Core value - playlists for books they're reading

**Steps:**

1. **Sign In** (5 seconds)
   - Simple auth flow
   - Clean form

2. **Dashboard** (First impression)
   - "Your Reading Soundtrack"
   - "Currently Reading" section
   - CTA: "Connect Goodreads" or "Add a Book"

3. **Connect Goodreads** (30-60 seconds)
   - OAuth flow
   - "Importing your books..."
   - Success: "Found 3 books you're currently reading!"

4. **Book Selection** (10 seconds)
   - See imported books with covers
   - Status badges
   - Click "The Midnight Library"

5. **Book Detail** (30 seconds)
   - Cover, reading status, progress
   - CTA: "Generate Playlist"

6. **AI Analysis** (20 seconds)
   - "Analyzing book metadata, reviews, and themes..."
   - Results appear:
     - Mood: Hopeful (70%), Melancholic (50%)
     - Themes: Choice, regret, possibility
     - Vibe: "Philosophical and emotionally resonant"
   - Visual mood representation
   - "Continue to Playlist"

7. **Playlist Generation** (15 seconds)
   - "Composing your soundtrack..."
   - Progress indicator

8. **Playlist Review** (1-3 minutes)
   - 15 instrumental tracks
   - Track details: title, artist, duration, mood
   - "Why this track" on hover/expand
   - Embedded player

9. **Export** (30 seconds)
   - "Export to Spotify"
   - OAuth if needed
   - "Creating playlist..."
   - Success: "Open in Spotify"

10. **Reading Session**
    - Return to dashboard
    - Quick access: "Play Playlist"
    - Perfect soundtrack for reading

---

### Journey 3: Advanced User (File Upload)

**Goal:** Deep analysis for personal files

**Steps:**

1. **Add Book** → "Upload file"
2. **File Upload** - Drag-and-drop ePub/PDF
3. **Processing** - Extract text, analyze content
4. **Deep Analysis** - Chapter-level breakdown
5. **Enhanced Results** - More detailed than metadata-only
6. **Playlist Selection** - Choose from options
7. **Export** - Save to music service

---

## 📱 Key Screens & Features

### 1. Landing Page

**Purpose:** Convert visitors, explain value

**Sections:**

**Hero:**
- Headline: "Underscore"
- Subhead: "The soundtrack to your story" (or chosen tagline)
- Description: "AI-generated cinematic playlists for every book you read"
- CTA Primary: "Explore Free Classics"
- CTA Secondary: "Connect Your Library"
- Hero visual: Cinematic image, book + sound wave

**How It Works:**
- 3 simple steps with icons
- 1. Choose your book
- 2. AI analyzes mood and themes
- 3. Get your cinematic playlist

**Featured Classics:**
- Carousel of 6-12 curated books
- Beautiful covers
- Hover shows mood tags
- Click → Book detail

**Sample Playlist:**
- Embedded player
- "Listen: Playlist for '1984'"
- 3-5 tracks visible
- Demonstrates value

**Social Proof:**
- Testimonials (future)
- Service logos: Goodreads, Spotify, Apple Music

**Footer:**
- Links, social, newsletter

---

### 2. Public Domain Library

**Purpose:** Browse and discover classics

**Layout:**

**Header/Filters:**
- Search bar
- Filter chips: Genre, Era, Mood, Length
- Results count

**Book Grid:**
- 4-5 columns desktop, responsive
- Each card:
  - Cover image
  - Title, author, year
  - Mood tags (2-3)
  - Hover: "Generate Playlist" button

**Featured Collections:**
- "Cozy Autumn Reads"
- "Epic Adventures"
- "Gothic & Mysterious"
- Horizontal scrolling

---

### 3. Book Detail Page

**Layout:** Two-column (desktop) / stacked (mobile)

**Left/Top:**
- Book cover (large)
- Title, author
- Metadata: year, pages, genre tags
- Status (if user's book)
- Actions: "Generate Playlist", "Start Reading", "Add to Library"

**Right/Bottom:**

**Description:**
- Full synopsis
- Expandable if long

**AI Analysis Panel:**
- Mood breakdown (visual)
- Themes (tags)
- Vibe description
- Setting details
- Pace & intensity

**Playlist Panel:**
- Playlist name, duration, track count
- Track list with details
- Embedded player
- Actions: "Export to Spotify", "Regenerate"

---

### 4. Dashboard (User Home)

**Purpose:** Central hub for reading life

**Sections:**

**Header:**
- "Welcome back, [Name]"
- Quick stats (optional)

**Connected Services:**
- Status cards for Goodreads, Spotify, etc.
- Click to connect/manage

**Currently Reading:**
- Horizontal scroll of books
- Progress bars
- "Continue Reading" / "Play Playlist" CTAs

**Want to Read:**
- From Goodreads
- Quick "Generate playlist" action

**Recent Playlists:**
- Recently generated
- Quick play button

**Discover:**
- "Explore Classics"
- Featured collections

---

### 5. Settings/Profile

**Sections:**

**Profile:**
- Display name, email, avatar
- Password change

**Connected Services:**
- List all integrations
- Connect/disconnect buttons
- Last synced timestamps

**Preferences:**
- Default music service
- Auto-generate playlists
- Instrumental only
- Playlist length (short/medium/long)
- Notifications

**Data & Privacy:**
- Download data
- Delete account
- Policy links

---

## 🎨 Component Library

### Key Components:

**Book Card**
- Grid view, list view, featured variants
- States: default, hover, loading, selected
- Contents: cover, title, author, metadata, CTAs

**Playlist Component**
- Full view, compact view
- Track list, player controls
- Export CTA, mood visualization

**Mood Visualization**
- Options: mood wheel, bars, tag cloud, gradient
- Interactive hover/click

**Analysis Card**
- Visual summary
- Text descriptions
- Metadata (confidence, timestamp)
- States: loading, success, error

**Service Connection Card**
- Service logo, status
- CTA (connect/disconnect)
- Last synced info

---

## ✨ Interaction Patterns

### Loading States
- Skeleton screens
- Elegant spinners
- Progress bars for uploads/analysis
- Informative messages

### Empty States
- Friendly, encouraging copy
- Clear next action
- Visual illustration
- Examples: "No books yet. Connect Goodreads!"

### Error States
- Clear, friendly language
- Explain what happened
- Offer solutions
- Retry option
- Never dead ends

### Success States
- Positive feedback
- Visual confirmation
- Clear next action
- Celebrate achievements

### Micro-interactions
- Button hovers
- Card animations
- Loading spinners
- Success checkmarks
- Smooth transitions

---

## 🎯 Design Principles

1. **Cinematic First** - Every interaction should feel like a premium experience
2. **Content is King** - Books and music are the stars, UI enhances
3. **Progressive Disclosure** - Show what's needed when it's needed
4. **Accessible by Default** - WCAG 2.1 Level AA compliance
5. **Fast & Responsive** - Performance is a feature
6. **Clear & Honest** - Transparent about AI, loading, errors
7. **Smart Defaults** - Good choices, allow customization
8. **Consistent Patterns** - Learn once, apply everywhere

---

## 📐 Responsive Design

### Breakpoints:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Large: 1440px+

### Mobile Considerations:
- Touch targets: 44x44px minimum
- Bottom navigation for key actions
- Swipe gestures for cards/playlists
- Full-screen modals for complex flows
- Optimize for slower connections

---

## ♿ Accessibility Requirements

- **WCAG 2.1 Level AA compliance**
- Keyboard navigation for all interactive elements
- Visible focus indicators
- Semantic HTML
- ARIA labels where needed
- Alt text for all images
- 4.5:1 contrast ratio for text
- Don't rely on color alone
- Respect prefers-reduced-motion
- Screen reader friendly

---

## 🎬 Animation Guidelines

### Principles:
- **Purposeful** - Guide attention, provide feedback
- **Subtle** - Don't distract
- **Fast** - 150-300ms typically
- **Natural** - Organic easing

### Where to Use:
- Page transitions
- Modal open/close
- Button interactions
- Loading states
- Success feedback
- Hover effects
- Progress indicators

### Where NOT to Use:
- Long-form reading content
- Critical information
- Repetitive actions
- When user prefers reduced motion

---

## 🔮 Future Features

**Phase 2:**
- Multiple playlists per book
- Manual playlist editing
- Community features (share playlists)
- Social reading
- Reading challenges

**Phase 3:**
- Built-in e-reader
- Chapter-synced playlists
- Automatic transitions
- Reading statistics

**Phase 4:**
- AI learns preferences
- Personalized recommendations
- Mood-based discovery
- "Because you liked X..."

---

## 📊 Success Metrics

### User Engagement:
- Time to first playlist generation
- Playlist completion rate
- Export rate
- Return visit rate
- Session duration

### Conversion:
- Signup rate
- Goodreads connection rate
- Music service connection rate
- Free → premium (future)

### Satisfaction:
- User feedback/ratings
- Feature usage
- Error rates
- Support tickets

---

## 🎨 Design Deliverables

### Discovery:
- [ ] Competitive analysis
- [ ] User personas (detailed)
- [ ] User journey maps
- [ ] Feature prioritization

### Design System:
- [ ] Color palette
- [ ] Typography scale
- [ ] Spacing system
- [ ] Component library
- [ ] Icon set
- [ ] Illustration style

### Wireframes:
- [ ] Landing page
- [ ] Public domain library
- [ ] Book detail page
- [ ] Dashboard
- [ ] Settings
- [ ] Mobile views

### High-Fidelity:
- [ ] All pages in final design
- [ ] Multiple states
- [ ] Responsive versions
- [ ] Dark mode (optional)

### Prototypes:
- [ ] Clickable prototype
- [ ] Key flows interactive
- [ ] Animations demonstrated

---

## 📞 Collaboration

### Design Review Checkpoints:
1. Wireframes - structure/layout
2. Visual design - look and feel
3. Prototype - interactions
4. Handoff - implementation specs
5. QA - design implementation

---

## 🚀 Timeline Estimate

**Week 1-2: Discovery**
- Competitive analysis
- User research
- Feature prioritization

**Week 3-4: Wireframes**
- Information architecture
- Low-fidelity wireframes
- User flows

**Week 5-6: Visual Design**
- Design system
- High-fidelity mockups
- Component library
- Branding

**Week 7-8: Responsive & Polish**
- Mobile/tablet designs
- Interactions
- Accessibility
- Animations

**Week 9: Prototyping**
- Interactive prototype
- User testing
- Refinements

**Week 10: Handoff**
- Documentation
- Asset preparation
- Developer handoff

---

## 💡 Brand Voice & Tone

### Voice Attributes:
- **Knowledgeable but not pretentious**
- **Warm and inviting**
- **Intelligent and thoughtful**
- **Enthusiastic but calm**
- **Cinematic and sophisticated**

### Tone by Context:

**Marketing:** Inspiring, aspirational, confident
**Onboarding:** Helpful, patient, encouraging
**App:** Conversational, personal, efficient
**Errors:** Honest, apologetic, solution-focused
**Success:** Celebratory, encouraging

### Example Copy:

**Good:**
- "Composing your cinematic score..."
- "Your playlist is ready. 15 tracks perfectly matched to the story."
- "Something went wrong. Let's try that again."

**Bad:**
- "Please wait while our AI processes..."
- "SUCCESS!!! PLAYLIST CREATED!!! 🎉🎉🎉"
- "Error 500: Internal server error"

---

## 🎬 Conclusion

Underscore is about creating magical moments where books and music come together to create immersive experiences. Every design decision should serve this goal - enhancing the reading experience through carefully crafted musical accompaniment.

The design should feel cinematic, sophisticated, and effortless. Like a great film score, Underscore's design should enhance without overwhelming, guide without directing, and create atmosphere that makes every story more memorable.

---

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Project Status:** Ready for Design Phase

---

**Ready to score every story.** 🎵📚