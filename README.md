# Dexter's Lab

A side-scrolling platformer built with **p5.js**, inspired by the cartoon *Dexter's Laboratory*. Guide Dexter through his lab: collect flasks, jump across platforms, dodge evil robots, avoid the canyons and reach the **POWER** zone to complete the level.

Built as the final project for an Introduction to Programming I course.

## Features

- **Hand-drawn lab scenery**: laser guns, machines, monitors, a poison machine, wall wiring and lights, all drawn with p5.js shapes
- **Side-scrolling camera** that follows Dexter through the level
- **Collectable flasks** that add to your score
- **Platforms** to jump on, built with a constructor function
- **Enemies**: evil robots that patrol back and forth, built with a constructor function
- **Canyons**: falling in costs a life
- **Lives**: 3 batteries shown at the top-left
- **Sound**: the Dexter's Lab theme, plus jump, flask, canyon, level-complete and game-over effects

## Controls

| Key | Action |
|-----|--------|
| `←` Left arrow | Move left |
| `→` Right arrow | Move right |
| `↑` Up arrow | Jump |

You lose a battery when you touch an enemy or fall into a canyon. Lose all three and it's **Game Over**. Reach the **POWER** zone at the end of the level to win.

To play again after the game ends, refresh the page.

## Running the Game

The game loads sound files, so it has to be served over a local web server. Opening `index.html` directly from the file system won't work.

### Quick start (one command)

**Step 1:** Run this command in the terminal first. It downloads the project from GitHub into a temporary folder and starts a local web server:

```bash
D=$(mktemp -d) && gh repo clone Alizea2/Dexters-Lab "$D" && cd "$D" && python3 -m http.server 8000
```

**Step 2:** Once the terminal shows `Serving HTTP on ... port 8000`, click this link to open the game in your browser:

**<http://localhost:8000>**

Keep the terminal open while you play. When you're done, press `Ctrl + C` in the terminal to stop the server.

> This needs the [GitHub CLI](https://cli.github.com/) (`gh`) signed in to an account that can access this repository, and Python 3.
>
> Browsers block audio until you interact with the page, so click the game once if the music doesn't start.

### Other ways to run it

From inside the project folder:

**VS Code:** install the *Live Server* extension, right-click `index.html`, and choose **Open with Live Server**.

**Python:**

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Project Structure

| File | Purpose |
|------|---------|
| `index.html` | Loads p5.js, p5.sound and the game |
| `sketch.js` | The whole game: scenery, Dexter, movement, collectables, canyons, platforms, enemies, lives and sound |
| `assets/` | Music and sound effects |
| `p5.min.js`, `p5.sound.min.js` | p5.js libraries |

## Credits

- Background gradient technique: [W3Schools – Canvas Gradients](https://www.w3schools.com/graphics/canvas_gradients.asp)
- Sounds: [Voicy](https://www.voicy.network/search/dexter-sound-effects), [Pixabay](https://pixabay.com/sound-effects/search/life/), [101 Soundboards](https://www.101soundboards.com/search/dexter:%20bye)
- *Dexter's Laboratory* is a Cartoon Network show; this is a fan-made student project.

## Author

Alizea Bakhtawar ([@Alizea2](https://github.com/Alizea2))
