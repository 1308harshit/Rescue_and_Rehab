#!/bin/bash

# Rescue and Rehab Deployment Script
# Run this script on your EC2 instance

echo "🚀 Starting Rescue and Rehab deployment..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18 if not already installed
if ! command -v node &> /dev/null; then
    echo "📥 Installing Node.js 18..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "📥 Installing PM2..."
    sudo npm install -g pm2
fi

# Create application directory
echo "📁 Setting up application directory..."
sudo mkdir -p /home/ubuntu/rescue-and-rehab
sudo chown -R ubuntu:ubuntu /home/ubuntu/rescue-and-rehab

# Navigate to application directory
cd /home/ubuntu/rescue-and-rehab

# Clone or update the repository (replace with your actual repository URL)
echo "📥 Cloning/updating repository..."
# git clone https://github.com/yourusername/rescue-and-rehab.git . || git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create logs directory
mkdir -p logs

# Set up environment variables
echo "🔧 Setting up environment variables..."
cat > .env << EOF
# Database
DATABASE_URL="your-database-url-here"

# JWT Secret for authentication
JWT_SECRET="rescue-and-rehab-admin-secret-key-2024-secure"

# Email Configuration
EMAIL_USER="your-email@gmail.com"
EMAIL_APP_PASSWORD="your-app-password"

# Production settings
NODE_ENV=production
PORT=3000
EOF

echo "⚠️  Please update the .env file with your actual values:"
echo "   - DATABASE_URL: Your PostgreSQL database connection string"
echo "   - EMAIL_USER: Your Gmail address"
echo "   - EMAIL_APP_PASSWORD: Your Gmail app password"

# Build the application
echo "🔨 Building the application..."
npm run build

# Set up Prisma
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma db push
npx prisma db seed

# Start the application with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup

echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update the .env file with your actual values"
echo "2. Set up your database and run: npx prisma db push && npx prisma db seed"
echo "3. Configure your web server (Nginx) to proxy to port 3000"
echo "4. Set up SSL certificate for HTTPS"
echo ""
echo "🔧 Useful commands:"
echo "  pm2 status          - Check application status"
echo "  pm2 logs            - View application logs"
echo "  pm2 restart all     - Restart the application"
echo "  pm2 stop all        - Stop the application"
echo ""
echo "🌐 Your application should be running on http://your-server-ip:3000"
echo "🔐 Admin login: http://your-server-ip:3000/admin"
echo "   Username: admin"
echo "   Password: admin123"
