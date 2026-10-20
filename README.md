# Happy Birthday, My Love ❤️

A romantic, interactive birthday surprise website. Plain HTML, CSS and JavaScript, with no installs and no server needed.

## ▶️ How to run it

Double-click **`index.html`**. It opens in your browser and works offline. (The fancy fonts load from Google Fonts when online. Without internet, similar fonts are used instead.)

**To send it to her:** the site is live on Vercel at **https://birthday-surprise-web22.vercel.app/**. Every push to GitHub redeploys it automatically.

> ⚠️ Make sure Vercel's **Deployment Protection is off**, or visitors (and link-preview bots) get a Vercel login page instead of the site: Vercel → project → **Settings → Deployment Protection** → **Vercel Authentication: Disabled** → **Save**.

## 💌 The experience

1. **Entrance**: a glowing pink screen with floating hearts and an envelope. Tapping *Open Your Surprise 💌* opens the envelope and reveals the site.
2. **Celebration**: glowing headline, your message, balloons, confetti, and a cake whose candles she taps to blow out after making a wish.
3. **Our Memories**: scrapbook polaroid gallery with captions. Tap a photo for a full-screen viewer (arrows, keyboard and swipe all work).
4. **Our Love Story**: an animated timeline. The line draws itself as she scrolls, and the last milestone shows today's date automatically.
5. **The Letter**: cream paper; your letter writes itself in handwriting when she scrolls to it.
6. **The Gift**: a wiggling gift box. Tapping it bursts it open with hearts and confetti and reveals your final message.
7. **Finale**: a night sky with stars, a moon, shooting stars and your photo, plus *Replay Our Surprise ✨*.

## ✏️ How to personalize it

**Almost everything is in one place: the `CONFIG` block at the top of `script.js`.** Open it in any text editor (Notepad works, VS Code is nicer).

| What | Where in `CONFIG` |
|---|---|
| Your name (letter signature + ending) | `yourName: 'Alee'` |
| Her name (opening screen + celebration) | `herName: 'Neth'` |
| Photos & captions | `photos: [ ... ]` |
| Round photo on the final screen | `finalePhoto` |
| Timeline dates & stories | `timeline: [ ... ]`: replace each `date` with the real one, e.g. `'March 14, 2023'` |
| The love letter | `letter: \` ... \``: write between the backticks; blank lines = new paragraphs |
| Letter typing speed | `typingSpeed` (lower = faster) |
| Message inside the gift | `finalWish` |
| Song file | `music` |

Headlines that appear only once (e.g. *"Happy Birthday, My Love! 🎂❤️"*, the celebration message, *"Happy Birthday, My Princess ❤️"*) are plain text in **`index.html`**. Search for the sentence and edit it.

> ⚠️ When editing text inside `'single quotes'`, use a curly apostrophe `’` (or `\'`) for words like *don't*. A plain `'` would end the text early. Inside the letter's backticks you can type anything except a backtick.

### Photos
Your 15 photos are already wired up. See [`images/README.txt`](images/README.txt) to add, remove, reorder or rename them. The layout adapts to any number, and missing photos are skipped automatically.

### Link preview (the picture that appears when you send the link)
When you paste the site's link into WhatsApp, Messenger, Telegram, iMessage etc., it shows `og-images/og-image.jpg`: *"Happy Birthday My Love, Neth"* over the sunset. It's a 1200×630 copy of your original `og-images.png`, made small enough for WhatsApp.

The preview tags at the top of `index.html` point to **https://birthday-surprise-web22.vercel.app/**. If you move the site elsewhere, replace that address in the 4 marked lines.

### Music
`music/romantic-song.mp3` is an **original instrumental composed for this site**: soft piano and music box with a music-box *Happy Birthday* in the middle (2:46, loops). It **starts automatically**. Browsers only allow sound after a tap, so it fades in the moment she taps *Open Your Surprise 💌*. She can pause it with the 🎵 button. Set `autoPlayMusic: false` in `CONFIG` to make it wait for the button instead. To use your own song instead, replace that file. See [`music/README.txt`](music/README.txt).

## 📁 Files

```
Birthday/
├── index.html      ← page structure & one-off headlines
├── style.css       ← all the design & animations
├── script.js       ← CONFIG (your content) + interactions
├── images/         ← your photos (+ README.txt)
├── music/          ← your song   (+ README.txt)
└── README.md
```

## 💡 Before you send it

- [x] Set the names (Alee & Neth) in `script.js`
- [ ] Replaced the timeline dates/stories with your real ones
- [ ] Read the letter and made it sound like *you*
- [ ] Listened to the music (or swapped in your own song)
- [ ] Opened it on your phone and tapped through everything once

Works in all modern browsers (Chrome, Safari, Edge, Firefox) on phone, tablet and desktop. Animations are lighter for anyone who has "reduce motion" turned on.
