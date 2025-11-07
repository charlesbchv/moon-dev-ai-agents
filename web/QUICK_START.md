# 🚀 Quick Start Guide

## 30-Second Setup

```bash
cd web
npm install
cp .env.example .env
# Edit .env with your database URL
npm run db:push
npm run dev
```

Open: http://localhost:3000

## Essential Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run linter
npm run type-check       # Check TypeScript

# Database
npm run db:push          # Push schema to database
npm run db:studio        # Open Prisma Studio (http://localhost:5555)
npm run db:migrate       # Create migration

# Prisma
npx prisma generate      # Generate Prisma client
npx prisma studio        # Open database GUI
```

## Environment Variables (.env)

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/moon_trading"
NEXTAUTH_SECRET="[run: openssl rand -base64 32]"
JWT_SECRET="[run: openssl rand -base64 32]"
PYTHON_SERVICE_URL="http://localhost:8000"
```

## File Locations

```
Landing Page:        web/src/app/page.tsx
Dashboard:           web/src/app/dashboard/page.tsx
API Routes:          web/src/app/api/*
Components:          web/src/components/ui/*
Database Schema:     web/prisma/schema.prisma
Styles:              web/src/app/globals.css
Config:              web/tailwind.config.js
```

## Test the Application

1. **Landing Page**: http://localhost:3000
   - Hero section with animations
   - Feature showcase
   - Dark/light mode toggle

2. **API Test** (using curl):
   ```bash
   # Signup
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
   
   # Login
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   
   # List Agents (use token from login)
   curl http://localhost:3000/api/agents \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

3. **Dashboard**: http://localhost:3000/dashboard
   - Real-time stats
   - Agent cards
   - Recent trades

4. **Database**: `npm run db:studio`
   - Visual database browser
   - View/edit data

## Common Issues & Fixes

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm run dev
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql postgres
# Test connection
psql "postgresql://user:pass@localhost:5432/moon_trading"
```

### TypeScript Errors
```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

### Prisma Issues
```bash
# Regenerate client
npx prisma generate
# Reset database (CAUTION: Deletes data!)
npx prisma db push --force-reset
```

## Project Structure (Key Files)

```
web/
├── src/app/
│   ├── page.tsx                    # Landing page ✅
│   ├── dashboard/page.tsx          # Dashboard ✅
│   └── api/
│       ├── auth/signup/route.ts    # Signup API ✅
│       ├── auth/login/route.ts     # Login API ✅
│       └── agents/route.ts         # Agents API ✅
├── src/components/ui/              # UI components ✅
├── prisma/schema.prisma            # Database schema ✅
└── .env                            # Environment config
```

## Adding New Features

### Add a New Page
```typescript
// Create: web/src/app/my-page/page.tsx
export default function MyPage() {
  return <div>My Page</div>;
}
// Access: http://localhost:3000/my-page
```

### Add a New API Route
```typescript
// Create: web/src/app/api/my-route/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
// Access: http://localhost:3000/api/my-route
```

### Add a New Component
```typescript
// Create: web/src/components/my-component.tsx
export function MyComponent() {
  return <div>My Component</div>;
}
// Use: import { MyComponent } from "@/components/my-component";
```

## Useful Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org/docs

## Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Review `PROJECT_OVERVIEW.md` for file structure
3. Read `BUILD_COMPLETE.md` for features
4. Check inline code comments

## Quick Checklist

- [ ] Node.js 18+ installed
- [ ] PostgreSQL running
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Database schema pushed (`npm run db:push`)
- [ ] Dev server running (`npm run dev`)
- [ ] Landing page loads (http://localhost:3000)
- [ ] Dashboard accessible
- [ ] API routes working

## Production Deploy

```bash
# Build
npm run build

# Test production locally
npm start

# Deploy to Vercel
vercel

# Or Railway
railway up

# Or Docker
docker build -t moon-trading .
docker run -p 3000:3000 moon-trading
```

---

🌙 **Moon Trading Platform** - Ready to trade!
