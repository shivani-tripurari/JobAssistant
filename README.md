# Job Assistant

A production-ready GenAI web application for generating professional cold emails, follow-ups, and subject lines using Google Gemini API.

![Job Assistant](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)

## Features

- 🎯 **Cold Email Generation** - Personalized outreach emails
- 🔄 **Follow-up Emails** - Professional follow-up templates
- 📬 **Subject Lines** - Multiple engaging options
- 📋 **Copy to Clipboard** - One-click copy functionality
- 🌙 **Premium Dark UI** - Glassmorphism design
- ⚡ **Graceful Fallback** - Works even without API key

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Backend | Vercel Serverless Functions |
| AI | Google Gemini API (REST) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key (optional - works without it using demo content)

### Installation

```bash
# Clone the repository
git clone https://github.com/shivani-tripurari/JobAssistant.git
cd JobAssistant

# Install dependencies
npm install

# Start development server
npm run dev:full
```

### Environment Variables

Create a `.env` file or set environment variables:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** The app works without an API key by returning demo content.

## Usage

1. Open http://localhost:3000
2. Enter the recipient's name
3. Describe the context (job application, networking, etc.)
4. Select the tone (Professional, Casual, or Friendly)
5. Click "Generate Emails"
6. Copy the generated content with one click

## Project Structure

```
├── api/
│   └── generate.js        # Vercel serverless function
├── src/
│   ├── App.jsx            # Main app component
│   ├── components/
│   │   ├── InputPanel.jsx # Form inputs
│   │   └── OutputPanel.jsx# Results display
│   └── utils/
│       └── constants.js   # Config & parser
├── server.dev.js          # Local dev server
└── ...config files
```

## API Reference

### POST /api/generate

**Request:**
```json
{
  "recipient": "John Smith",
  "contextText": "Software Engineer at Google",
  "tone": "Professional",
  "modes": ["cold", "followup", "subjects"]
}
```

**Response:**
```json
{
  "text": "===COLD=== ... ===FOLLOWUP=== ... ===SUBJECTS=== ..."
}
```

## Deployment

```bash
# Deploy to Vercel
vercel
```

## License

MIT
