<h1 align="center">Match Three Game</h1>

<div align="center">
一个使用 canvas 绘制，TypeScript 实现的消除游戏。<br /><br />

[![Build Status](https://img.shields.io/travis/Vermouth1995/MatchThreeGame)](https://travis-ci.org/github/Vermouth1995/MatchThreeGame)
[![GitHub](https://img.shields.io/github/license/vermouth1995/MatchThreeGame?color=blue)](https://github.com/Vermouth1995/MatchThreeGame/blob/master/LICENSE)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Vermouth1995/MatchThreeGame?color=orange)

</div>

[English](./README.md) | 简体中文

### 🎮 在线试玩

[https://vermouth1995.github.io/MatchThreeGame/](https://vermouth1995.github.io/MatchThreeGame/)

### ✨ 特性

- 🎀 美观的页面，丝滑流畅的游戏体验。
- 🌼 使用```TypeScript```开发，提供完整的类型定义文件。
- 🏅 多种渲染方式支持能力。
- ⚙️ 使用```gulp```打包编译。
- 🏆 深入每个细节的关卡定制能力。
- 🤳 支持移动端。

### 🔨 本地调试

- 执行 `npm i`
- 执行 `npm run build`
- 在浏览器中打开`html`文件(`/dist/index.html`)

### 💅 代码格式化

- 执行 `npm run format`

### 🔖 文件目录

> concept -- 基本工具（工具概念类内容）

	concept
	├─ event                              -- 记录运动事件
	├─ linked_list                        -- 单链表
	├─ listener                           -- 监听工具，管理监听事件
	├─ once                               -- 管理一系列的callback函数调用
	├─ style                              -- 样式类，比如颜色，字体等
	├─ coordinate                         -- 坐标及对坐标的操作
	├─ locus                              -- 记录移动状态及坐标轨迹
	└─ random_weight                      -- 带权随机存取

> engine -- 游戏引擎（游戏核心元素及概念）

	engine
	├─ birth                              -- 消除元素的生成
	├─ board                              -- 游戏面板
	├─ cell                               -- 游戏单元格
	├─ goal                               -- 游戏目标
	├─ item                               -- 消除元素
	├─ sacrifice                          -- 消除规则
	├─ puzzle_keeper                      -- 持有真实渲染块的对象，提供获取puzzle功能
	└─ score                              -- 游戏步数/分数管理

> game -- 游戏逻辑（包括分值计算，关卡递进关系等）

	game
	├─ game                               -- 游戏逻辑实例
	├─ level_creator                      -- 关卡生成器
	├─ level_data                         -- 关卡数据接口
	├─ level                              -- 关卡实现
	└─ message                            -- 消息

> level -- 关卡（关卡内容设置）

	level
	├─ 1                                  -- 关卡1
	├─ 2                                  -- 关卡2
	├─ 3                                  -- 关卡3
	└─ ...                                -- 关卡...

> main -- 项目入口

	main
	├─ resource                           -- 游戏资源
	└─ index                              -- 入口

> platform -- 渲染方式

	platform
	├─ canvas                             -- canvas渲染
	└─ webgl                              -- webgl渲染

> render -- 图像渲染

	render
	├─ atom                               -- 最小渲染单元
	├─ puzzle                             -- 真实渲染的块
	├─ render_adapter                     -- 渲染适配
	├─ render_locus                       -- 渲染树的轨迹节点
	├─ render_position                    -- 渲染树的节点
	└─ render                             -- 渲染接口

### 🚧 待办

- [ ] window onResize 时重新渲染
- [x] 移动端的 onTouch 事件
- [ ] 关卡选择功能
- [ ] 消除全部同类元素的一种元素
- [ ] 样式优化

### 👩‍💻 维护者

- [@Vermouth1995](https://github.com/Vermouth1995)

### 🤝 贡献者

- [@TingerSure](https://github.com/TingerSure)
- [@Vermouth1995](https://github.com/Vermouth1995)

### ⏰ 使用许可

[MIT](LICENSE) © Vermouth1995
