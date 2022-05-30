// 내용 각자 추가 

/* 사용자 목숨 */ 
var life;

/* 컬러 선택 옵션 */
var colorPalette1=['#ffa2a2','#ffe990','#d0ee96','#9fecf1']; 
var colorPalette2=['#fdb122','#ff4989','#119afa','#00a46d']; 
var colorPalette3=['#383838','#ff6464','#2ed5ff','#ffffff'];
var colorPalette=[colorPalette1,colorPalette2,colorPalette3];
var userPalette=0; // default 0

/* canvas 관련 변수*/

var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;

/* box 관련 변수*/
var BOX_ROW=8; // 임시 설정
var BOX_COL=5; // 임시 설정 
var BOX_WIDTH =CANVAS_WIDTH/BOX_ROW; // 임시 설정
var BOX_HEIGHT=(CANVAS_HEIGHT/4)/BOX_COL; // 임시 설정 
var boxes=[];

var MAX_SPECIAL_BOX=5; // 최대로 생성할 수 있는 특수 벽돌 개수 - 임의 설정 (3개에서 7개로)
var BOX_TYPE_NUM=4;
var FOR_B_MAX_RAND_REPEAT=9; // for 박스 최대 반복횟수 (2~10)
var RAND_B_MAX_RAND_REPEAT=5; // 와 rand 최대 반복횟수(1~5) 

/* box 내부 text 관련 변수 */
var FONT = '12px serif';
  
/* 공 관련 변수 */
var DIAMETER = 15; // 미정 -------------------------------------------------- !
var x=Math.floor(Math.random()*(CANVAS_WIDTH-DIAMETER));
var y=CANVAS_HEIGHT/3;
var dx = 2;
var dy = 2;
var ballImg = new Image();
ballImg.src = 'image_src/pokeball.png';

/* 가짜공 관련 변수 */
var fake_x=Math.floor(Math.random()*(CANVAS_WIDTH-DIAMETER)); //가짜공 x,y
var fake_y = 0;
var fake_dx = 2;
var fake_dy = 2;

var f_x=Math.floor(Math.random()*(CANVAS_WIDTH-DIAMETER));
var f_y = 0;
var f_dx = -2;
var f_dy = 2;


/* 바 관련 변수 */
var barWidth = 100; // 단계마다 초기화 
var BAR_HEIGHT = 10; // 초기화 필요 ---------------------------------------- !
var barX = (CANVAS_WIDTH - barWidth)/2; // bar의 왼쪽 위 꼭짓점 x좌표 
var barY = CANVAS_HEIGHT-BAR_HEIGHT; // bar의 왼쪽 위 꼭짓점 y좌표
var relativeX;

/* 바 움직임 관련 이벤트리스너 */
document.addEventListener("mousemove",mouseMoveHandler,false);


/* 점수, 승리조건 관련 변수 */
var GOAL_SCORE =10;
var totalScore=0;
var isClear=false;// 추가 
//var isBox = false;

/* 레벨 관련 변수*/ 
//var curLevel=1;
var level = 0;
var levelArr = ["lv1","lv2","lv3"];

/* 시간 관련 변수 */
var setTime = 4000;
var timer;

var gameTimer;

/* 화면표시 관련 변수 */
//var mainP = document.getElementById("mainP-hider");
//var levP = document.getElementById("levP-hider");
//var gameoverP = document.getElementById("gameOver-hider");
//var gameoverBackImg = document.getElementById("gameoverbox").style.backgroundImage;

/* 사운드 효과 관련 변수 */
//var FX_pop = new Audio('audio/FX_pop.mp3');
//FX_pop.volume = 0.75;

//아이템
var items = [];
var items_dY = 2;


/* 벽돌 배열 생성 함수 - 초기화 함수 */ 
function createNormalBox(){
    
    for(i=0;i<BOX_ROW;i++){
        boxes[i] = [];
        for(j=0;j<BOX_COL;j++){
            boxes[i][j]={
                x:0,
                y:0,
                count:1,
                type:0,
                score: 1,
            }
            boxes[i][j].x=i*BOX_WIDTH;
            boxes[i][j].y=j*BOX_HEIGHT;
        }
    }
}


function drawBall(){
    context.drawImage(ballImg,x,y,DIAMETER ,DIAMETER);
    //공 선택하는 부분 없어서 일단 크롬만 나머지는 img 만 바꾸면됨.
    x += dx;
    y += dy;
}



/* 바 그리는 함수 */
function drawBar(){
    context.beginPath();
    context.rect(barX, CANVAS_HEIGHT-BAR_HEIGHT, barWidth, BAR_HEIGHT);
    context.fillStyle = "green";
    context.fill();
    context.closePath();
}

