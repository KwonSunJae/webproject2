document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//이미지 전역변수
// 공
var check_if_level_clear = [];
for (var i = 0; i < 3; i++) {
  check_if_level_clear[i] = true;
}
var score = 0;
var score_total =0;
var enemy_idx =0;
var balling2 = new Image();
balling2.src = ball_selected;
var ballimg = new Array();
var completeimg = new Image();
completeimg.src = 'image_src/complete.jpeg';
var skillballimg = new Array();
var paddleimg = new Array();
var img = new Array();
var gage_img = new Array();
var backgroundimage = new Array();
var enemy_skill = new Array();
for (var i = 0; i < 3; i++) {
  ballimg[i] = new Image();
  skillballimg[i] = new Image();
  paddleimg[i] = new Image();
  img[i] = new Image();
  backgroundimage[i] = new Image();
  enemy_skill[i] = new Image();
}
for (var i = 0; i < 4; i++) {
  gage_img[i] = new Image();
}

enemy_skill[0].src = 'image_src/digda_skill_effect.png';
enemy_skill[1].src = 'image_src/ghost_skill_effect.png';

backgroundimage[0].src = 'image_src/ocean_background.png';
backgroundimage[1].src = 'image_src/cave_background.png';
backgroundimage[2].src = 'image_src/ghost_background.png';


ballimg[0].src = 'image_src/pokeball.png'; 
ballimg[1].src = 'image_src/하이퍼볼.webp';
ballimg[2].src = 'image_src/마스터볼.png';

skillballimg[0].src = 'image_src/fire_effect.png'; 
skillballimg[1].src = 'image_src/water_effect.png';
skillballimg[2].src = 'image_src/leaf_effect.png';

paddleimg[0].src = 'image_src/파이리.png';
paddleimg[1].src = 'image_src/꼬부기.png';
paddleimg[2].src = 'image_src/이상해씨.png';

img[0].src = 'image_src/잉어킹.webp';
img[1].src = 'image_src/디그다.webp';
img[2].src = 'image_src/팬텀.webp';


gage_img[0].src = 'image_src/gage_1.png';
gage_img[1].src = 'image_src/gage_2.png';
gage_img[2].src = 'image_src/gage_3.png';
gage_img[3].src = 'image_src/gage_4.png';

function max_open(event){
    var maxwindow = window.open(event.data.url,"",event.data.winattributes);
    maxwindow.moveTo(0,0);
    maxwindow.resizeTo(screen.availWidth,screen.availHeight);
  }

function startGame(no) {
  enemy_idx =0;
  skill_gage =0;
  life =3;
  game = new Game(no);
  canvas.focus();
}

var skill_mode1 = false;
var skill_mode2 = false;
var skill_mode3 = false;
var skill_gage =0;

var life =3;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var brick_mp = document.getElementById("brick_audio");
var fire_mp = document.getElementById("skill_audio_fire");
var water_mp = document.getElementById("skill_audio_water");
var leaf_mp = document.getElementById("skill_audio_leaf");

//var arr_sound = [document.getElementById("brick_audio"),document.getElementById("brick_audio")];



const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BALL_RADIUS = 30;
const PADDLE_WIDTH = 300;
const PADDLE_HEIGHT = 100;
const PADDLE_X = (WIDTH - PADDLE_WIDTH) / 2;
const PADDLE_Y = HEIGHT - PADDLE_HEIGHT - 10;
const PADDLE_SPEED = 20;
const COLOR = "dodgerblue";

class Ball { 
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

  collideWall(left, top, right) {
    if (this.mx < 0 && this.collideX < left) this.mx *= -1;
    if (this.mx > 0 && this.collideX > right) this.mx *= -1;
    if (this.my < 0 && this.collideY < top) this.my *= -1;
  }
  change_position_gage_wrapper(obj){
        var cx = $("#pageBox").offset().left;
        var cy = $("#pageBox").offset().top;
        cx = cx-9;
        cy = cy + 438;
        obj.css({left: cx, top: cy});
    }

  change_position_gage(obj){
        var cx = $("#pageBox").offset().left;
        var cy = $("#pageBox").offset().top;
        cx = cx;
        cy = cy + 438;
        obj.css({left: cx, top: cy});
    }

