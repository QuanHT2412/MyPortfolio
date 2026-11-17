# Portfolio

Personal portfolio of Hoàng Thiện Quân, backend developer (C#, ASP.NET Core).

A single static page: hero, skills, projects, experience and contact.

## Stack

- Next.js (App Router, static export) with TypeScript
- Tailwind CSS
- Motion for UI animation, and a 2D canvas for the star field

## Development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

```bash
npm run build
```

writes the static site to `out/`.

## Editing content

All text, skills, projects, experience entries and links live in `src/data/site.ts`.

- Project screenshots go in `public/projects/` and are referenced by the `image` field.
- The downloadable CV is `public/HoangThienQuan_CV.pdf`; `cv/` keeps a copy of the same file.
- Colours are the variables at the top of `src/app/globals.css`.
