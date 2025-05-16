# DiaryVio 🎤📖

__Tagline: _"Your voice, your story, your AI companion."___

## 🌟 Vision

DiaryVio is a voice-powered digital diary platform that combines traditional journaling with advanced AI companionship. It allows users to document their daily lives through voice-to-text, search their memories with natural language, and interact with a personalized AI companion who knows them deeply and provides emotional support like a best friend would.

## 💡 Core Philosophy

DiaryVio is built on three core principles:

1. **"Your voice is your journal"** - Speaking is more natural than typing, allowing for more authentic expression
2. **"Your memories should be searchable"** - Past experiences should be easily accessible through natural language
3. **"Your AI companion knows and supports you"** - A personalized AI friend who adapts to your personality and needs

## 🚀 Key Features

### Free Features
- **Voice-to-Text**: Speak naturally and watch your thoughts transform into beautifully formatted entries.
- **Text Journaling**: Write your thoughts directly with our beautiful editor. Perfect for detailed reflections.
- **Smart Search**: Find any memory instantly with AI-powered search that understands context.
- **AI Companion**: Get insights and reflections from an AI that truly understands your journey.

### Premium Features
- **Photo Memories**: Upload and organize your photos with AI-powered captions and tags.
- **Video Journals**: Record video entries and store them securely with automatic transcription.

## ✨ Feature Roadmap

### 🔸 Core Features (MVP)

| Feature | Description |
|---------|-------------|
| 🗣️ **Voice-to-Text Diary** | Record your daily thoughts and experiences using your voice, with advanced transcription |
| 🔎 **Memory Search** | Find specific memories with natural language queries (e.g., "When did I first meet Sara?") |
| 🧑‍🤝 **AI Best Friend** | Personalized AI companion that learns about you and provides emotional support |
| 😊 **Mood-Adaptive Responses** | AI adapts its tone and support based on your emotional state |
| 📖 **Markdown Journal Support** | Write traditional text entries with markdown formatting when preferred |
| 🕒 **Daily Journaling Reminders** | Gentle nudges to maintain your journaling habit |
| 📆 **Timeline View** | Chronological view of all your entries with mood indicators |
| 📱 **Mobile-First Experience** | Optimized for on-the-go voice journaling |
| 🛡️ **Secure Authentication** | Google login via Auth.js with strong security standards |
| 📸 **Media Attachments** | Add photos, audio clips, or other media to enhance your memories |

### 🧠 AI Companion Features (Phase 2)

| Feature | Description |
|---------|-------------|
| 👤 **AI Personality Customization** | Customize your AI companion's personality traits and interaction style |
| 💬 **Voice Chat Conversations** | Have spoken conversations with your AI companion using voice synthesis |
| 🤗 **Vulnerability Safe Space** | Specialized support for sharing sensitive thoughts and feelings |
| 🧠 **Memory-Informed Responses** | AI provides insights and advice based on your past experiences |
| 👨‍🎓 **AI Coaching** | Goal-oriented guidance based on your personal aspirations |
| 💾 **Conversation History** | Review and reflect on past conversations with your AI companion |

### 🌈 Advanced & Community Features (Phase 3)

| Feature | Description |
|---------|-------------|
| 📚 **Shareable Diary Entries** | Option to share specific entries with trusted friends or publicly |
| 👨‍👩‍👧‍👦 **Family Memory Vault** | Collaborative family journaling with shared memories and milestones |
| 🌎 **Travel Journal Mode** | Location-tagged entries with maps and travel context |
| 🌐 **Multi-language Support** | Voice journaling and AI companion in multiple languages |
| 🔥 **Memory Streaks** | Gamification for consistent journaling habits |
| 📊 **Advanced Memory Analytics** | Deeper insights into recurring themes, relationships, and emotional patterns |
| 📱 **Offline Mode** | Full functionality without internet connection, with seamless syncing |
| 🔗 **External Integrations** | Connect with calendar, photos, social media, and health apps |

## 👥 Target Users

- **Journal keepers** (who prefer speaking to writing)
- **People seeking emotional support** (who want a non-judgmental AI companion)
- **Memory enthusiasts** (who want to document and easily retrieve life experiences)
- **Busy individuals** (who don't have time for traditional journaling)
- **Those experiencing loneliness** (who benefit from AI companionship)
- **Mental health advocates** (using technology for emotional well-being)
- **Therapy participants** (supplementing professional support with daily reflections)

## 🛠️ Technical Stack

- **Frontend**: Next.js with Edge Runtime for optimal performance
- **Styling**: Tailwind CSS for modern, responsive UI
- **Authentication**: Auth.js with Google authentication
- **Database**: Cloudflare D1 for reliable, scalable data storage
- **Deployment**: Cloudflare Pages for global edge deployment
- **Language**: JavaScript (clean, modern practices)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Cloudflare account (for D1 and Pages)

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd reflectai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

## 📊 Data Architecture

### Database Schema

- **Users**: Authentication and profile information
- **Reflections**: Daily entries with metadata
- **Prompts**: System and user-generated reflection questions
- **Insights**: AI-generated analysis and feedback
- **Goals**: User-defined micro-objectives and tracking

## 📈 Scalability Considerations

- **Edge Computing**: Utilizing Next.js Edge Runtime for global low-latency voice processing
- **Serverless Architecture**: Minimal operational overhead with Cloudflare Pages
- **Progressive Enhancement**: Core diary functionality works without advanced AI features
- **Modular Design**: Components built for easy feature expansion
- **API-First Approach**: Well-documented internal APIs for future integrations
- **Memory Indexing**: Efficient search algorithms for rapid memory retrieval
- **Streaming Voice Processing**: Real-time voice-to-text for immediate feedback

## 🛣️ Development Roadmap

### Phase 1: Foundation (1-2 months)
- Voice-to-text diary interface
- Basic memory search functionality
- Simple AI companion responses
- Google authentication
- Data persistence
- Mobile-responsive design

### Phase 2: AI Companion (2-3 months)
- Enhanced AI personality customization
- Voice chat capabilities
- Emotional intelligence improvements
- Memory-informed conversations
- Advanced memory search with context

### Phase 3: Advanced Features (3-4 months)
- Sharing and community features
- Family and group journaling
- Advanced analytics and insights
- External integrations
- Premium subscription features

## 🔒 Privacy and Security

DiaryVio is built with privacy at its core:
- End-to-end encryption for all diary entries and conversations
- Local-first architecture where possible for sensitive data
- Transparent data usage policies with clear AI training boundaries
- User ownership of all content with data portability
- Option to completely delete all data and AI personality training
- Ethical AI guidelines for companion behavior

## 🤝 Contributing

We welcome contributions to DiaryVio! See our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

**DiaryVio** — Your voice, your story, your AI companion. ✨
# looplog