  change_position_life1(obj){
        
        var cx = $("#pageBox").offset().left;
        var cy = $("#pageBox").offset().top;
        cx = cx + 660;
        cy = cy + 442;
        obj.css({left: cx, top: cy});
    }

  change_position_life2(obj){
        
        var cx = $("#pageBox").offset().left;
        var cy = $("#pageBox").offset().top;
        cx = cx + 620;
        cy = cy + 442;
        obj.css({left: cx, top: cy});
    }

  change_position_life3(obj){
        
        var cx = $("#pageBox").offset().left;
        var cy = $("#pageBox").offset().top;
        cx = cx + 580;
        cy = cy + 442;
        obj.css({left: cx, top: cy});
    }

  draw(ctx) {
    //ctx.drawImage(ballimg[difficulty-1], this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
    ctx.drawImage(balling2, this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
        this.change_position_gage_wrapper($("#wrapper_gage"));
        this.change_position_gage($("#gage0"));
        this.change_position_gage($("#gage05"));
        this.change_position_gage($("#gage1"));
        this.change_position_gage($("#gage2"));
        this.change_position_gage($("#gage3"));
        this.change_position_gage($("#gage4"));
        this.change_position_life1($("#life1"));
        this.change_position_life2($("#life2"));
        this.change_position_life3($("#life3"));
  }
}
class Skill_Ball { 
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

  collideWall(left, top, right) {
    if (this.mx < 0 && this.collideX < left) this.mx *= -1;
    if (this.mx > 0 && this.collideX > right) this.mx *= -1;
    if (this.my < 0 && this.collideY < top) this.my *= -1;
  }

  draw(ctx) {
   // ctx.beginPath();
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    //ctx.fillStyle = this.color;
    //ctx.fill();
    //ctx.closePath();
    
    //ctx.drawImage(ballimg, 0,0,300,300);
    ctx.drawImage(skillballimg[ch_choose-1], this.x+this.radius,this.y-this.radius,this.radius*2,this.radius*2);
  }
}

class Enemy_Skill_Ball { 
  constructor(x, y, radius, speed, angle, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.setAngle(angle);
    this.color = color;
    this.check = true;
  }

  setAngle(angle) {
    var radian = angle / 180 * Math.PI;
    this.mx = this.speed * Math.cos(radian);
    this.my = this.speed * -Math.sin(radian);
  }

  move(k) {
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

  collideWall(left, top, right) {
    if (this.mx < 0 && this.collideX < left) this.mx *= -1;
    if (this.mx > 0 && this.collideX > right) this.mx *= -1;
    if (this.my < 0 && this.collideY < top) this.my *= -1;
  }

  draw(ctx) { 
    ctx.drawImage(enemy_skill[difficulty-2], this.x+this.radius,this.y-this.radius,this.radius*2,this.radius*2);
  }
}
class Paddle {
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
      if(skill_gage<5){skill_gage++;}
      
      ball.setAngle(angle);
    }
  }
  collide2(ball) {
 
    var yCheck = () => this.y - ball.radius < ball.y && 
      ball.y < this.y + ball.radius;
    var xCheck = () => this.x < ball.x && ball.x < this.x + this.width;
    if (ball.my > 0 && yCheck() && xCheck()) {
       return true;
      }   
    else return false;
  }

  draw(ctx) {
    
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    

  }
  draw2(ctx){
    //var ballimg = new Image();
    
    ctx.drawImage(paddleimg[ch_choose-1], this.x,this.y,300,100);
    //ctx.drawImage(paddleimg, this.x,this.y+this.PADDLE_HEIGHT,10,10);
  }
}

class Bricks {
  constructor(rows, cols, x, y, width, height, color) {
    this.rows = rows;
    this.cols = cols;
    this.x = x;
    this.y = 10;
    this.width = width;
    this.height = height;
    this.brickWidth = width / cols ;
    this.brickHeight = height / rows*2.3;
    this.count = rows * cols;
    this.color = color;
    this.data = [];
    for (var i = 0; i < rows; i++) {
      var line = new Array(cols);
      line.fill(1);
      this.data.push(line);
    }
  }

