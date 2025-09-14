# Rescue and Rehab Foundation Website

A modern, marketing-focused website for the Rescue and Rehab Foundation, an NGO dedicated to rescuing, rehabilitating, and rehoming animals in need. The website is built with Next.js 14, TypeScript, and Prisma with PostgreSQL.

## 🚀 Features

### Core Functionality
- **Multi-City Support**: Database schema designed to support multiple cities and their unique data
- **Marketing-Focused**: No user signup/login required - focuses on donations, volunteering, and awareness
- **SEO-Friendly**: Server-side rendering and static generation for better search engine indexing
- **Mobile-Responsive**: Clean, modern design that works on all devices

### Pages
- **Homepage**: Hero section, statistics, upcoming events preview, and call-to-action
- **About Us**: Mission, vision, team information, and Julie Charitable Trust details
- **Animals**: Separate pages for Dogs, Cows, and Birds with city filtering
- **Events**: Event listings with city filtering and event details
- **Contact/Volunteer**: Contact forms and volunteer application system
- **Donate**: Donation page with multiple options and payment integration
- **Admin Panel**: Content management interface for animals and events

### Key Features
- City selector in navigation for location-specific content
- Animal adoption profiles with photos and stories
- Event management with filtering by city and date
- Contact and volunteer forms with database storage
- Donation system with preset amounts and custom options
- Admin interface for content management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (via Prisma Accelerate)
- **UI Components**: Lucide React icons, Radix UI components
- **Payment**: Stripe and Razorpay integration ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or use Prisma Accelerate)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd rescue-and-rehab
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="your-database-connection-string"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database with initial data
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
rescue-and-rehab/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin panel
│   │   ├── animals/           # Animal pages (dogs, cows, birds)
│   │   ├── api/               # API routes
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── donate/            # Donation page
│   │   ├── events/            # Events page
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   ├── context/               # React context providers
│   └── lib/                   # Utility functions and Prisma client
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seeding script
└── public/                    # Static assets
```

## 🗄️ Database Schema

The database is designed with a multi-city architecture:

- **City**: Core entity representing locations where the NGO operates
- **ContactInfo**: Contact details specific to each city
- **Shelter**: Animal shelters/branches in each city
- **Animal**: Rescued animals with photos, stories, and adoption status
- **Event**: Events organized by the NGO, filterable by city
- **VolunteerApplication**: Volunteer applications from the website
- **ContactSubmission**: General contact form submissions
- **Donation**: Donation records and payment tracking

## 🎨 Design Features

- **Color Scheme**: Red and yellow primary colors representing warmth and care
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Reusable, accessible components with hover states
- **Responsive**: Mobile-first design that scales to desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔧 API Endpoints

### Public APIs
- `GET /api/cities` - Fetch all cities
- `GET /api/animals` - Fetch animals with filtering
- `GET /api/events` - Fetch events with filtering
- `POST /api/contact` - Submit contact form
- `POST /api/volunteer` - Submit volunteer application

### Admin APIs
- `DELETE /api/animals/[id]` - Delete animal
- `PUT /api/animals/[id]` - Update animal
- `DELETE /api/events/[id]` - Delete event
- `PUT /api/events/[id]` - Update event

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔐 Security Considerations

- Environment variables for sensitive data
- Input validation on all forms
- SQL injection protection via Prisma
- XSS protection via React's built-in escaping
- CSRF protection via Next.js

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly buttons and forms
- Optimized images and loading
- Fast loading times on mobile networks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Email: info@rescueandrehab.org
- Phone: +91-9876543210
- Website: [Rescue and Rehab Foundation](http://localhost:3000)

## 🙏 Acknowledgments

- Built for the Rescue and Rehab Foundation
- Special thanks to the Julie Charitable Trust
- Powered by the Next.js community
- Icons by Lucide React

---

**Made with ❤️ for animal welfare**