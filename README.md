### 🍻 Match-Three-Game
A match three game.

### 🎲 Game online
[https://vermouth1995.github.io/MatchThreeGame/](https://vermouth1995.github.io/MatchThreeGame/)

### 🔨 Debug

- run `npm i`
- run `npm run build`
- open html file(`/dist/main/html/MatchThreeGame.html`) in browser

### ✨ Code Foramt

- run `npm run format`

### 🔖 Directory Structure

> concept -- 基本工具（工具概念类内容）

	concept
	├─ event                              -- 记录运动事件
	├─ linked_list                        -- 单链表
	├─ listener                           -- 监听
	├─ once
	├─ style                              -- 样式类，比如颜色，字体等
	├─ coordinate                         -- 坐标及对坐标的操作
	├─ locus
	└─ random_weight

> engine -- 游戏引擎（游戏核心元素及概念）

	engine
	├─ birth
	├─ board
	├─ cell
	├─ goal
	├─ item
	├─ sacrifice
	├─ puzzle_keeper
	└─ score

> game -- 游戏逻辑（包括分值计算，关卡递进关系等）

	game
	├─ game
	├─ level_creator
	├─ level_date
	├─ level
	└─ message

> level -- 关卡（关卡内容设置）

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