  collide(x, y) {
    var row = Math.floor((y - this.y) / this.brickHeight);
    var col = Math.floor((x - this.x) / this.brickWidth);
    if (row < 0 || row >= this.rows) return false;
    if (col < 0 || col >= this.cols) return false;
    if (this.data[row][col]) {
      this.data[row][col] = 0;
      this.count--;
      score = score + 100;
      var intext = "Score : "+score;
      $("#score_restart_p").html(intext);
      return true;
    }
    else return false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "lightgray";
    for (var r = 0; r < this.rows; r++) {
      for (var c = 0; c < this.cols; c++) {
        if (!this.data[r][c]) continue;
        var x = this.x + (this.brickWidth * c);
        var y = this.y + (this.brickHeight * r);
        //ctx.beginPath();
        //ctx.fillRect(x, y, this.brickWidth, this.brickHeight);
        //ctx.strokeRect(x, y, this.brickWidth, this.brickHeight);
        //ctx.closePath();
        ctx.drawImage(img[difficulty-1], x,y,this.brickWidth,this.brickHeight);
      }
    }
  }
}

var keys = { left: false, right: false, space :false };

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        keys.right = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        keys.left = true;
    }
    //space bar
    else if(e.keyCode == 32) {
        keys.space = true;
        console.log("spacedown");
    }

}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        keys.right = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        keys.left = false;
    }
     else if(e.keyCode == 32) {
        keys.space = false;
        console.log("spaceup");
    }
}
/*canvas.addEventListener("keydown", function(e) {
  if(e.key == "Left" || e.key == "ArrowLeft") {
        console.log('keydwon');
        left = true;
    }
  if(e.key == "Right" || e.key == "ArrowRight") {
        console.log('keydwon');
        right = true;
    }
  //if (ev.code != "F5") ev.preventDefault();
});

canvas.addEventListener("keyup", function(e) {
  if(e.key == "Left" || e.key == "ArrowLeft") {
        console.log('keydwon');
        left = false;
    }
  if(e.key == "Right" || e.key == "ArrowRight") {
        console.log('keydwon');
        right = false;
    }
  //if (ev.code != "F5") ev.preventDefault();
});*/

class Game {
  constructor(no) {
    var diff; //공 속도
    var wid; //가로
    var hei; //세로
    var status = true;
    if(difficulty ==1){ //난이도 조절 부분
      diff = 7;
      wid = 4;
      hei = 3;
    }else if(difficulty ==2){
      diff = 12;
      wid = 7;
      hei = 5;
    }else if(difficulty==3){
      diff = 17;
      wid = 8;
      hei = 5;
    }
    var ballSpeeds = [diff, 20];

    var brickSettings = [
      [hei, wid, 0, 50, WIDTH, 200, COLOR],
      [7, 10, 0, 50, WIDTH, 150, COLOR]
    ];
    this.state = "start";
    this.timeCount = 0;
    this.paddle = new Paddle(PADDLE_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,
      PADDLE_SPEED, COLOR);
    this.ball = new Ball(this.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,
      ballSpeeds[no], 75, COLOR);
    this.Skill_Ball1 = new Skill_Ball(this.paddle.x+this.paddle.PADDLE_WIDTH/2, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,15, 15, COLOR);
    this.Skill_Ball2 = new Skill_Ball(this.paddle.x+this.paddle.PADDLE_WIDTH/2, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,15, 75, COLOR);
    this.Skill_Ball3 = new Skill_Ball(this.paddle.x+this.paddle.PADDLE_WIDTH/2, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,15, 45, COLOR);
    this.bricks = new Bricks(...brickSettings[no]);
    this.Enemy_class =[];

  }

