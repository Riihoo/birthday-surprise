🎵  MUSIC FOLDER
===============

romantic-song.mp3 is an original instrumental made just for this
site: soft piano and music box over a warm pad, in F major, about
2 min 46 s. Halfway through, a music box plays "Happy Birthday".
Every note was composed for this gift, and "Happy Birthday" is in the
public domain, so there are no copyright issues.

How it plays on the site:
• Music is OFF by default. It only starts when she taps the button
  in the top-right corner, because browsers block music that starts
  on its own.
• It fades in gently and loops.


USE YOUR OWN SONG INSTEAD
  Replace romantic-song.mp3 with your song, keeping the same name.
  Or keep your filename and change CONFIG.music at the top of
  script.js, e.g.   music: 'music/our-song.mp3',
  Only use a song you own or have the right to use.


REGENERATE / TWEAK THE ORIGINAL SONG (optional, for the curious)
  compose.js is the program that wrote the song. With Node.js and
  ffmpeg installed, run these two commands in this folder:

    node compose.js song.f32
    ffmpeg -f f32le -ar 44100 -ac 2 -i song.f32 -af loudnorm=I=-17:TP=-1.5 -c:a libmp3lame -b:a 192k romantic-song.mp3

  Change BPM near the top to make it faster or slower. Then delete
  song.f32, which is a large temporary file.
