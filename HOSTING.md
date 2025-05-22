# Hosting Guide for tbh.ai Website

This guide provides instructions for hosting the tbh.ai website and connecting it to your GoDaddy domain (tbhai.solutions).

## Hosting Options

### Option 1: GitHub Pages (Free and Easy)

1. **Create a GitHub Repository**:
   - Create a new repository on GitHub named `tbh-ai.github.io` (or use your existing repository)
   - Push all your website files to this repository

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" > "Pages"
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be published at `https://tbh-ai.github.io`

3. **Connect Your GoDaddy Domain**:
   - Log in to your GoDaddy account
   - Go to "My Products" > "Domains" > Select your domain
   - Click "DNS" or "Manage DNS"
   - Add the following records:
     - Type: A, Name: @, Value: 185.199.108.153 (GitHub's IP)
     - Type: A, Name: @, Value: 185.199.109.153
     - Type: A, Name: @, Value: 185.199.110.153
     - Type: A, Name: @, Value: 185.199.111.153
     - Type: CNAME, Name: www, Value: tbh-ai.github.io (your GitHub Pages URL)
   - Save changes (may take 24-48 hours to propagate)

4. **Configure GitHub Pages for Custom Domain**:
   - In your repository, go to "Settings" > "Pages"
   - Under "Custom domain", enter your domain (e.g., tbhai.solutions)
   - Check "Enforce HTTPS" (once DNS propagation is complete)
   - Save changes

### Option 2: Netlify (Free and More Features)

1. **Create a Netlify Account**:
   - Sign up at [netlify.com](https://www.netlify.com/)

2. **Deploy Your Site**:
   - Click "New site from Git"
   - Connect to your GitHub repository
   - Configure build settings (not needed for static HTML)
   - Click "Deploy site"

3. **Connect Your GoDaddy Domain**:
   - In Netlify, go to "Site settings" > "Domain management" > "Add custom domain"
   - Enter your domain (e.g., tbhai.solutions)
   - Follow Netlify's instructions to update DNS settings at GoDaddy
   - Typically, you'll need to change nameservers to Netlify's nameservers

## Form Submission Setup

The contact form is configured to use FormSubmit.co, which requires the site to be hosted on a web server (not opened locally as HTML files).

1. **First-time Form Submission**:
   - After deploying your site, fill out and submit the contact form once
   - You'll receive an activation email from FormSubmit
   - Click the activation link to confirm your email address
   - After activation, the form will work properly

2. **Troubleshooting**:
   - If you see "Unable to submit form" error, make sure:
     - You're accessing the site through a web server (not as a local file)
     - You've completed the FormSubmit activation process
     - Your form action URL is correct

## Quick Setup with Netlify (Recommended)

For the fastest setup:

1. **Create a GitHub repository and push your website files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/tbhai-website.git
   git push -u origin main
   ```

2. **Sign up for Netlify and connect to your GitHub repository**:
   - Go to [netlify.com](https://www.netlify.com/) and sign up
   - Click "New site from Git" and select your GitHub repository
   - Deploy the site (you'll get a temporary URL like `random-name.netlify.app`)

3. **Add your custom domain in Netlify**:
   - Go to "Site settings" > "Domain management" > "Add custom domain"
   - Enter "tbhai.solutions" and follow the instructions
   - Netlify will guide you through the DNS configuration process

4. **Test your contact form**:
   - Visit your new website
   - Fill out and submit the contact form
   - Check your email for the FormSubmit activation link
   - Click the activation link to activate the form

This approach is recommended because:
- Netlify provides free HTTPS
- Automatic deployments when you push to GitHub
- Built-in form handling (as a backup to FormSubmit)
- Better performance with global CDN

## Maintenance

To update your website:
1. Make changes to your local files
2. Commit and push to GitHub
3. If using GitHub Pages or Netlify, changes will deploy automatically

## Contact

For questions or support, contact: saish.shinde.jb@gmail.com