  update() {


    if (this.state == "start") {
      this.timeCount++;
    if (this.timeCount >= 100) this.state = "play";
      return ;
    }
    if (this.state != "play") return;
  if($("#gamePage").css("display") == "block"){  
    if (keys.left) {this.paddle.moveLeft(0);console.log("sss");}
    if (keys.right) this.paddle.moveRight(WIDTH);
    if (keys.space) {
      if(skill_gage==5){
        skill_mode1 = true;
        skill_mode2 = true;
        skill_mode3 = true;
         this.Skill_Ball1 = new Skill_Ball(this.paddle.x, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,15, 90, COLOR);
         this.Skill_Ball2 = new Skill_Ball(this.paddle.x, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,15, 45, COLOR);
         this.Skill_Ball3 = new Skill_Ball(this.paddle.x, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,15, 135, COLOR);
        } 
        use_skill();}
  }
    const DIV = 10;
    for (var i = 0; i < DIV; i++) {
      this.ball.move(1 / DIV);
      this.ball.collideWall(0, 0, WIDTH); 
      if (skill_mode1) {this.Skill_Ball1.move(1 / DIV);}
      if (skill_mode1) {this.Skill_Ball1.collideWall(0, 0, WIDTH);}
      if (skill_mode2) {this.Skill_Ball2.move(1 / DIV);}
      if (skill_mode2) {this.Skill_Ball2.collideWall(0, 0, WIDTH);}
      if (skill_mode3) {this.Skill_Ball3.move(1 / DIV);}
      if (skill_mode3) {this.Skill_Ball3.collideWall(0, 0, WIDTH);}
      for (var jc = 0; jc < enemy_idx; jc++){
          this.Enemy_class[jc].move(1 / DIV);     
      }    
      this.paddle.collide(this.ball);
      for (var jc = 0; jc < enemy_idx; jc++){
          if (this.paddle.collide2(this.Enemy_class[jc])) { 
             if (this.Enemy_class[jc].check) {
              life--;
              if (difficulty==2) {if (audio_cond) {document.getElementById("enemy_skill_audio1").play();}}
              if (difficulty==3) {if (audio_cond) {document.getElementById("enemy_skill_audio2").play();}}
              if (difficulty==3) {$("#myCanvas").fadeOut(1000).fadeIn(1000);}
              if (life<=0) {
                this.state = "end";
              }
            
              
            }
           this.Enemy_class[jc].check = false;
            console.log("colide");
            // if (difficulty==3) {
              //  if(status_change(1500)>Date.now())
                //  status = false;
            //  }
          }  

      }  
      if (this.bricks.collide(this.ball.collideX, this.ball.y)) {
       
        this.ball.mx *= -1; /*brick_mp.play();*/

        if(difficulty==2||difficulty==3){
          if(makeRand(difficulty*2)){
           
           this.Enemy_class[enemy_idx] = new Enemy_Skill_Ball(this.ball.x, this.ball.y - BALL_RADIUS, BALL_RADIUS,5, -90, COLOR);
            enemy_idx++;
            }
        }
        for(let i = 0; i < arr_sound.length; i++){
          if(arr_sound[i].paused){ 
            if (audio_cond) {
               arr_sound[i].play(); 
                break; 
              }     
              }
          }
        }
      if (this.bricks.collide(this.ball.x, this.ball.collideY)) {this.ball.my *= -1; /*brick_mp.play();*/
         if(difficulty==2||difficulty==3){
          if(makeRand(difficulty*2)){
           this.Enemy_class[enemy_idx] = new Enemy_Skill_Ball(this.ball.x, this.ball.y - BALL_RADIUS, BALL_RADIUS,5, -90, COLOR);
            enemy_idx++;
            }
        }
      for(let i = 0; i < arr_sound.length; i++){
        if(arr_sound[i].paused){ 
            if (audio_cond) {
               arr_sound[i].play(); 
                break; 
              }    
        }
    }
}
      if (this.bricks.collide(this.Skill_Ball1.collideX, this.Skill_Ball1.y)) {this.Skill_Ball1.mx *= -1; skill_mode1 = false; 
         if(difficulty==2||difficulty==3){
          if(makeRand(difficulty*2)){
           this.Enemy_class[enemy_idx] = new Enemy_Skill_Ball(this.Skill_Ball1.x, this.Skill_Ball1.y - BALL_RADIUS, BALL_RADIUS,5, -90, COLOR);
            enemy_idx++;
            }
        }
        for(let i = 0; i < arr_sound.length; i++){
        if(arr_sound[i].paused){ 
            if (audio_cond) {
               arr_sound[i].play(); 
                break; 
              }    
        }
    }}
      if (this.bricks.collide(this.Skill_Ball1.x, this.Skill_Ball1.collideY)) {this.Skill_Ball1.my *= -1; skill_mode1 = false;
       if(difficulty==2||difficulty==3){
          if(makeRand(difficulty*2)){
           this.Enemy_class[enemy_idx] = new Enemy_Skill_Ball(this.Skill_Ball1.x, this.Skill_Ball1.y - BALL_RADIUS, BALL_RADIUS,5, -90, COLOR);
            enemy_idx++;
            }
        }
        for(let i = 0; i < arr_sound.length; i++){
        if(arr_sound[i].paused){ 
            if (audio_cond) {
               arr_sound[i].play(); 
                break; 
              }    
        }
    }}
      if (this.bricks.collide(this.Skill_Ball2.collideX, this.Skill_Ball2.y)) {this.Skill_Ball2.mx *= -1; skill_mode2 = false;
        if(difficulty==2||difficulty==3){
          if(makeRand(difficulty*2)){
           this.Enemy_class[enemy_idx] = new Enemy_Skill_Ball(this.Skill_Ball2.x, this.Skill_Ball2.y - BALL_RADIUS, BALL_RADIUS,5, -90, COLOR);
            enemy_idx++;
            }
        }
        for(let i = 0; i < arr_sound.length; i++){
        if(arr_sound[i].paused){ 
            if (audio_cond) {
               arr_sound[i].play(); 
                break; 
              }    
        }
    }}
      if (this.bricks.collide(this.Skill_Ball2.x, this.Skill_Ball2.collideY)) {this.Skill_Ball2.my *= -1; skill_mode2 = false;
        if(difficulty==2||difficulty==3){
          if(makeRand(difficulty*2)){
           this.Enemy_class[enemy_idx] = new Enemy_Skill_Ball(this.Skill_Ball2.x, this.Skill_Ball2.y - BALL_RADIUS, BALL_RADIUS,5, -90, COLOR);
            enemy_idx++;
            }
        }
        for(let i = 0; i < arr_sound.length; i++){
        if(arr_sound[i].paused){ 
          if (audio_cond) {
               arr_sound[i].play(); 
                break; 
              }    
        }
    }}
      if (this.bricks.collide(this.Skill_Ball3.collideX, this.Skill_Ball3.y)) {this.Skill_Ball3.mx *= -1; skill_mode3 = false;
        if(difficulty==2||difficulty==3){
          if(makeRand(difficulty*2)){
           this.Enemy_class[enemy_idx] = new Enemy_Skill_Ball(this.Skill_Ball3.x, this.Skill_Ball3.y - BALL_RADIUS, BALL_RADIUS,5, -90, COLOR);
            enemy_idx++;
            }
        }
        for(let i = 0; i < arr_sound.length; i++){
        if(arr_sound[i].paused){ 
           if (audio_cond) {
               arr_sound[i].play(); 
                break; 
              }    
        }
    }}
      if (this.bricks.collide(this.Skill_Ball3.x, this.Skill_Ball3.collideY)) {this.Skill_Ball3.my *= -1; skill_mode3 = false;
        if(difficulty==2||difficulty==3){
          if(makeRand(difficulty*2)){
           this.Enemy_class[enemy_idx] = new Enemy_Skill_Ball(this.Skill_Ball3.x, this.Skill_Ball3.y - BALL_RADIUS, BALL_RADIUS,5, -90, COLOR);
            enemy_idx++;
            }
        }
        for(let i = 0; i < arr_sound.length; i++){
        if(arr_sound[i].paused){ 
        if (audio_cond) {
               arr_sound[i].play(); 
                break; 
              }    
        }
    }}
    }

    if (this.ball.y > HEIGHT + 50) {
          life --;  
          sleep(1000);
          if (life<=0) {
                this.state = "end";
              }
       if(difficulty ==1){ //난이도 조절 부분
           var sdiff = 7;
      
       }else if(difficulty ==2){
          var sdiff = 12;
       }else if(difficulty==3){
          var sdiff = 17;
    
      }
      this.ball = new Ball(this.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,sdiff, 75, COLOR);
     
    }
    if (this.bricks.count == 0) this.state = "clear";
  }

  draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    ctx.drawImage(backgroundimage[difficulty-1],0, 0, WIDTH, HEIGHT ); 
    this.bricks.draw(ctx);

    if (skill_mode1) {this.Skill_Ball1.draw(ctx);}
    if (skill_mode2) {this.Skill_Ball2.draw(ctx);}
    if (skill_mode3) {this.Skill_Ball3.draw(ctx);}
    this.paddle.draw2(ctx);
    this.ball.draw(ctx);
    for (var ic = 0; ic < enemy_idx; ic++) {
      if (this.Enemy_class[ic].check) {this.Enemy_class[ic].draw(ctx);}  
    }
    show_gage();
    show_life();
  }
}

function drawText(text) {
  ctx.font = "bold 70px arial";
  ctx.fillStyle = "dodgerblue";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
}

var game = null;

function mainLoop() {
  requestAnimationFrame(mainLoop);
  
  if (game) {
    game.update();
    game.draw();
    if (game.state == "end") {
      ctx.clearRect(0, 0, WIDTH, HEIGHT); life =3; 
      showrestartPage();
    }
    if (game.state == "clear"){
      if (audio_cond) {
       // document.getElementById("bg-audio").pause();
       // document.getElementById("clear_audio").play();
      }

      check_if_level_clear[difficulty-1] = false
      showclearPage();
       
      //ctx.clearRect(0, 0, WIDTH, HEIGHT); 
      //ctx.drawImage(completeimg, 0, 0, WIDTH, HEIGHT);
      //drawText("CLEAR");
      
    
      
      //$("#gamePage").hide();
      //$("#myCanvas").hide();
      //showStoryPage();
      //  changeBGM();
      //  $("#gage0").hide();
      //  $("#gage05").hide();
      //  $("#gage1").hide();
      //  $("#gage2").hide();
     //   $("#gage3").hide();
      //  $("#gage4").hide();
 
       // $("#life1").hide();
       // $("#life2").hide();
       // $("#life3").hide();
    }
  }
  else drawText("Breakout");
}
function use_skill(){
  if(keys.space){
    if(skill_gage==5){
      console.log("스킬사용");
      
      if(ch_choose == 1){
        if (audio_cond) {document.getElementById("skill_audio_fire").play();}   
      }else if(ch_choose==2){
        if (audio_cond) {document.getElementById("skill_audio_water").play();}
      }else if(ch_choose==3){
        if (audio_cond) {document.getElementById("skill_audio_leaf").play();}
      }
      skill_gage = 0;
    }
  }
}
function drawGage(){
  ctx.fillStyle = "red";
  ctx.strokeStyle = "black";
  
  if (skill_gage==0) {
    //ctx.strokeRect(0, HEIGHT-100, 300, 100)
    ctx.drawImage(gage_img[0],0,0,300,100);
  }
  else if (skill_gage==1) {
    //ctx.fillRect(0, HEIGHT-100, 60, 100);
    //ctx.strokeRect(0, HEIGHT-100, 300, 100)
    ctx.drawImage(gage_img[0],300,0,300,100);
  }
  else if (skill_gage==2) {
    //ctx.fillRect(0, HEIGHT-100, 120, 100);
    //ctx.strokeRect(0, HEIGHT-100, 300, 100)
    ctx.drawImage(gage_img[1],300,0,300,100);
  }
  else if (skill_gage==3) {
    //ctx.fillRect(0, HEIGHT-100, 180, 100);
    //ctx.strokeRect(0, HEIGHT-100, 300, 100)
    ctx.drawImage(gage_img[1],0,HEIGHT-100,300,100);
  }
  else if (skill_gage==4) {
    //ctx.fillRect(0, HEIGHT-100, 240, 100);
    //ctx.strokeRect(0, HEIGHT-100, 300, 100)
    ctx.drawImage(gage_img[2],0,HEIGHT-100,300,100);
  }
  else if (skill_gage==5) {
    //ctx.fillRect(0, HEIGHT-100, 300, 100);
    //ctx.strokeRect(0, HEIGHT-100, 300, 100)
    ctx.drawImage(gage_img[3],0,HEIGHT-100,300,100);
  }
  


}

function status_change(x){
  status = true;
  console.log("change");
  const time = Date.now()+x;
  return time;
}
function makeRand(x){
  var randnum = Math.floor(Math.random()*10+1);
  if (x<randnum) {
    return false;
  }
  else
    return true;
}
function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}
mainLoop();