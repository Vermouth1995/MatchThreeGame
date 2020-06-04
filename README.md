<h1 align="center">Match Three Game</h1>

<div align="center">
A match three game.<br /><br />

[![Build Status](https://img.shields.io/travis/Vermouth1995/MatchThreeGame)](https://travis-ci.org/github/Vermouth1995/MatchThreeGame)
[![GitHub](https://img.shields.io/github/license/vermouth1995/MatchThreeGame?color=blue)](https://github.com/Vermouth1995/MatchThreeGame/blob/master/LICENSE)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Vermouth1995/MatchThreeGame?color=orange)

</div>

English | [简体中文](./README_CN.md)

### 🎮 Game online

[https://vermouth1995.github.io/MatchThreeGame/](https://vermouth1995.github.io/MatchThreeGame/)

### ✨ Features

- 🎀 Beautiful page, smooth game experience.
- 🌼 Written in TypeScript with predictable static types.
- 🏅 Multiple rendering methods support capability.
- ⚙️ Compile with gulp, full link development.
- 🏆 Powerful level customization in every detail.
- 🤳 Support for mobile terminal.

### 🔨 Debug

- run `npm i`
- run `npm run build`
- open html file(`/dist/index.html`) in browser

### 💅 Code Foramt

- run `npm run format`

### 🔖 Directory Structure

> concept -- Basic tools (tool concept class content)

	concept
	├─ event                              -- Record movement events
	├─ linked_list                        -- Linked list
	├─ listener                           -- Listening tools to manage listening events
	├─ once                               -- Manages the invocation of a series of callback functions
	├─ style                              -- Style classes, such as colors, fonts, and so on
	├─ coordinate                         -- Coordinate and coordinate operation
	├─ locus                              -- Record the moving state and coordinate track
	└─ random_weight                      -- Random access with weights

> engine -- Game engine (core elements and concepts in game)

	engine
	├─ birth                              -- The generation of eliminable elements
	├─ board                              -- Game board
	├─ cell                               -- Game cell
	├─ goal                               -- Game goal
	├─ item                               -- Eliminated elements
	├─ sacrifice                          -- Rule of elimination
	├─ puzzle_keeper                      -- The object that holds the real rendering block
	└─ score                              -- Game steps/Score management

> game -- Game logic (including score calculation, relationship between levels, etc.)

	game
	├─ game                               -- Instance of game logic
	├─ level_creator                      -- Level generator
	├─ level_data                         -- Level data interface
	├─ level                              -- Level implementation
	└─ message                            -- Message

> level -- Level (level content setting)

	level
	├─ 1                                  -- Level 1
	├─ 2                                  -- Level 2
	├─ 3                                  -- Level 3
	└─ ...                                -- Level ...

> main -- Project entrance

	main
	├─ resource                           -- Game resources
	└─ index                              -- Entrance

> platform -- Rendering platform

	platform
	├─ canvas                             -- canvas
	└─ webgl                              -- webgl

> render -- Image rendering

	render
	├─ atom                               -- Minimum render unit
	├─ puzzle                             -- Real rendering block
	├─ render_adapter                     -- Render adapter
	├─ render_locus                       -- Trace nodes of the rendering tree
	├─ render_position                    -- Nodes of the rendering tree
	└─ render                             -- Render interface

### 🚧 TODO List

- [ ] rerender when window onResize
- [ ] onTouch realization
- [ ] Level selection function
- [ ] An element that eliminates all elements of the same kind
- [ ] Style optimization

### 👩‍💻 Maintainer

- [@Vermouth1995](https://github.com/Vermouth1995)

### 🤝 Contributors

- [@TingerSure](https://github.com/TingerSure)
- [@Vermouth1995](https://github.com/Vermouth1995)

### ⏰ License

[MIT](LICENSE) © Vermouth1995