/* 움직임 그리는 함수 */
function draw(){
    context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    drawBall();
    drawBar();
    //drawBoxNText();


    //---------------------충돌함수 추가
    collideWall();
    collideBar();
    collideFloor();
    

}

// var barX = (CANVAS_WIDTH - barWidth)/2;
/* 마우스 컨트롤 함수 */
function mouseMoveHandler(e){
    relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < CANVAS_WIDTH){
    	barX = relativeX-barWidth/2;
    }
}

/* 특수 벽돌 속성부여 함수 - 초기화 함수 */
function createSpecialBox(){
    var numOfSpecialBox=Math.floor(Math.random()*MAX_SPECIAL_BOX)+3; // 특수 벽돌 개수 설정 


    for(i=0;i<numOfSpecialBox;i++){
        
        var randTypeNum=Math.floor(Math.random()*3)+1;
        var randRow=Math.floor(Math.random()*BOX_ROW);
        var randCol=Math.floor(Math.random()*BOX_COL);

        setBoxProperty(randTypeNum,randRow,randCol);
    }
    

}

/* 박스 타입별 count, scroe 속성 변경 함수 - 초기화 함수 */
function setBoxProperty(randTypeNum,randRow,randCol){
    // prinf 벽돌
    if(randTypeNum==1){
        boxes[randRow][randCol].type=1;
        boxes[randRow][randCol].score=2;
    }
    // for문 벽돌
    else if(randTypeNum==2){
        var randRepeat=Math.floor(Math.random()*FOR_B_MAX_RAND_REPEAT )+2; // 적어도 반복횟수 2회부터 
        boxes[randRow][randCol].type=2;
        boxes[randRow][randCol].score=randRepeat;
        boxes[randRow][randCol].count=randRepeat;

    }
    //  rand 벽돌
    else if(randTypeNum==3){
        var randRepeat=Math.floor(Math.random()*RAND_B_MAX_RAND_REPEAT)+1;
        boxes[randRow][randCol].type=3;
        boxes[randRow][randCol].score=randRepeat;
        boxes[randRow][randCol].count=randRepeat;
    }
    else{

    };

}

/* 박스와 텍스트 그리는 함수 */
/*function drawBoxNText(){
    for(i=0;i<BOX_ROW;i++){
        for(j=0;j<BOX_COL;j++){
            drawBox(i,j);
            drawText(i,j);
        }
    }
}*/

/* 박스 그리는 함수 */
function drawBox(i,j){
    var X=boxes[i][j].x;
    var Y=boxes[i][j].y;
    var type = boxes[i][j].type;
    var isExist = (boxes[i][j].count>0);
    var color;

    if(isExist){
        switch(type){
            case 0:
                color = colorPalette[userPalette][0]; // 사용자 선택 팔레트에 맞게 변경 
                break;
            case 1:
                color=colorPalette[userPalette][1]; // 사용자 선택 팔color=colorPalette[userPalette][0];
                break;
            case 2:
                color=colorPalette[userPalette][2]; // 사용자 선택 팔레트에 맞게 변경 
                break;
            case 3:
                color=colorPalette[userPalette][3]; // 사용자 선택 팔레트에 맞게 변경 
                break;
        }
        context.fillStyle = color ;
        context.fillRect(X, Y, BOX_WIDTH-1, BOX_HEIGHT-1);
    }

}



/* 벽 충돌 */
function collideWall(){
    if( x <= 0 || x+DIAMETER >= CANVAS_WIDTH)
        dx=-dx;
    if(y <= 0)
        dy=-dy;
}

/* 바 충돌 */
function collideBar(){
    if(x + DIAMETER >= barX && x <= barX + barWidth && y + DIAMETER >= barY+1)
        dy=-dy;
}

/* 바닥 충돌 */
function collideFloor(){
    
        // 또는 clearinterval 및 처리 함수 ----------------------------------------------------- ! 
}

/* 벽돌 충돌 */


/* 점수 얻는 함수 */ 


/* 점수 출력하는 함수*/
  


/* print 벽돌 깬 경우에 실행되는 함수*/ 

function PlayGame(){
    context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    x=Math.floor(Math.random()*(CANVAS_WIDTH-DIAMETER));
    y=CANVAS_HEIGHT/3;
    dx = 2;
    dy = 2;
    life = true;
    //isBox = false;
    totalScore = 0;
    setTime=4000;//추추추가


    // 초기화 함수에서 이렇게 호출해야함. 
    createNormalBox();
    createSpecialBox();


    gameTimer = setInterval(draw,20);
 
}

function goToStart(){
    window.location.reload();
   
}