# Rescue and Rehab - Deployment Guide

This guide will help you deploy the Rescue and Rehab application on your EC2 instance using PM2.

## Prerequisites

- Ubuntu EC2 instance (t2.micro or larger)
- Domain name (optional, for production)
- PostgreSQL database (can use AWS RDS or external service)
- Gmail account for email notifications

## Quick Deployment

1. **Upload your code to the server:**
   ```bash
   # Option 1: Using Git (recommended)
   git clone https://github.com/yourusername/rescue-and-rehab.git
   cd rescue-and-rehab
   
   # Option 2: Using SCP/SFTP
   # Upload the entire project folder to /home/ubuntu/rescue-and-rehab
   ```

2. **Run the deployment script:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Update environment variables:**
   ```bash
   nano .env
   ```
   
   Update these values:
   ```env
   DATABASE_URL="postgresql://username:password@your-db-host:5432/database_name"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_APP_PASSWORD="your-gmail-app-password"
   ```

4. **Set up the database:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

## Manual Deployment Steps

If you prefer to deploy manually:

### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### 2. Set Up Application

```bash
# Create application directory
sudo mkdir -p /home/ubuntu/rescue-and-rehab
sudo chown -R ubuntu:ubuntu /home/ubuntu/rescue-and-rehab
cd /home/ubuntu/rescue-and-rehab

# Install dependencies
npm install

# Build the application
npm run build
```

### 3. Configure Environment

Create `.env` file:
```env
DATABASE_URL="your-database-connection-string"
JWT_SECRET="rescue-and-rehab-admin-secret-key-2024-secure"
EMAIL_USER="your-email@gmail.com"
EMAIL_APP_PASSWORD="your-gmail-app-password"
NODE_ENV=production
PORT=3000
```

### 4. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database
npx prisma db seed
```

### 5. Start with PM2

```bash
# Start the application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

## Nginx Configuration (Optional)

For production with a domain name, set up Nginx as a reverse proxy:

```bash
# Install Nginx
sudo apt install nginx -y

# Create configuration file
sudo nano /etc/nginx/sites-available/rescue-and-rehab
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/rescue-and-rehab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## SSL Certificate (Optional)

For HTTPS, use Let's Encrypt:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Database Setup

### Option 1: AWS RDS (Recommended)

1. Create a PostgreSQL RDS instance
2. Note the connection details
3. Update `DATABASE_URL` in `.env`

### Option 2: External Database

Use services like:
- Supabase
- PlanetScale
- Railway
- Neon

### Option 3: Local PostgreSQL

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Create database and user
sudo -u postgres psql
CREATE DATABASE rescue_and_rehab;
CREATE USER rescue_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE rescue_and_rehab TO rescue_user;
\q
```

## Email Configuration

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `EMAIL_APP_PASSWORD`

## Monitoring and Maintenance

### PM2 Commands

```bash
pm2 status              # Check application status
pm2 logs                # View logs
pm2 logs --lines 100    # View last 100 lines
pm2 restart all         # Restart application
pm2 stop all            # Stop application
pm2 delete all          # Delete all processes
pm2 monit               # Monitor in real-time
```

### Log Files

- Application logs: `./logs/`
- PM2 logs: `~/.pm2/logs/`
- Nginx logs: `/var/log/nginx/`

### Updates

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Rebuild application
npm run build

# Restart PM2
pm2 restart all
```

## Security Considerations

1. **Firewall Setup:**
   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

2. **Change Default Admin Password:**
   - Login to admin panel
   - Update admin credentials in the code
   - Or implement password change functionality

3. **Environment Variables:**
   - Never commit `.env` file
   - Use strong JWT secrets
   - Rotate secrets regularly

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs

# Check if port is in use
sudo netstat -tlnp | grep :3000
```

### Database Connection Issues

```bash
# Test database connection
npx prisma db push

# Check database status
npx prisma studio
```

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

## Default Credentials

- **Admin Login:** http://your-server:3000/admin
- **Username:** admin
- **Password:** admin123

**⚠️ Important:** Change these credentials immediately after deployment!

## Support

For issues or questions:
1. Check the logs: `pm2 logs`
2. Verify environment variables
3. Test database connectivity
4. Check firewall settings

## Application Features

- ✅ Animal management system
- ✅ Event management with galleries
- ✅ Volunteer management
- ✅ Core member management
- ✅ Contact form with email notifications
- ✅ Donation system with Razorpay
- ✅ Admin authentication
- ✅ Responsive design
- ✅ Image upload functionality

Your Rescue and Rehab application is now ready for production! 🎉
