📸  PHOTOS FOLDER
================

Your 13 photos are already here and already connected to the website:

  images-couple1.JPG   image1.jpg ... image11.jpg   image-couple2.JPG

The list of photos (and their captions) lives at the top of script.js,
in CONFIG.photos. Each entry looks like this:

  { src: 'images/image3.jpg', caption: 'My favorite person, always.' },


TO ADD A PHOTO
  1. Copy it into this folder (e.g. image12.jpg).
  2. Add a line for it in CONFIG.photos in script.js.

TO REMOVE A PHOTO
  Delete its line from CONFIG.photos (or just delete the file. Missing
  photos are skipped automatically, so nothing breaks).

TO REORDER
  Move the lines up or down in CONFIG.photos.


PREFER SIMPLE NUMBERED NAMES?
  Rename your files photo1.jpg, photo2.jpg … photo15.jpg and change
  CONFIG.photos to an empty list:   photos: [],
  The site will then find photo1.jpg–photo15.jpg by itself and show
  whichever exist (10 photos works perfectly, so does 15).


TIPS
  • Filenames must match exactly, including .jpg vs .JPG.
  • Photos larger than ~2 MB load slowly on phones. Resizing them to
    about 1600 px on the long side keeps everything smooth.
  • The round photo on the final screen is CONFIG.finalePhoto.
