#### 1.structure of all orginizations
	Level
	|-- Board 
		|-- Cell ( CellOwner )
			|-- Item ( ItemOwner )
		|-- Birth
		|-- Death    // TODO
		|-- WornHole //TODO
	|-- Render

#### 2.classification of Cell
	Cell 										//interface of Cell layer 
	|-- CellEmpty
	|-- CellLand
	|-- CellWater

#### 3.classification of Item
	Item 										//interface of Item layer 
	|-- ItemAdapter
		|-- ItemEmpty
		|-- ItemDrink
		|-- ItemPinecone
		|-- ItemBoom
			|-- ItemFireWork
			|-- ItemGrenade
			|-- ItemDynamite
			|-- ItemTrotyl
		|-- ItemEliminate
			|-- ItemApple
			|-- ItemFlower
			|-- ItemWater
			|-- ItemLeaf
			|-- ItemBlueBerry
			|-- ItemPear
	





