# 🎯 InterviewVault - Job Application Tracker

A modern, high-performance job application tracking system built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black?style=flat-square)

## ✨ Features

- 📊 **Dashboard Analytics** - Visual insights with progress ring and statistics
- 📝 **Application Management** - Track company, role, status, and interview notes
- 📄 **Resume Tracking** - Upload and manage multiple resume versions (PDF)
- 🔍 **Advanced Filtering** - Search and filter by company, role, or status
- 🌓 **Dark/Light Mode** - Beautiful themes with smooth transitions
- 📱 **Responsive Design** - Mobile-first with bottom navigation
- 💾 **Local Storage** - All data persisted in browser storage
- 🎨 **Modern UI** - Built with shadcn/ui components

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes
- **Notifications**: Sonner

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the project
cd interview-vault-next

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Dashboard (Home)
│   ├── layout.tsx         # Root layout with providers
│   ├── globals.css        # Global styles & theme
│   ├── add/               # Add application page
│   └── applications/      # Applications list & details
│       └── [id]/          # Dynamic application details
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── features/          # Feature-specific components
│   │   ├── application-card.tsx
│   │   ├── progress-ring.tsx
│   │   ├── stats-section.tsx
│   │   └── status-badge.tsx
│   ├── layout/            # Layout components
│   │   ├── header.tsx
│   │   └── mobile-nav.tsx
│   └── providers/         # Context providers
│       └── theme-provider.tsx
├── hooks/                 # Custom React hooks
│   ├── use-applications.ts
│   └── use-file-upload.ts
├── lib/                   # Utilities
│   ├── storage.ts         # LocalStorage operations
│   ├── stats.ts           # Statistics calculations
│   └── utils.ts           # shadcn/ui utilities
└── types/                 # TypeScript types
    └── index.ts
```

## 🎨 UI Components (shadcn/ui)

Pre-installed components:
- Button, Card, Badge
- Input, Textarea, Label
- Select, Dialog
- Dropdown Menu, Tabs
- Separator, Sonner (Toast)

### Adding More Components

```bash
npx shadcn@latest add [component-name]
```

## 🔧 Configuration

### Tailwind CSS v4

The project uses Tailwind CSS v4 with CSS-based configuration. Theme variables are defined in `globals.css`.

### Theme Customization

Modify the CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: oklch(0.55 0.24 270);  /* Indigo */
  --radius: 0.75rem;
  /* ... other variables */
}

.dark {
  --primary: oklch(0.65 0.22 270);
  /* ... dark mode variables */
}
```

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard with stats and recent applications |
| `/applications` | List of all applications with search/filter |
| `/applications/[id]` | Application details with status management |
| `/add` | Add new application form |

## 🪝 Custom Hooks

### `useApplications`
Manages application state with CRUD operations:
- `addApplication(app)`
- `updateApplicationStatus(id, status)`
- `deleteApplication(id)`

### `useFileUpload`
Handles PDF file uploads:
- `fileData` - Uploaded file data
- `handleFileChange(e)` - File input handler
- `clearFile()` - Reset file state

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Docker

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and not licensed for public use.

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and shadcn/ui
