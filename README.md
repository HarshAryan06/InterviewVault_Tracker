# Job Tracker

A job application tracker that doesn't suck. Built because I got tired of losing track of all the companies I've applied to.

## What it does

Track your job applications without needing to log in, pay for premium features, or give away your email. Everything stays in your browser.

### Main features:
- **Add applications** - Company name, role, location, resume you used, etc.
- **Track status** - Applied → Interview → Offer (or Rejected/Ghosted, let's be real)
- **See your stats** - How many interviews you're getting, response rates, all that
- **Search everything** - Find that one company you applied to 2 months ago
- **Dark mode** - Because why not

## Tech stuff

- Next.js 16 + React 19
- TypeScript (so you know things won't randomly break)
- Tailwind CSS v4
- Everything stored in localStorage (no backend needed)

## Setup

```bash
# Clone it
git clone https://github.com/HarshAryan06/Job_Tracker_application.git
cd Job_Tracker_application

# Install stuff
npm install

# Run it
npm run dev
```

Open http://localhost:3000 and you're good to go.

## How to use

1. Click "Add Application"
2. Fill in the details (company, role, etc.)
3. Optionally upload your resume PDF
4. Hit save

That's it. Your data stays in your browser, no accounts needed.

## Why I built this

Keeping track of job applications in a spreadsheet is annoying. Other trackers want you to sign up or pay. I just wanted something simple that works.

## Running in production

```bash
npm run build
npm start
```

Deploy it anywhere that hosts Next.js - Vercel, Netlify, wherever.

## Things to know

- Data only lives in your browser (clear your cache = lose your data)
- No cloud sync between devices
- Works offline after first load
- Mobile friendly

## Future stuff I might add

- Export/import data as JSON
- Calendar view
- Email reminders
- Better analytics

Or maybe not. We'll see.

## Contributing

Feel free to fork it and make it your own. PRs welcome if you want to add something cool.

## License

Do whatever you want with it. It's just a job tracker.

---

Built by [Harsh Aryan](https://github.com/HarshAryan06) because job hunting is hard enough without losing track of everything.
