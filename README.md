# Easy9ja - AI-Powered Content Distribution Platform

Easy9ja is a powerful content distribution platform that leverages AI to help users create, schedule, and distribute content across multiple social media platforms.

## Features

- 🔐 Secure User Authentication & Profile Management
- 📊 Comprehensive Dashboard with Analytics
- 🤖 AI-Powered Content Generation
- 📱 Multi-Platform Social Media Integration
- 📅 Content Scheduling & Calendar
- 📈 Real-time Analytics & Reporting
- 🎨 Customizable UI/UX

## Tech Stack

- **Frontend**: React.js, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI API
- **Social Media APIs**: Twitter, Facebook, Instagram
- **Deployment**: Docker, AWS/GCP

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Docker (optional, for containerization)
- OpenAI API Key
- Social Media API Keys (Twitter, Facebook, Instagram)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/easy9ja.git
   cd easy9ja
   ```

2. Install dependencies:
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env files in both frontend and backend directories
   cp .env.example .env
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## Project Structure

```
easy9ja/
├── frontend/           # Next.js frontend application
├── backend/           # Express backend application
├── docker/           # Docker configuration files
├── docs/            # API documentation
└── README.md        # Project documentation
```

## API Documentation

Detailed API documentation is available in the `docs` directory. The API follows RESTful principles and includes:

- Authentication endpoints
- User management
- Content generation
- Social media integration
- Analytics and reporting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@easy9ja.com or join our Slack community. 