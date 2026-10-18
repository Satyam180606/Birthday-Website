# 🎂 How to Customize Your Birthday Website

Congratulations! Your romantic digital scrapbook birthday website is completely built and ready.

---

## 📸 Step 1: Add Your Photos

Place your girlfriend's photos inside the folder:
`public/assets/`

Use the following filenames (or customize them in `src/data/loveStory.ts`):

| Filename | Where it appears |
| :--- | :--- |
| `birthday-hero.jpg` | Opening Hero section (The main birthday girl photo) |
| `birthday-portrait.jpg` | Section 2: "Happy Birthday" embossed greeting card |
| `memory-01.jpg` to `memory-06.jpg` | Section 1: "A Little World of Us" Scrapbook gallery |
| `reason-01.jpg` to `reason-06.jpg` | Section 3: "Reasons I Love You" 6 grid cards |
| `song-cover.jpg` | Section 4: Center sticker label on the vinyl record |
| `word-01.jpg` to `word-03.jpg` | Section 5: "Beautiful", "Kind", "Irreplaceable" cards |
| `letter-photo-01.jpg`, `letter-photo-02.jpg` | Section 6: Love Letter keepsake photos |
| `little-thing-01.jpg` to `little-thing-04.jpg` | Section 7: "The Little Things" mini polaroids |
| `final-photo.jpg` | Section 8: Emotional closing scene photo |

> **Tip:** If any photograph hasn't been added yet, the website automatically displays an illustrated, romantic placeholder frame with the exact filename needed, so the design never looks broken!

---

## 🎵 Step 2: Add Your Song

1. Copy your couple's favorite song into:
   `public/assets/our-song.mp3`
2. That's it! When you or she clicks **"Play Our Song"**:
   - The vinyl record will start rotating with realistic light sheen.
   - The turntable tonearm moves over the disc.
   - The equalizer bars dance in rhythm.
   - A mini floating player appears in the bottom right so the music continues as she scrolls through the love story!

---

## ✍️ Step 3: Edit Your Story & Messages

Everything is controlled in **one single file**:
`src/data/loveStory.ts`

You can change:
- **`herName`**: Your girlfriend's name (e.g. `"Sarah"`)
- **`myName`**: Your name (e.g. `"Satyam"`)
- **`birthdayDate`**: Her birthday date
- **Headings & Subheadings**: Change any title or quote
- **Captions & Dates**: Change each Polaroid caption
- **Love Letter Paragraphs**: Edit the letter with your sincere thoughts
- **Secret Final Message**: The message revealed when she clicks *"Read One More Message ♥"*
- **`objectPosition`**: Adjust photo crops (e.g., `"center 20%"` to focus higher up on faces)

---

## 🚀 Running the Website

- Development Server: `npm run dev` (Runs at `http://localhost:5173`)
- Production Build: `npm run build`
- Preview Build: `npm run preview`
