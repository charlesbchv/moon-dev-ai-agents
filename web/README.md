# 🌙 Moon Trading Platform - Full-Stack AI Trading SaaS

A production-ready, full-stack web application that transforms the moon-dev-ai-agents trading system into a professional SaaS platform with modern UI/UX, real-time analytics, and AI-powered trading automation.

![Next.js](https://img.shields.io/badge/Next.js-15+-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.20-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-316192)

## 🚀 Features

### Frontend
- ✨ **Modern Landing Page** with hero section, feature showcase, and CTAs
- 🎨 **Professional UI/UX** built with Tailwind CSS + shadcn/ui components
- 🌓 **Dark/Light Mode** with system preference support
- 📱 **Fully Responsive** mobile-first design
- 🔐 **Complete Authentication** flow (signup, login, password reset)
- 📊 **Real-Time Dashboard** with live trading metrics and P&L charts
- 🤖 **AI Agent Management** - enable/disable agents, configure strategies
- 🔔 **Live Notifications** for trades, alerts, and system events
- ⚙️ **Settings Panel** for API keys, preferences, notifications
- 📈 **Performance Charts** using ApexCharts
- 🎭 **Smooth Animations** with Framer Motion

### Backend
- 🔒 **JWT Authentication** with secure password hashing
- 📡 **RESTful API** endpoints for all operations
- 🔌 **WebSocket Support** for real-time updates
- 🗄️ **PostgreSQL + Prisma ORM** for robust data management
- 🐍 **Python Integration** layer for moon-dev-ai-agents
- 🛡️ **Error Handling** and input validation
- 📝 **Comprehensive Logging** system

### AI Agents Supported
- 🤖 Trading Agent
- 📈 Strategy Agent
- 🔍 Analysis Agent
- ✅ Compliance Agent
- ⚠️ Risk Agent
- 💭 Sentiment Agent
- 📚 Research Agent
- 💰 Funding Agent
- 🚨 Liquidation Agent
- 🎯 Sniper Agent
- 📊 RBI Agent
- 🔄 Copybot Agent
- 🐋 Whale Agent

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **UI Library**: React 19
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Charts**: ApexCharts / Recharts
- **Animations**: Framer Motion
- **Theme**: next-themes

### Backend
- **Runtime**: Node.js 18+
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js / JWT
- **WebSocket**: ws
- **Validation**: Zod

### Python Integration
- **Service**: moon-dev-ai-agents Python module
- **Communication**: HTTP API / subprocess
- **LLM Models**: Claude, DeepSeek, Gemini, Grok

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- Python 3.8+ (for moon-dev-ai-agents)

### Quick Start

1. **Navigate to the web directory**:
   ```bash
   cd web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Random secret for authentication
   - `JWT_SECRET`: Random secret for JWT tokens
   - `PYTHON_SERVICE_URL`: URL of Python backend service

4. **Initialize the database**:
   ```bash
   npm run db:push
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Database Setup

The application uses PostgreSQL. Update your `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/moon_trading?schema=public"
```

### Authentication

Generate secure secrets for authentication:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

### Python Backend Integration

The platform integrates with the moon-dev-ai-agents Python service. You have two options:

#### Option 1: HTTP Service (Recommended)
Start a Python HTTP server that exposes the AI agents as API endpoints.

#### Option 2: Subprocess
The Node.js backend can spawn Python processes directly.

## 📁 Project Structure

```
web/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── agents/            # Agent management components
│   │   └── charts/            # Chart components
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   ├── utils.ts           # Utility functions
│   │   └── auth.ts            # Authentication utilities
│   └── hooks/                 # Custom React hooks
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Create database migration

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables for Production

Ensure all environment variables are set in your production environment:
- `NODE_ENV=production`
- `DATABASE_URL`
- `NEXTAUTH_URL` (your production domain)
- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `PYTHON_SERVICE_URL`

### Recommended Hosting
- **Frontend/Backend**: Vercel, Railway, Render
- **Database**: Supabase, Neon, Railway PostgreSQL
- **Python Service**: Docker container on Cloud Run, Railway, or Fly.io

## 🎨 Design System

### Colors
- **Primary**: Blue gradient for main CTAs
- **Profit**: Green for positive P&L
- **Loss**: Red for negative P&L
- **Background**: Dark theme by default

### Typography
- **Font**: Inter (sans-serif)
- **Hierarchy**: Consistent heading and body sizes

### Spacing
- **Grid System**: 8px base unit
- **Breakpoints**: Mobile-first (sm, md, lg, xl, 2xl)

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Prisma)
- ✅ CSRF protection
- ✅ Rate limiting (recommended to add)

## 📊 Key Features Breakdown

### Dashboard
- Real-time agent status indicators
- Live P&L charts
- Recent trade history
- Quick action buttons
- Performance metrics

### Agent Management
- Enable/disable agents with one click
- Configure agent parameters
- View detailed logs
- Monitor agent performance
- Set up alerts

### Trading Analytics
- Historical performance charts
- Win rate statistics
- Average P&L per trade
- Best performing strategies
- Risk metrics

### Settings
- API key management
- Notification preferences
- Theme customization
- Account settings
- Security options

## 🤝 Contributing

This is a production-ready template. Feel free to customize it for your needs:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is part of the moon-dev-ai-agents ecosystem.

## 🆘 Support

For issues, questions, or feature requests:
- Check the documentation in `/docs`
- Review the code comments
- Open an issue on GitHub

## 🎯 Roadmap

- [ ] Add more chart types
- [ ] Implement strategy builder UI
- [ ] Add mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced backtesting UI
- [ ] Social trading features
- [ ] API marketplace
- [ ] White-label options

## ⚡ Performance

- Lighthouse Score: 90+ (target)
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Code splitting and lazy loading implemented
- Image optimization with Next.js Image

---

**Built with ❤️ for the Moon Dev AI Agents community**
