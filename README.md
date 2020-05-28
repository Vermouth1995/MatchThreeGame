### 🎲Match-Three-Game
A tile-matching video game.

### 🔨Debug

- run `npm i`
- run `npm run build`
- open html file(`/dist/main/html`) in browser

### ✨Code Foramt

- run `npm run format`

### 🔖Directory Structure

> concept -- 基本工具类

	concept
	├─ event
	├─ linked_list
	├─ listener
	├─ once
	├─ color
	├─ coordinate
	├─ font
	├─ locus
	└─ random_weight

> engine -- 游戏引擎

	engine
	├─ birth
	├─ board
	├─ cell
	├─ goal
	├─ item
	├─ sacrifice
	├─ puzzle_keeper
	└─ score

> game -- 游戏逻辑

	game
	├─ game
	├─ level_creator
	├─ level_date
	├─ level
	└─ message

> level -- 关卡

	level
	├─ 1
	├─ 2
	├─ 3
	└─ ...

> main -- 项目入口

	main
	└─ html

> platform -- 渲染方式

	platform
	└─ canvas

> render -- 图像渲染

	render
	├─ atom
	├─ puzzle
	├─ render_adapter
	├─ render_locus
	├─ render_position
	└─ render

> resource -- 游戏资源
