# space-nomads
Space Nomads website. Static HTML and CSS, hosted on GitHub Pages.

## Branches
- `develop`: work in progress.
- `release`: the live site.

## Structure
| Path | Contents |
|---|---|
| `index.html` | Home: hero with screenshot carousel, pitch, features |
| `media.html` | Trailer and screenshots |
| `story.html` | In-universe timeline, 2369 to 2399 |
| `roadmap.html` | Development roadmap |
| `css/styles.css` | The only stylesheet, split into `#region` blocks |
| `js/lightbox.js` | Enlarges gallery screenshots |
| `js/carousel.js` | Arrows and auto-advance for the home page carousel |
| `js/effects.js` | Cursor glow on buttons and the background parallax |
| `res/images/` | Branding images and screenshots |

## Editing notes
- The header and footer are copied into every page. Change one, change all four.
- Colours, the type scale and the wishlist button gradients are variables at the top of `css/styles.css`.
- The Story and Roadmap pages share the same timeline markup (`era--event`, `era--period`).
- Screenshots live in `res/images/screenshots/` in two sizes: `NAME-small.jpg` (1280px, shown on the page) and `NAME.jpg` (2560px, opened in the lightbox). Add one by copying an existing `shot` line in the home carousel and the media grid.

## Previewing
Opening the HTML files directly works. To serve them locally instead:

```bash
python -m http.server 8123
```
