var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var char = "./src/"
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var keys={};
var charimg =[];
var charimg2 = [];
var dialog=[];
var map;
var Players = function(options){
    this.x = options.x;
    this.y = options.y;
    this.speed = options.speed;
    this.type = options.type;
    this.direction = options.direction;
    
}
//키보드 이벤트 소스
window.addEventListener('keydown',function(e)
    {keys[e.keyCode] = true;
    e.preventDefault();}
);

window.addEventListener('keyup',function(e){
    delete keys[e.keyCode];
});
var selected_character = "big";

var droh = new Players({
    x:700,
    y:1200,
    speed:8,
    type:0,
    direction:9
});
var player = new Players({
    x:700,
    y:850,
    speed:10,
    type:1,
    direction: 3
});


start();
function start(){
    init();
    drawCharacter(player);
    opening();

    


}


var interval;
function opening(){
    //interval= setInterval(keep,80);
    setInterval(loop,80);
}


function keep(){
    console.log("keep ");
    coming_droh();

    drawCharacter2(droh);
    if(droh.y<=920){
        clearInterval(interval);
        setTimeout(function(){
            droh.type = 1;
            drawCharacter2(droh);
            console.log('sssss');
            console.log(dialog[0].width/3);
            ctx.drawImage(dialog[0], 0,0,  450,180,   330,  130,   150,60);
            setTimeout(function(){
                droh.type = 1;
                drawCharacter2(droh);
                console.log('22222');
                
                ctx.drawImage(dialog[1], 0,0,  dialog[1].width,dialog[1].height,   180,  70,   dialog[1].width/3,dialog[1].height/3);

                setTimeout(function(){
                    droh.type = 1;
                    drawCharacter2(droh);
                    console.log('22222');
                    
                    ctx.drawImage(dialog[2], 0,0,  dialog[2].width,dialog[2].height,   330,  130,   dialog[2].width/3,dialog[2].height/3);

                    setTimeout(function(){
                        i =3;
                        drawCharacter2(droh);
                        console.log('22222');
                        
                        ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   240,  70,   dialog[i].width/3,dialog[i].height/3);
                        setTimeout(function(){
                            var j =4;
                            drawCharacter2(droh);
                            console.log('22222');
                            
                            ctx.drawImage(dialog[j], 0,0,  dialog[j].width,dialog[j].height,   330,  130,   dialog[j].width/3,dialog[j].height/3);
                            setTimeout(function(){
                                var j =5;
                                drawCharacter2(droh);
                                console.log('22222');
                                
                                ctx.drawImage(dialog[j], 0,0,  dialog[j].width,dialog[j].height,   330,  130,   dialog[j].width/3,dialog[j].height/3);
                                setTimeout(function(){
                                    var i =6;
                                    drawCharacter2(droh);
                                    console.log('22222');
                                    
                                    ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   240,  70,   dialog[i].width/3,dialog[i].height/3);
                                    setTimeout(function(){
                                        var j =7;
                                        drawCharacter2(droh);
                                        console.log('22222');
                                        
                                        ctx.drawImage(dialog[j], 0,0,  dialog[j].width,dialog[j].height,   360,  130,   dialog[j].width/3,dialog[j].height/3);
                                        setTimeout(function(){
                                            var i =8;
                                            drawCharacter2(droh);
                                            console.log('22222');
                                            
                                            ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   240,  70,   dialog[i].width/3,dialog[i].height/3);
                                            setTimeout(function(){
                                                var j =9;
                                                drawCharacter2(droh);
                                                console.log('22222');
                                                
                                                ctx.drawImage(dialog[j], 0,0,  dialog[j].width,dialog[j].height,   330,  130,   dialog[j].width/3,dialog[j].height/3);
                                                setTimeout(function(){
                                                    var i =10;
                                                    drawCharacter2(droh);
                                                    console.log('22222');
                                                    
                                                    ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   240,  70,   dialog[i].width/3,dialog[i].height/3);
                                                    setTimeout(function(){
                                                        var j =11;
                                                        drawCharacter2(droh);
                                                        console.log('22222');
                                                        
                                                        ctx.drawImage(dialog[j], 0,0,  dialog[j].width,dialog[j].height,   330,  130,   dialog[j].width/3,dialog[j].height/3);
                                                    
                                                        setTimeout(function(){
                                                            var i =12;
                                                            drawCharacter2(droh);
                                                            console.log('22222');
                                                            
                                                            ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   240,  70,   dialog[i].width/3,dialog[i].height/3);
                                                            setTimeout(function(){
                                                                var i =13;
                                                                drawCharacter2(droh);
                                                                console.log('22222');
                                                                
                                                                ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   180,  70,   dialog[i].width/3,dialog[i].height/3);
                                                                setTimeout(function(){
                                                                    var j =14;
                                                                    drawCharacter2(droh);
                                                                    console.log('22222');
                                                                    
                                                                    ctx.drawImage(dialog[j], 0,0,  dialog[j].width,dialog[j].height,   330,  130,   dialog[j].width/3,dialog[j].height/3);
                                                                    setTimeout(function(){
                                                                        var j =15;
                                                                        drawCharacter2(droh);
                                                                        console.log('22222');
                                                                        
                                                                        ctx.drawImage(dialog[j], 0,0,  dialog[j].width,dialog[j].height,   330,  130,   dialog[j].width/3,dialog[j].height/3);
                                                                        setTimeout(function(){
                                                                            var i =16;
                                                                            drawCharacter2(droh);
                                                                            console.log('22222');
                                                                            
                                                                            ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   200,  70,   dialog[i].width/3,dialog[i].height/3);
                                                                            setTimeout(function(){
                                                                                var j =17;
                                                                                drawCharacter2(droh);
                                                                                console.log('22222');
                                                                                
                                                                                ctx.drawImage(dialog[j], 0,0,  dialog[j].width,dialog[j].height,   330,  130,   dialog[j].width/3,dialog[j].height/3);
                                                                                setInterval(loop, 80);
                                                                            },3000);
                                                                        },3000);
                                                                    },3000);
                                                                },3000);
                                                            },3000);
                                                        },3000);
                                                    },3000);
                                                },3000);
                                            },3000);
                                        },3000);
                                    },3000);
                                },3000);
                            },3000);
                        },3000);
                    },3000);

                },3000);
            },3000);

        },1000);
        
        // setTimeout(function(){
        //     var i =3;
        //     drawCharacter2(droh);
        //     console.log('22222');
            
        //     ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   240,  70,   dialog[i].width/3,dialog[i].height/3);
        // },3000);
        

    }
    
}
function coming_droh(){
    console.log(droh.y);
    droh.y -=droh.speed;
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    droh.direction = 9;
    droh.type = (droh.type+1)%3;
}
// create  player instance

