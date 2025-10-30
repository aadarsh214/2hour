# Animated Mobile Menu (React + Vite)

This project is a small React app that shows a modern, mobile‑first menu with smooth animations. It also looks good on desktop.

Think of it as the bottom sheet you see in mobile apps: tap a button, a rounded panel slides up with a list of items. You can drill into sub‑menus, go back, and close it by swiping down or tapping the background.

## What you get

- **Smooth animations** for opening, closing, and switching menus
- **Multi‑level menus** (e.g., Consulting → Technical Consulting → System Architecture)
- **Responsive** layout (mobile sheet, centered panel on desktop)
- **Accessible**: keyboard Esc to close, proper dialog roles, reduced‑motion support
- **External links**: items can open links (e.g., a GitHub repo) in a new tab

## How to run

1. Install dependencies
   - npm install
2. Start the dev server
   - npm run dev
3. Open the app
   - Visit the printed local URL (usually http://localhost:5173)

## Where the important files are

- src/components/MobileMenu.tsx
  - The main bottom‑sheet component (overlay, handle, swipe‑to‑close, navigation stack)
- src/components/menu/MenuList.tsx
  - Reusable, animated list used for every menu level
- src/components/menu/data.ts
  - All the menu items live here, including deep sub‑menus
- src/components/menu/types.ts
  - Type for a menu item

## Editing the menu

Open src/components/menu/data.ts.

- Each item has:
  - icon: a Lucide icon
  - title: main label
  - subtitle: smaller helper text
  - sub: optional array of child items (for sub‑menus)
  - href: optional link (opens in a new tab if provided)

Example:

```ts
{
  icon: Github,
  title: "GitHub",
  subtitle: "Project repository",
  href: "https://github.com/aadarsh214/2hour",
}
```

If an item has `sub`, tapping it opens the next level. If it has `href` and no `sub`, it opens the link.

## How the animations work

- We use Framer Motion.
- The sheet uses a spring slide‑up animation and supports **drag down to close**.
- The lists (MenuList) use **slide + stagger** for item fade/slide.
- If the OS has “Reduce Motion” enabled, animations are simplified automatically.

## Using the menu

- Click “Open Menu”
- Tap a row with a chevron to go deeper
- Tap “Back” to go up a level
- Tap the background, swipe down, or press Esc to close

## Desktop behavior

- On wider screens, the sheet is centered and slightly lifted from the bottom with rounded corners.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS (styles)
- Framer Motion (animations)
- Lucide React (icons)

## Notes

- You can rename items and add new sections by editing data.ts only—no code changes needed.
- To route to your app pages instead of external links, replace the `href` with your router action in `MenuList`.

Enjoy building!
