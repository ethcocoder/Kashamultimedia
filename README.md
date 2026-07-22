# Kasha Multimedia CMS Portfolio

A comprehensive digital portfolio for the **Kasha Multimedia Content Management System** — a platform designed to preserve and share Ethiopia's cultural heritage through digital broadcasting.

## Overview

This portfolio website showcases the Kasha CMS system, which manages the production, archival, and distribution of research-backed content celebrating Ethiopian cultural diversity across multiple platforms including radio, YouTube, and Telegram.

## Features

### Core Capabilities
- **Episode Management**: Structured around the Kasha segment taxonomy
- **Media Library**: Audio, video, images, and research documents
- **Editorial Workflow**: Five-stage approval pipeline for quality assurance
- **Multi-Channel Publishing**: Radio, YouTube, and Telegram distribution
- **Analytics**: Cross-platform performance metrics
- **Multi-Language Support**: Amharic, Ethiopian languages, and Swahili

### Content Pillars (Knowledge Domains)
1. **Nature Conservation** - Indigenous environmental and climate-stewardship knowledge
2. **Traditional Medicine** - Physical, psychological, and spiritual healing systems
3. **Indigenous Agriculture** - Farming and pastoral knowledge adapted to local climate
4. **Traditional Craftsmanship** - Metalwork, pottery, leatherwork, basketry, carpentry, architecture, cuisine, and dress
5. **Intangible Cultural Knowledge** - Rituals, belief systems, rites of passage, festivals, and customary law
6. **Worldview & Cosmology** - Belief systems that frame relationships between people, nature, and the divine

### Recurring Segments
The CMS supports ten recurring content formats:
1. Yisatefu - Get Involved
2. Zikre Bahil - Cultural Commemoration
3. Enchewawet - Let's Chat
4. Ke Timhirt Alem - From the World of Learning
5. Ye Minab Guzo - Imaginary Journey
6. Beweef Berer Yet Enhied - Bird's-Eye
7. Mekwadesha - Shared Table
8. Ye Tiwlid Melk - Face of Generations
9. Enawra Kalachuma - Let's Talk
10. Aytefef - No One Left Out

## Platform Integrations

### YouTube Integration
- OAuth 2.0 authentication
- Automated video uploads with metadata mapping
- Scheduled publishing and privacy control
- Playlist management
- Analytics sync-back

### Telegram Integration
- Bot API integration for text and media posts
- Scheduled sends aligned to publishing schedule
- Channel pinning for featured episodes
- Inline buttons linking to YouTube and organization properties
- Delivery confirmation

### Radio Broadcasting
- Live weekly broadcasts on Sundays
- Full episode management and archival
- Multi-language metadata support
- Guest and contributor management

## Publishing Workflow

The system follows a five-stage editorial approval pipeline:

1. **Draft** - Segment, categories, and synopsis defined
2. **Research & Fact-check** - Sources attached and verified
3. **Media Ingest** - All audio/video/image assets uploaded and tagged
4. **Review** - Editorial quality and policy compliance confirmed
5. **Approved & Scheduled** - Publish Jobs created for each target channel

## User Roles

- **Administrator** - System configuration and integration management
- **Multimedia Manager** - Editorial and production sign-off
- **Program Manager** - Episode planning and segment assignment
- **Researcher** - Sourcing and fact-checking
- **Editor** - Media ingestion and metadata entry
- **Distribution Manager** - Cross-channel publishing and analytics
- **Viewer** - Read-only access to content and analytics

## Technical Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Express.js
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage & Local (public/upload/images)
- **Deployment**: Docker + Nginx

## Getting Started

### Prerequisites
- Node.js 22+
- npm or pnpm
- Firebase Service Account (for admin setup)

### Installation

```bash
# Clone the repository
git clone https://github.com/ethcocoder/Kashamultimedia.git
cd Kashamultimedia

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Admin Setup

To set up the initial admin account:
1. Download your Firebase Service Account JSON from Firebase Console > Project Settings > Service Accounts.
2. Save the file as `service-account.json` in the project root directory.
3. Run the setup script:

```bash
npm run setup-admin [email] [password]
# Default email: admin@kashamultimedia.com
# Default password: KashaCMS2026!
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Project Structure

```
src/
├── components/
│   ├── home/          # Homepage components
│   ├── layout/        # Navigation and footer
│   ├── admin/         # Admin panel components
│   └── ui/            # Reusable UI components
├── pages/
│   ├── Home.jsx       # Homepage
│   ├── About.jsx      # About Kasha
│   ├── System.jsx     # System overview
│   ├── Integrations.jsx # Platform integrations
│   ├── Contact.jsx    # Contact page
│   └── admin/         # Admin pages
├── contexts/          # React contexts
├── services/          # Firebase and API services
├── styles/            # Global styles
└── App.jsx            # Main app component
```

## Pages

- **Home** - Hero section with core capabilities overview
- **About** - Kasha program mission and knowledge domains
- **System** - System overview, segments, roles, and workflow
- **Integrations** - YouTube, Telegram, and radio integration details
- **Contact** - Contact form and information

## Multi-Language Support

The portfolio supports:
- **English** (en)
- **Amharic** (am)

Language preference is stored in localStorage and persists across sessions.

## Styling & Design

The portfolio uses a sophisticated dark theme with:
- **Primary Color**: Gold (#C9A96E)
- **Background**: Deep black (#090909)
- **Accent**: Subtle whites and grays
- **Typography**: Display font for headings, sans-serif for body

### Design Elements
- Gradient text effects
- Smooth animations and transitions
- Glass-morphism effects
- Responsive grid layouts
- Custom color variables

## Non-Functional Requirements

### Security
- Encrypted storage of YouTube and Telegram credentials
- Role-based access control
- Audit logging for all publish and edit actions

### Scalability
- Media storage sized for growing archives
- Queue-based dispatch for concurrent publishes

### Reliability
- Automatic retry with backoff for failed publishes
- Manual retry interface for failed jobs

### Compliance
- Editorial workflow enforces Ethiopian Broadcasting Authority policies
- Research-backed content requirements

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and maintained by Yosefe Bekele Multimedia and Event Promotion.

## Contact

For inquiries about the Kasha Multimedia CMS, please contact:
- **Organization**: Yosefe Bekele Multimedia and Event Promotion
- **Location**: Addis Ababa, Ethiopia

## Acknowledgments

- Inspired by Ethiopia's rich cultural heritage
- Built with React, Vite, and modern web technologies
- Designed for content creators and cultural preservation

---

**Version**: 2.0.0  
**Last Updated**: July 2026  
**Status**: Production Ready
