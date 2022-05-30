document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var canvas3 = document.getElementById("myCanvas3");
var ctx3 = canvas3.getContext("2d");
var flags=0;
var WIDTH1 = canvas3.width;
var HEIGHT1 = canvas3.height;
var BALL_RADIUS1 = 30;
var PADDLE_WIDTH1 = 300;
var PADDLE_HEIGHT1 = 100;
var PADDLE_X1 = (WIDTH1 - PADDLE_WIDTH1) / 2;
var PADDLE_Y1 = HEIGHT1 - PADDLE_HEIGHT1 - 10;
var PADDLE_SPEED1 = 20;
var COLOR1 = "dodgerblue";
var socket;
var keys1 = { left: false, right: false, a :false, d:false };
var hockeystickimg = new Array();
var hockeybackgroundimg = new Image();
hockeybackgroundimg.src = 'image_src/hockey_background.jpg';
for (var i = 0; i < 2; i++) {
	hockeystickimg[i] = new Image();
}
hockeystickimg[0].src =  'image_src/파이리.png';
hockeystickimg[1].src =  'image_src/파이리.png';

hockeyballimg = new Image();
hockeyballimg.src = 'image_src/pokeball.png'; 

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        keys1.right = true;
        socket.emit('keyDown',(ch).toString()+'Right');
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        keys1.left = true;
        socket.emit('keyDown',(ch).toString()+'Left');
    }
    //space bar
    else if(e.keyCode == 65) {
        keys1.a = true;
        console.log("aaaaaaaaaaaa");
    }
    else if(e.keyCode == 68) {
        keys1.d = true;
        console.log("dddddddddd");
    }

}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        keys1.right = false;
        socket.emit('keyUp',(ch).toString()+'Right');
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        keys1.left = false;
        socket.emit('keyUp',(ch).toString()+'Left');
    }
	else if(e.keyCode == 65) {
        keys1.a = false;
        console.log("aaaaaaaaaaaa");
    }
    else if(e.keyCode == 68) {
        keys1.d = false;
        console.log("dddddddddd");
    }
}
class HockeyBall { 
  constructor(x, y, radius, speed, angle, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.setAngle(angle);
    this.color = color;
  }

  setAngle(angle) {
    var radian = angle / 180 * Math.PI;
    this.mx = this.speed * Math.cos(radian);
    this.my = this.speed * -Math.sin(radian);
  }

  move(k) {
  	console.log("move");
    this.x += this.mx * k;
    this.y += this.my * k;
  }

  get collideX() {
    if (this.mx > 0) return this.x + this.radius;
    else return this.x - this.radius;
  }

  get collideY() {
    if (this.my > 0) return this.y + this.radius;
    else return this.y - this.radius;
  }
 change_position_gage_wrapper(obj){
    var cx = $("#pageBox").offset().left;
    var cy = $("#pageBox").offset().top;
    cx = cx+100;
    cy = cy -34;
    obj.css({left: cx, top: cy});
    }
    collideWall(left, top, right,bottom) {
        if (this.mx < 0 && this.collideX < left) this.mx *= -1;
        if (this.mx > 0 && this.collideX > right) this.mx *= -1;
        if (this.my < 0 && this.collideY < top &&(this.collideX > WIDTH1/2 + 125 ||this.collideX < WIDTH1/2 - 125)) this.my *= -1;
        if (this.my > 0 && this.collideY > bottom &&(this.collideX > WIDTH1/2 + 125 ||this.collideX < WIDTH1/2 - 125)) this.my *= -1;
      }
  draw(ctx) {
    ctx3.drawImage(hockeyballimg, this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
    this.change_position_gage_wrapper($("#game2wrapper"));
   }
}

class HockeyPaddle {
  constructor(x, y, width, height, speed, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.halfWidth = width / 2;
    this.height = height;
    this.speed = speed;
    this.color = color;

  }

  get center() { return this.x + this.halfWidth; }

  moveLeft(wallLeft) {
    this.x -= this.speed;
    if (this.x < wallLeft) this.x = wallLeft;
  }

  moveRight(wallRight) {
    this.x += this.speed;
    if (this.x + this.width > wallRight) this.x = wallRight - this.width;
  }


  collide(ball) {
    var yCheck = () => this.y - ball.radius < ball.y && 
      ball.y < this.y + ball.radius;
    var xCheck = () => this.x < ball.x && ball.x < this.x + this.width;
    if (ball.my > 0 && yCheck() && xCheck()) {
      const hitPos = ball.x - this.center;
      var angle = 80 - (hitPos / this.halfWidth * 60); // 20 ~ 80
      if (hitPos < 0) angle += 20; // 100 ~ 160
      ball.setAngle(angle);
    }
  }
  collide2(ball) {
 	var yCheck = () => this.height < ball.y && 
      ball.y < this.height + ball.radius;
    var xCheck = () => this.x < ball.x && ball.x < this.x + this.width;
    if (ball.my < 0 && yCheck() && xCheck()) {
      const hitPos = ball.x - this.center;
      var angle = 80 - (hitPos / this.halfWidth * 60); // 20 ~ 80
      if (hitPos < 0) angle += 20; // 100 ~ 160
      ball.setAngle(-angle);
    }
  }


