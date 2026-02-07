#!/bin/bash

echo "🚀 Setting up server for automated deployments"

# Get the current user
DEPLOY_USER=${USER}

echo "📝 Configuring passwordless sudo for deployment commands..."

# Create sudoers file for deployment
sudo tee /etc/sudoers.d/deploy-automation > /dev/null <<EOF
# Allow ${DEPLOY_USER} to run deployment commands without password
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/bin/mkdir
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/bin/chown
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/bin/tee /etc/nginx/sites-available/*
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/bin/ln
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/sbin/nginx
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/bin/systemctl reload nginx
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/bin/systemctl stop apache2
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/bin/systemctl disable apache2
EOF

# Set proper permissions
sudo chmod 0440 /etc/sudoers.d/deploy-automation

echo "✅ Sudoers configuration created"

# Stop Apache if it's running (to free up port 80)
if systemctl is-active --quiet apache2; then
    echo "🛑 Stopping Apache2..."
    sudo systemctl stop apache2
    sudo systemctl disable apache2
    echo "✅ Apache2 stopped and disabled"
fi

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt update
    sudo apt install -y nginx
    echo "✅ Nginx installed"
else
    echo "✅ Nginx already installed"
fi

# Ensure Nginx is running
sudo systemctl enable nginx
sudo systemctl start nginx

echo ""
echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure your GitHub secrets are configured:"
echo "   - HETZNER_HOST"
echo "   - HETZNER_USER (should be: ${DEPLOY_USER})"
echo "   - HETZNER_SSH_KEY"
echo "   - HETZNER_SERVER_IP"
echo "   - CLOUDFLARE_ZONE_ID"
echo "   - CLOUDFLARE_API_TOKEN"
echo "   - CLOUDFLARE_DOMAIN"
echo ""
echo "2. Push your code to trigger deployment"
