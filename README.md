# SnakeJS

###### A generic Javascript class that turns any HTML Canvas into the classic game of Snake

## Usage

Simply pass in an HTML Canvas element into the SnakeJS class. For example,

```
const canvas = document.getElementById('my-canvas');
new SnakeJS(canvas);
```

#### Options

There are several options you can play around with in the constructor of the game.

```this.SCALE // Default = 20``` sets the size of the blocks.

```this.SPEED // Default = 140``` sets the speed of the game.

```this.BACKGROUND_COLOR // Default = 'black'``` sets the background color of the canvas

```this.SNAKE_COLOR // Default = 'white'``` sets the color of the snake

```this.FOOD_COLOR // Default = null``` sets the color of the food. Set it as null for random colors.

#### Example

There's an example page included. To run it locally, in the top level directory, simply start a web server, and navigate to the file hosted on your localhost. For example,

```python -m SimpleHTTPServer 9000```

And visit ```localhost:9000/example.html```

## Behavior Notes
Because the game is tiled, the class will automatically adjust the size of the canvas to the correct proportions. The class will never make the canvas larger, but scale down if it needs to. You are also able to change the scale if need be.

If the game board is **too small**, the game will not work properly.

#### **We strongly recommend canvas dimensions of at least 400px by 400px.**

## Future Work

* Adding an optional border
* Making the canvas size detection smarter, and handles case of small canvases
* Leaderboard
* More aesthically pleasing