  draw(ctx){
    //var ballimg = new Image();
    
    ctx3.drawImage(hockeystickimg[0], this.x,this.y,300,100);
    //ctx.drawImage(paddleimg, this.x,this.y+this.PADDLE_HEIGHT1,10,10);
  }
}

class HockeyGame {

  constructor(no) {
    var diff; //공 속도
    var wid; //가로
    var hei; //세로
    var status = true;
    

    var ballSpeeds = [diff, 20];

    this.state = "start";
    this.timeCount = 0;
    this.paddle1 = new HockeyPaddle(PADDLE_X1, PADDLE_Y1, PADDLE_WIDTH1, PADDLE_HEIGHT1,PADDLE_SPEED1, COLOR1);
    this.paddle2 = new HockeyPaddle(PADDLE_X1, 0, PADDLE_WIDTH1, PADDLE_HEIGHT1,PADDLE_SPEED1, COLOR1);
    this.ball1 = new HockeyBall(ch%2==1?this.paddle1.center:this.paddle2.center, ch%2==1?PADDLE_Y1 - BALL_RADIUS1:110+BALL_RADIUS1, BALL_RADIUS1,10, ch%2==1?75:255, COLOR1);

  }

  update() {
    
  	if (this.ball1.y<0) {
        if(flag ==0){
            flag=1;
            cancelAnimationFrame(mainLoop2);
            showclearPage(1);
            $("#clearBtn").trigger("click");
            console.log("player1 win")};
        }
        
  	if (this.ball1.y > HEIGHT1) {
        if(flag==0){
            flag =1;
            cancelAnimationFrame(mainLoop2);
            showclearPage(0);
            $("#backtostoryBtn").trigger("click");
            console.log("player2 win");
        }
    }
    if (this.state == "start") {
      this.timeCount++;
    if (this.timeCount >= 100) this.state = "play";
      return ;
    }
    if (this.state != "play") return;
  	if($("#game2").css("display") == "block"){  
    	if (keys1.left) {this.paddle1.moveLeft(0);}
    	if (keys1.right) this.paddle1.moveRight(WIDTH1);
    	if (keys1.a) {this.paddle2.moveLeft(0);}
    	if (keys1.d) this.paddle2.moveRight(WIDTH1);
    }
    const DIV = 10;
    for (var i = 0; i < DIV; i++) {
      this.ball1.move(1 / DIV);
      this.ball1.collideWall(0, 0,WIDTH1,HEIGHT1);    
      this.paddle1.collide(this.ball1);
      this.paddle2.collide2(this.ball1);      
      }
  }

  draw() {

    ctx3.clearRect(0, 0, WIDTH1, HEIGHT1);  
    ctx3.drawImage(hockeybackgroundimg,0,0,WIDTH1,HEIGHT1);
    
    this.paddle1.draw(ctx3);
    this.paddle2.draw(ctx3);
    this.ball1.draw(ctx3);
  }
}

function mainLoop2() {
  requestAnimationFrame(mainLoop2);
  //console.log("aa");
   hockeygame.update();
   hockeygame.draw();
    
}
var ch =0;
var flag =0;
var temp =0;
function startGame2(no) {
    socket = io.connect('http://133.186.209.203:3000');
    
    socket.on('keyDown',function(data){
        if(ch%2==1){
            if(data[0]==(ch+1).toString()){
                console.log("keydown:"+data);
                var e  = jQuery.Event("keydown");
                if(data ==(ch+1).toString()+"Left") {e.which = 68;
                e.keyCode = 68;}
                if(data ==(ch+1).toString()+"Right") {e.which = 65;
                e.keyCode = 65;}
                keyDownHandler(e);
            }
        }
        else{
            if(data[0]==(ch-1).toString()){
                console.log("keydown:"+data);
                var e  = jQuery.Event("keydown");
                if(data ==(ch-1).toString()+"Left") {e.which = 68;
                e.keyCode = 68;}
                if(data ==(ch-1).toString()+"Right") {e.which = 65;
                e.keyCode = 65;}
                keyDownHandler(e);
            }
        }
        
        

    });
    socket.on('keyUp',function(data){
        if(ch%2==1){
            if(data[0]==(ch+1).toString()){
                console.log("keyup:"+data);
                var e  = jQuery.Event("keyup");
                if(data ==(ch+1).toString()+"Left") {e.which = 68;
                e.keyCode = 68;}
                if(data ==(ch+1).toString()+"Right") {e.which = 65;
                e.keyCode = 65;}
                keyUpHandler(e);
            }
        }
        else{
            if(data[0]==(ch-1).toString()){
                console.log("keyup:"+data);
                var e  = jQuery.Event("keyup");
                if(data ==(ch-1).toString()+"Left") {e.which = 68;
                e.keyCode = 68;}
                if(data ==(ch-1).toString()+"Right") {e.which = 65;
                e.keyCode = 65;}
                keyUpHandler(e);
            }
        }
        
    });

    socket.on('room',function(data){
        temp =data;
        if(flag==0){
            flag =1;
            ch = temp;
            
        }
        if(temp%2==0){
            hockeygame = new HockeyGame(0);
            canvas3.focus();
            mainLoop2();
        }
        
    });
    
    
  }

