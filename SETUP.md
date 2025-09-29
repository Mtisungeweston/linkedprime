# LinkedPrime News Aggregator - Setup Guide

## Quick Start

### 1. Database Setup

You have three options for the database:

#### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your database connection string from Project Settings > Database
3. Run the SQL scripts in the Supabase SQL Editor:
   - Execute `scripts/01-create-schema.sql`
   - Execute `scripts/02-seed-data.sql`
   - Execute `scripts/03-add-subscribers-and-admin.sql`

#### Option B: Neon
1. Go to [neon.tech](https://neon.tech) and create a new project
2. Copy your connection string
3. Use a PostgreSQL client to run the scripts in order

#### Option C: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a new database: `createdb linkedprime_news`
3. Run the scripts using psql:
   \`\`\`bash
   psql linkedprime_news < scripts/01-create-schema.sql
   psql linkedprime_news < scripts/02-seed-data.sql
   psql linkedprime_news < scripts/03-add-subscribers-and-admin.sql
   \`\`\`

### 2. Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Database - Replace with your actual connection string
DATABASE_URL=postgresql://user:password@host:port/database

# Site URL - Update for production
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cron Secret - Generate a random string
CRON_SECRET=your-random-secret-key-here

# Optional: Rate Limiting
RATE_LIMIT_REQUESTS_PER_MINUTE=10
\`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the public site.

### 5. Access Admin Panel

**Admin Login Credentials:**
- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: `mtisungeweston@gmail.com`
- Password: `Admin2025`

## Features Overview

### Public Site
- Browse latest news articles
- Filter by category (Technology, Business, Sports, Science, Health, World, etc.)
- Subscribe to newsletter
- Read full articles with SEO optimization
- Responsive design for all devices

### Admin Dashboard
- **Dashboard**: Overview of system metrics and activity
- **Articles**: Moderate and manage articles (approve/reject/edit)
- **Sources**: Add and configure news sources for scraping
- **Subscribers**: View and manage newsletter subscribers
- **Settings**: Configure scraping frequency and system settings

## Scraping Configuration

### Adding a News Source

1. Go to Admin > Sources
2. Click "Add Source"
3. Fill in the details:
   - **Name**: Source name (e.g., "BBC News")
   - **URL**: Homepage URL to scrape
   - **Base Domain**: Domain name (e.g., "bbc.com")
   - **Scrape Config**: JSON configuration with CSS selectors
   - **Fetch Frequency**: How often to scrape (in minutes)

### Example Scrape Configuration

\`\`\`json
{
  "article_selector": "article.post",
  "title_selector": "h2.title",
  "link_selector": "a.permalink",
  "excerpt_selector": "p.excerpt",
  "image_selector": "img.featured"
}
\`\`\`

### CSS Selectors Guide

Use browser DevTools to find the right selectors:
1. Right-click on an article element
2. Select "Inspect"
3. Find the CSS class or tag name
4. Test your selector in the console: `document.querySelectorAll('your-selector')`

## Automation

### Cron Jobs (Vercel)

The app is configured to scrape automatically every 30 minutes when deployed to Vercel.

To change the frequency, edit `vercel.json`:

\`\`\`json
{
  "crons": [{
    "path": "/api/cron/scrape",
    "schedule": "0 */30 * * *"
  }]
}
\`\`\`

Schedule format: `minute hour day month dayOfWeek`

Examples:
- Every 15 minutes: `*/15 * * * *`
- Every hour: `0 * * * *`
- Every 6 hours: `0 */6 * * *`
- Daily at 9 AM: `0 9 * * *`

### Manual Scraping

You can trigger scraping manually from the admin dashboard or via API:

\`\`\`bash
# Scrape all sources
curl -X POST http://localhost:3000/api/scrape/all

# Scrape specific source
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"sourceId": 1}'
\`\`\`

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
   - `CRON_SECRET`
4. Deploy
5. Cron jobs will automatically be configured

## SEO Features

### Automatic Sitemap
- Generated at `/sitemap.xml`
- Updates automatically with new articles
- Includes all public pages and articles

### Robots.txt
- Available at `/robots.txt`
- Configured to allow search engines
- Blocks admin and API routes

### Structured Data
- JSON-LD schema on all pages
- NewsArticle schema for articles
- Organization and WebSite schema on homepage
- Breadcrumb navigation

### Meta Tags
- Open Graph tags for social sharing
- Twitter Card tags
- Dynamic meta descriptions
- Canonical URLs

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Check if your database allows external connections
- For Supabase, make sure you're using the connection pooler URL

### Scraping Not Working
- Check if the source website blocks automated requests
- Verify CSS selectors are correct (websites change their HTML)
- Check rate limiting settings
- Review scrape logs in Admin > Dashboard

### Admin Login Issues
- Make sure you ran `scripts/03-add-subscribers-and-admin.sql`
- Clear browser cookies and try again
- Check browser console for errors

## Support

For issues or questions:
1. Check the README.md for general information
2. Review this SETUP.md for configuration details
3. Check the code comments for implementation details

## Security Notes

- Change the default admin password after first login
- Keep your `CRON_SECRET` secure
- Use HTTPS in production
- Regularly update dependencies
- Monitor scraping logs for suspicious activity