function input(player){
    var flag =1;
    

    if(37 in keys){//left
        if(player.x-player.speed<=550&&player.y>980&&player.y<=1370)flag =0;
        if(player.x-player.speed<=170&&player.y>=1370&&player.y<=1450)flag = 0;
        if(player.x-player.speed<=550&&player.y>1450&&player.y<=1480)flag=0;
        if(player.x-player.speed<=740&&player.y<520)flag=0;
        if(player.x<=370&&player.y>=520&&player.y<800)flag=0;
        if(player.x<=0)flag=0;
        player.x -=player.speed* flag;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player.direction = 0;
        console.log(player.x.toString()+","+player.y.toString());
        player.type = (player.type+1)%3;
    }
    if(39 in keys){//dright
        if(player.x+player.speed <=550&&player.y>980&&player.y<=1370)flag =0;
        if(player.x+player.speed>=1620&&player.y>=1290)flag=0;
        if(player.x+player.speed>=1090&&player.y<=1280&&player.y>=890)flag=0;
        if(player.x+player.speed>=1660&&player.y<=880&&player.y>=520)flag=0;
        if(player.x+player.speed>=1090&&player.y<520)flag=0;
        player.x += player.speed*flag;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player.direction = 6;
        console.log(player.x.toString()+","+player.y.toString());
        player.type = (player.type+1)%3;
    }
    if(38 in keys){//up
        if(player.x<=550&&player.y-player.speed >=980&&player.y-player.speed <=1370)flag =0;
        if(player.x>1080&&player.y-player.speed<=1280&&player.y-player.speed>=950)flag=0;
        if(player.x<=1650&&player.y-player.speed<=510&&player.x>=1090)flag=0;
        if(player.y-player.speed<=0)flag=0;
        if(player.y-player.speed<=510&&player.x<750)flag=0;
        if(player.y<=800&&player.x<370)flag=0;
        player.y -=player.speed*flag;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player.direction = 9;
        console.log(player.x.toString()+","+player.y.toString());
        player.type = (player.type+1)%3;
    }
    if(40 in keys){//down
        if(player.x<=550&&player.y+player.speed >=990&&player.y+player.speed <=1370)flag =0;
        if(player.x<=550&&player.y+player.speed>=1460)flag=0;
        if(player.y+player.speed>=1490)flag=0;
        if(player.x>=1090&&player.y+player.speed>=890&&player.y+player.speed<=1290)flag=0;
        player.y += player.speed*flag;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player.direction = 3;
        console.log(player.x.toString()+","+player.y.toString());
        player.type = (player.type+1)%3;
    }


}

