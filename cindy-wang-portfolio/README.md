# Cindy Wang — Artist Portfolio

A minimal, two-column artist portfolio for free GitHub Pages hosting. No dependencies, build step, or paid services.

## Publish
1. Create a free account at github.com if needed.
2. Create a **public** repository called `yourusername.github.io` (replace `yourusername` with your actual GitHub username).
3. Upload the contents of this folder (not the enclosing folder) into the repository's root using **Add file → Upload files** and commit.
4. In **Settings → Pages**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, and save.
5. Visit `https://yourusername.github.io/` after deployment completes.

## Update artwork
1. Upload optimized JPG or WebP images into `images/` (ideally around 1600–2200 pixels on the longest side).
2. Edit the `artworks` array near the top of `script.js`. Each entry has `title`, `year`, `medium`, and `image`.
3. Delete the example entries and placeholder SVGs when you have real work to show.
4. Edit the About, CV, and Contact text in `script.js` inside the `render()` function. Do not publish private contact details.

## Notes
- All images are shown uncropped. The columns are equal-width, but artwork height follows each image's natural aspect ratio.
- The gallery changes to one column on mobile.
- Clicking an artwork opens an enlarged viewer with arrow-key navigation.
- Hosting is free on GitHub Pages for public repositories. A custom domain is optional and costs extra.
