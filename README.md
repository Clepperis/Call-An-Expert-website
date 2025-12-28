# Last 20 MVP

Production-ready MVP for **Last 20** - a paid expert consultation service where non-developers stuck at ~80% completion can book 15-minute screenshare sessions with experts.

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth (Google + GitHub OAuth)
- **Payments**: Stripe Checkout (one-time payments)
- **Email**: Resend (transactional emails)
- **File upload**: Local filesystem (`/uploads`, max 25MB)
- **Validation**: Zod + react-hook-form

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for local Postgres)
- Stripe account
- Resend account
- Google OAuth credentials
- GitHub OAuth credentials

## Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:

Copy `.env.example` to `.env` and fill in all values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `GITHUB_ID` / `GITHUB_SECRET` - From GitHub OAuth Apps
- `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` - From Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` - From Stripe CLI or webhook settings
- `RESEND_API_KEY` - From Resend dashboard
- `RESEND_FROM_EMAIL` - Verified sender email in Resend
- `ADMIN_EMAIL` - Admin user email for dashboard access

3. **Start the database**:

```bash
docker-compose up -d
```

This starts a PostgreSQL container on port 5432.

4. **Run database migrations**:

```bash
npm run db:migrate
```

Or for quick prototyping:
```bash
npm run db:push
```

5. **Start the development server**:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Stripe Setup

### 1. Create products/prices in Stripe Dashboard:

- **Session**: $49 one-time payment
- **Agency plans**: $99, $249, $499 annual one-time payments

Or use dynamic price creation (already implemented in code).

### 2. Set up webhook for local development:

Install Stripe CLI:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe
```

Login and forward webhooks:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret from the output and add to `.env` as `STRIPE_WEBHOOK_SECRET`.

### 3. Test the payment flow:

Use Stripe test card: `4242 4242 4242 4242` with any future expiry and CVC.

## Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain (or use `onboarding@resend.dev` for testing)
3. Create an API key
4. Add to `.env` as `RESEND_API_KEY` and `RESEND_FROM_EMAIL`

## OAuth Setup

### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy client ID and secret to `.env`

### GitHub OAuth:
1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy client ID and secret to `.env`

## Project Structure

```
/app                   # Next.js App Router pages
  /admin               # Admin dashboard
  /agency              # Agency plans page
  /api                 # API routes
    /auth              # NextAuth
    /checkout          # Stripe checkout
    /experts           # Expert applications
    /requests          # Request management
    /upload            # File upload
    /webhooks          # Stripe webhooks
  /book                # Booking form
  /checkout            # Checkout pages
  /experts             # Expert application
  /requests            # User request dashboard
  /success & /cancel   # Payment result pages
  /terms & /privacy    # Legal pages
/components            # React components
  /ui                  # Reusable UI components
/lib                   # Utilities and configs
/prisma                # Database schema
/uploads               # File uploads (gitignored)
```

## Manual Testing Checklist

### Authentication
- [ ] Sign in with Google
- [ ] Sign in with GitHub
- [ ] Sign out
- [ ] Protected routes redirect to sign-in

### Booking Flow
- [ ] Fill out booking form with all fields
- [ ] Upload a zip file (< 25MB)
- [ ] Select multiple tech tags
- [ ] Submit form and verify redirect to checkout
- [ ] Verify Request created in database

### Payment Flow
- [ ] Complete Stripe checkout for session ($49)
- [ ] Verify webhook receives `checkout.session.completed` event
- [ ] Verify Payment record status updated to "paid"
- [ ] Verify Request status changed to "paid"
- [ ] Verify confirmation email sent

### Agency Plans
- [ ] Purchase Starter plan ($99)
- [ ] Verify AgencyAccount created with correct tier
- [ ] Verify payment recorded

### Expert Application
- [ ] Submit expert application with all fields
- [ ] Verify ExpertApplication created in database
- [ ] Verify confirmation email sent

### Admin Dashboard
- [ ] Access admin page with ADMIN_EMAIL
- [ ] View all requests
- [ ] Update request status
- [ ] Add meeting link and admin notes
- [ ] View expert applications
- [ ] Approve/reject expert application

### User Dashboard
- [ ] View list of user's requests
- [ ] View individual request details
- [ ] Verify status badges display correctly
- [ ] Pay for unpaid request from detail page

### Responsive Design
- [ ] Test all pages on mobile viewport (375px)
- [ ] Verify navigation works on mobile
- [ ] Test forms on mobile

## Database Management

View data with Prisma Studio:
```bash
npm run db:studio
```

## Next Improvements

1. **File storage**: Migrate from local filesystem to S3 or similar cloud storage
2. **Expert onboarding**: Build expert dashboard for managing availability and sessions
3. **Automated matching**: Implement algorithm to match requests with experts based on tags
4. **Calendar integration**: Add calendar sync for scheduling
5. **Subscriptions**: Convert agency plans to recurring subscriptions
6. **Messaging**: Add in-app messaging between clients and experts
7. **Multi-admin**: Implement role-based access control for multiple admins
8. **Automated testing**: Add E2E tests with Playwright
9. **File deletion**: Implement cron job to auto-delete uploads after 14 days
10. **Multi-currency**: Support payments in different currencies

## Support

For issues or questions, contact: support@last20.com

## License

Proprietary - All rights reserved