function drawCharacter(player){
    
    
    if(player.x-350+35 <= 0 || player.y - 200 + 35 <=0 ||player.x +350 - 35>=1700|| player.y +200 - 35 >= 1700 ){
        ctx.drawImage(map,player.x-350+35 <= 0?0:player.x-350+35,player.y - 200 + 35 <=0?0:player.y - 200 + 35,700,400,0,0,700,400);
        ctx.drawImage(charimg[player.direction+player.type],0,0,charimg[player.direction+player.type].width,charimg[player.direction+player.type].height,player.x-350+35 <= 0?player.x:315,player.y - 200 + 35 <=0?player.y:165,70,70);
        return;
        }
    ctx.drawImage(map,player.x-350+35,player.y - 200 + 35,700,400,0,0,700,400);
    ctx.drawImage(charimg[player.direction+player.type],0,0,charimg[player.direction+player.type].width,charimg[player.direction+player.type].height,315,165,70,70);
}

function drawCharacter2(player){
    
    
    if(player.x-350+35 <= 0 || player.y - 200 + 35 <=0 ||player.x +350 - 35>=1700|| player.y +200 - 35 >= 1700 ){
        ctx.drawImage(map,player.x-350+35 <= 0?0:player.x-350+35,player.y - 200 + 35 <=0?0:player.y - 200 + 35,700,400,0,0,700,400);
        ctx.drawImage(charimg2[player.direction+player.type],0,0,charimg2[player.direction+player.type].width,charimg2[player.direction+player.type].height,player.x-350+35 <= 0?player.x:315,player.y - 200 + 35 <=0?player.y:165,70,70);
        return;
        }
    ctx.drawImage(map,player.x-350+35,player.y - 200 + 35,700,400,0,0,700,400);
    //console.log(player.direction+player.type);
    ctx.drawImage(charimg2[player.direction+player.type],0,0,charimg2[player.direction+player.type].width,charimg2[player.direction+player.type].height,315,165,70,70);
    ctx.drawImage(charimg[4],0,0,charimg[player.direction+player.type].width,charimg[player.direction+player.type].height,315,165-(player.y-850),70,70);
    //ctx.drawImage(charimg2[player.direction+player.type],0,0,150,150,315,165,70,70);

}
function update(){
    input(player);
}
function draw(){
    drawCharacter(player);
}
function loop(){
    
    update();
    draw();
    
}

function init(){
    for(var i =0; i<12; i++){
        charimg[i] = new Image;
        charimg[i].src = char+selected_character+(i+1).toString()+".PNG";
        //console.log(charimg[i].src);
        charimg2[i] = new Image;
        charimg2[i].src = char+"dr"+(i+1).toString()+".PNG";
        //console.log(charimg2[i].src);
    }
    for(var i =0; i<18; i++){
        dialog[i] = new Image;
        dialog[i].src = "./dialog/"+(i+1).toString()+".png";
    }
        map = new Image;
        map.src = char+"map1.png"
    
    
    
}
