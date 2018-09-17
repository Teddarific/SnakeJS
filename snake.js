/*
 * SnakeJS Class
 */
class SnakeJS {
  constructor(canvas){
    // GAME OPTIONS
    this.SCALE = 20;
    this.SPEED = 140;
    this.BACKGROUND_COLOR = 'black';
    this.SNAKE_COLOR = 'white';
    this.FOOD_COLOR = null; // null for random colors

    // CANVAS PROPERTIES
    this.ctx = canvas.getContext('2d');
    // adjust canvas to our desired ratios
    this.width = canvas.width - canvas.width % this.SCALE;
    this.height = canvas.height - canvas.height % this.SCALE;
    if ( this.width < 400 || this.height < 400 ){
      console.log('WARNING: SnakeJS recommends a canvas size of at least 400px by 400px');
    }

    canvas.width = this.width;
    canvas.height = this.height;

    // Snake Game
    this.score = 0;
    this.gameStarted = false;

    this.deltaX = 1;
    this.deltaY = 0;
    this.length = null;
    this.positions = [];

    this.food = null;
    this.foodColor = null;

    this.initBoard();
  }

  initBoard(){
    // Initialize board, and add event listeners
    this.ctx.fillStyle = this.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.font = '50px Helvetica';
    this.ctx.fillStyle = this.SNAKE_COLOR;
    this.ctx.fillText('SnakeJS', this.width / 4, this.height / 3);
    this.ctx.font = '30px Helvetica';
    this.ctx.fillText('Press enter to play!', this.width / 4, this.height / 2);

    document.addEventListener('keydown', event => this.registerKey(event));
  }

  registerKey(event){
    switch(event.keyCode) {
      case 37:
        this.deltaX = -1, this.deltaY = 0;
        break;
      case 38:
        this.deltaX = 0, this.deltaY = -1;
        break;
      case 39:
        this.deltaX = 1, this.deltaY = 0;
        break;
      case 40:
        this.deltaX = 0, this.deltaY = 1;
        break;
      case 13:
        if ( !this.gameStarted ){
          this.initGame();
        }
    }
  }

  initGame(){
    this.gameStarted = true;

    this.generateFood();
    this.positions = [[2, 2], [2, 3], [2, 4]];

    this.deltaX = 1, this.deltaY = 0;

    this.gameInterval = setInterval(() => this.move(), this.SPEED);
  }

  move(){
    if ( !this.gameStarted ){
      this.gameOver();
      return;
    }
    const head = this.positions[0];
    const newX = head[0] + this.deltaX;
    const newY = head[1] + this.deltaY;

    this.positions.unshift([newX, newY])
    this.positions.pop();

    if ( !this.isValidPosition(newX, newY) ){
      this.gameOver();
      return;
    } else if ( this.food[0] == newX && this.food[1] == newY ){
      this.consumeFood();
    }

    this.renderSnake();
  }

  isValidPosition(newX, newY){
    // check bounds
    if ( newX < 0 || newX >= this.width / this.SCALE ){
      return false;
    }
    if ( newY < 0 || newY >= this.height / this.SCALE ){
      return false;
    }

    // ignore first one which was just inserted
    for( let i = 1; i < this.positions.length; i++ ){
      if ( this.positions[i][0] == newX && this.positions[i][1] == newY ){
        return false;
      }
    }

    return true;
  }

  renderSnake(){
    const GAP = 1;

    this.ctx.fillStyle = this.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.SNAKE_COLOR;

    this.positions.forEach((pos) => {
      this.ctx.fillRect(
        this.SCALE * pos[0] - GAP,
        this.SCALE * pos[1] - GAP,
        this.SCALE - 2 * GAP,
        this.SCALE - 2 * GAP
      );
    });

    // render food too
    this.ctx.fillStyle = this.foodColor;
    this.ctx.fillRect(
      this.SCALE * this.food[0] - GAP,
      this.SCALE * this.food[1] - GAP,
      this.SCALE - 2 * GAP,
      this.SCALE - 2 * GAP
    );
  }

  gameOver(){
    this.gameStarted = false;
    clearInterval(this.gameInterval);

    this.ctx.fillStyle = this.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.font = '50px Helvetica';
    this.ctx.fillStyle = this.SNAKE_COLOR;
    this.ctx.fillText('Game over!', this.width / 4, this.height / 4);
    this.ctx.font = '30px Helvetica';
    this.ctx.fillText(`Score: ${this.score}`, this.width / 4, this.height / 2.5)
    this.ctx.fillText('Press enter to play again!', this.width / 4, this.height / 2);
  }

  generateFood(){
    let foodX, foodY;

    do {
      foodX = Math.floor(Math.random() * this.width / this.SCALE);
      foodY = Math.floor(Math.random() * this.height / this.SCALE);
    } while ( !this.isValidPosition(foodX, foodY) );

    this.food = [foodX, foodY];

    const foodColors = ['green', 'blue', 'red', 'yellow', 'purple', 'cyan'];
    this.foodColor = this.FOOD_COLOR ?
      this.FOOD_COLOR :
      foodColors[Math.floor(Math.random() * foodColors .length)];
  }

  consumeFood(){
    // duplicate last item
    this.positions.push(this.positions[this.positions.length - 1]);
    this.score += 1;
    this.generateFood();
  }
}

// Initialize the game
function initSnake(){
  // Initialize game board display
  const canvas = document.getElementById('game-board');
  const snake = new SnakeJS(canvas);
}

initSnake();
