# 🚀 Moon Trading Platform - Complete Setup Guide

This guide will walk you through setting up the full-stack Moon Trading Platform from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **PostgreSQL 14+** - [Download here](https://www.postgresql.org/download/)
- **Python 3.8+** - For moon-dev-ai-agents integration
- **Git** - For version control

## 🛠️ Installation Steps

### Step 1: Navigate to Web Directory

```bash
cd /Users/batchaev/git/moon-dev-ai-agents/web
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 19
- TypeScript
- Prisma ORM
- Tailwind CSS
- shadcn/ui components
- And many more...

### Step 3: Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/moon_trading?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# JWT
JWT_SECRET="your-jwt-secret-here"  # Generate with: openssl rand -base64 32

# Python Service
PYTHON_SERVICE_URL="http://localhost:8000"

# WebSocket
WS_PORT=3001

# Environment
NODE_ENV="development"
```

#### Generating Secrets

Generate secure secrets for authentication:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

Copy the output and paste into your `.env` file.

### Step 4: Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed):
   - macOS: `brew install postgresql@14`
   - Ubuntu: `sudo apt-get install postgresql`
   - Windows: Download installer from postgresql.org

2. **Start PostgreSQL**:
   - macOS: `brew services start postgresql@14`
   - Ubuntu: `sudo service postgresql start`
   - Windows: Use Services app

3. **Create Database**:
   ```bash
   # Log into PostgreSQL
   psql postgres
   
   # Create database
   CREATE DATABASE moon_trading;
   
   # Create user (if needed)
   CREATE USER moon_user WITH PASSWORD 'your_password';
   
   # Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE moon_trading TO moon_user;
   
   # Exit
   \q
   ```

4. **Update .env** with your database credentials:
   ```env
   DATABASE_URL="postgresql://moon_user:your_password@localhost:5432/moon_trading?schema=public"
   ```

#### Option B: Cloud Database (Recommended for Production)

Use a managed PostgreSQL service:
- **Supabase**: Free tier available, easy setup
- **Neon**: Serverless PostgreSQL
- **Railway**: Simple deployment
- **Vercel Postgres**: Integrated with Vercel

Get the connection string from your provider and add it to `.env`.

### Step 5: Initialize Database Schema

Push the Prisma schema to your database:

```bash
npm run db:push
```

This will create all necessary tables:
- Users
- Agents
- Strategies
- Trades
- Notifications
- ApiKeys
- Backtests

Verify with Prisma Studio:

```bash
npm run db:studio
```

This opens a web interface at `http://localhost:5555` to view your database.

### Step 6: Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api

## 🎨 Testing the Application

### 1. Visit the Landing Page

Open http://localhost:3000 in your browser. You should see:
- Professional hero section
- Navigation bar
- Feature showcase
- Call-to-action buttons

### 2. Create an Account

1. Click "Get Started" or "Sign Up"
2. Fill in your email and password
3. You'll receive a JWT token and be logged in

### 3. Access the Dashboard

Navigate to http://localhost:3000/dashboard to see:
- Real-time statistics
- AI agent status cards
- Recent trades
- Performance metrics

## 🐍 Python Backend Integration

To connect the moon-dev-ai-agents Python service:

### Option 1: HTTP Service (Recommended)

Create a simple Python HTTP server in the root directory:

```python
# /Users/batchaev/git/moon-dev-ai-agents/python_service.py
from flask import Flask, jsonify, request
from src.agents import trading_agent, strategy_agent

app = Flask(__name__)

@app.route('/api/agents/status', methods=['GET'])
def get_agents_status():
    # Return status of all agents
    return jsonify({
        'agents': [
            {'name': 'Trading Agent', 'status': 'active'},
            {'name': 'Strategy Agent', 'status': 'active'},
        ]
    })

@app.route('/api/agents/<agent_id>/start', methods=['POST'])
def start_agent(agent_id):
    # Start specific agent
    return jsonify({'success': True})

@app.route('/api/agents/<agent_id>/stop', methods=['POST'])
def stop_agent(agent_id):
    # Stop specific agent
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
```

Install Flask:
```bash
pip install flask
```

Start the Python service:
```bash
python python_service.py
```

### Option 2: Docker Container

Create a `Dockerfile` for the Python service:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src/ ./src/

EXPOSE 8000

CMD ["python", "python_service.py"]
```

Build and run:
```bash
docker build -t moon-python-service .
docker run -p 8000:8000 moon-python-service
```

## 📦 Building for Production

### 1. Build the Application

```bash
npm run build
```

This creates an optimized production build in `.next/`.

### 2. Start Production Server

```bash
npm start
```

### 3. Environment Variables for Production

Ensure these are set:
- `NODE_ENV=production`
- `DATABASE_URL` (production database)
- `NEXTAUTH_URL` (your domain)
- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `PYTHON_SERVICE_URL`

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard

4. Database: Use Vercel Postgres or external provider

### Option 2: Railway

1. Create account at railway.app
2. Click "New Project"
3. Connect GitHub repository
4. Add PostgreSQL database
5. Set environment variables
6. Deploy!

### Option 3: Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/moon_trading
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - db
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=moon_trading
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data
  
  python:
    build: ./python
    ports:
      - "8000:8000"

volumes:
  postgres-data:
```

Deploy:
```bash
docker-compose up -d
```

## 🔧 Troubleshooting

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql postgresql://username:password@localhost:5432/moon_trading

# If it fails, check:
# 1. PostgreSQL is running
# 2. Credentials are correct
# 3. Database exists
```

### Prisma Issues

```bash
# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset

# Regenerate Prisma client
npx prisma generate

# View database in browser
npx prisma studio
```

### TypeScript Errors

```bash
# Check for type errors
npm run type-check

# Regenerate types
rm -rf .next
npm run build
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -ti:3000

# Kill it
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 npm run dev
```

## 📊 Database Migrations

For production, use migrations instead of `db:push`:

```bash
# Create migration
npx prisma migrate dev --name init

# Apply migrations in production
npx prisma migrate deploy
```

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change all default secrets
- [ ] Use strong database password
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable database connection pooling
- [ ] Set up monitoring and logging
- [ ] Regular security updates

## 🎯 Performance Optimization

### For Production:

1. **Enable caching**:
   ```typescript
   // next.config.js
   module.exports = {
     // ... other config
     headers: async () => [
       {
         source: '/(.*)',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ],
   };
   ```

2. **Database connection pooling**:
   ```env
   DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true&connection_limit=10"
   ```

3. **Image optimization**: Already handled by Next.js

4. **Code splitting**: Already handled by Next.js

## 📞 Support

If you encounter issues:

1. Check this documentation
2. Review error logs
3. Check browser console
4. Review Prisma Studio for database issues
5. Check Python service logs

## 🎉 Success!

Your Moon Trading Platform is now set up and running! 

Visit:
- **Landing Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **API Docs**: http://localhost:3000/api-doc (coming soon)
- **Prisma Studio**: http://localhost:5555

Happy trading! 🌙📈
