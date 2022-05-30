var audio_cond = true;
var ch_choose = 1;
var difficulty = 1;
const arr_sound = [];
var clear = [0, 0, 0, 0];
var page;
var audio_volume = 5;
var ball_selected = 'image_src/pokeball.png';


var canvas2;
var ctx2;
var char = "./src/"

var pica;
var eve;
var keys = {};
var charimg = [];
var charimg2 = [];
var pockimg = [];
var dialog = [];
var map;
var Players = function (options) {
    this.x = options.x;
    this.y = options.y;
    this.speed = options.speed;
    this.type = options.type;
    this.direction = options.direction;
    this.pocket = options.pocket;
}
//키보드 이벤트 소스
window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
    e.preventDefault();
});

window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
});
var selected_character = "big";

var droh = new Players({
    x: 700,
    y: 1200,
    speed: 8,
    type: 0,
    direction: 9,
    pocket: 0
});
var player = new Players({
    x: 700,
    y: 850,
    speed: 10,
    type: 1,
    direction: 3,
    pocket: 0
});


function start(a) {
    canvas2 = document.getElementById('myCanvas2');
    ctx2 = canvas2.getContext("2d");
    canvas2.width = 700;
    canvas2.height = 400;
    if (a == 2) {
        selected_character = "smal";
    }
    console.log("hi game start");
    init();
    console.log("init completed");
    drawCharacter(player);
    opening();




}

var playstory;
var interval;

function opening() {
    interval= setInterval(keep,80);
    //playstory = setInterval(loop, 80);
}

function ending(){
    interval = setInterval(keep2,80);
}   


function coming_droh() {
    console.log(droh.y);
    droh.y -= droh.speed;
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    droh.direction = 9;
    droh.type = (droh.type + 1) % 3;
}
function coming_droh2() {
    console.log(droh.y);
    droh.y += droh.speed;
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    droh.direction = 3;
    droh.type = (droh.type + 1) % 3;
}
// create  player instance

function input(player) {
    var flag = 1;
    if ($("#storyPage").css("display") == "block") {
        if (32 in keys) {

            if (player.x >= 740 && player.y <= 790 && player.y >= 700 && player.y <= 800) {
                player.pocket = 1;
            } //포켓몬 종류하고 레벨 인자로 받기 (나중에 위치바꿈)
            if (player.x >= 800 && player.x <= 850 && player.y >= 700 && player.y <= 800) {
                player.pocket = 2;
            }
            if (player.x >= 860 && player.x <= 910 && player.y >= 700 && player.y <= 800) {
                player.pocket = 3;
            }

            if (player.x >= 270 && player.x <= 330 && player.y >= 1380 && player.y <= 1400) {
                pokemonselect(player.pocket, 1);
                difficulty = 1;
                change_position($("#gametop"));
                $("#pageBox").css({
                    width: 500,
                    height: 560,
                    top: 100
                });
                $("#gametop").css({
                    top: 0
                });
                change_position($("#pageBox"));
            }
            if (player.x >= 1310 && player.x <= 1390 && player.y >= 1290 && player.y <= 1330) {
                pokemonselect(player.pocket, 3);
                difficulty = 3;
                change_position($("#gametop"));
                $("#pageBox").css({
                    width: 500,
                    height: 560,
                    top: 100
                });

                $("#gametop").css({
                    top: 0
                });
                change_position($("#pageBox"));

            }
            if (player.x >= 450 && player.x <= 540 && player.y >= 520 && player.y <= 550) {
                difficulty = 2;
                pokemonselect(player.pocket, 2);
                change_position($("#gametop"));
                $("#pageBox").css({
                    width: 500,
                    height: 560,
                    top: 100
                });
                $("#gametop").css({
                    top: 0
                });
                change_position($("#pageBox"));
            }

            console.log(player.pocket);
        }

        if (37 in keys) { //left
            if (player.x - player.speed <= 550 && player.y > 980 && player.y <= 1370) flag = 0;
            if (player.x - player.speed <= 170 && player.y >= 1370 && player.y <= 1450) flag = 0;
            if (player.x - player.speed <= 550 && player.y > 1450 && player.y <= 1480) flag = 0;
            if (player.x - player.speed <= 740 && player.y < 520) flag = 0;
            if (player.x <= 370 && player.y >= 520 && player.y < 800) flag = 0;
            if (player.x <= 0) flag = 0;
            player.x -= player.speed * flag;
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            player.direction = 0;
            console.log(player.x.toString() + "," + player.y.toString());
            player.type = (player.type + 1) % 3;
        }
        if (39 in keys) { //dright
            if (player.x + player.speed <= 550 && player.y > 980 && player.y <= 1370) flag = 0;
            if (player.x + player.speed >= 1620 && player.y >= 1290) flag = 0;
            if (player.x + player.speed >= 1090 && player.y <= 1280 && player.y >= 890) flag = 0;
            if (player.x + player.speed >= 1660 && player.y <= 880 && player.y >= 520) flag = 0;
            if (player.x + player.speed >= 1090 && player.y < 520) flag = 0;
            player.x += player.speed * flag;
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            player.direction = 6;
            console.log(player.x.toString() + "," + player.y.toString());
            player.type = (player.type + 1) % 3;
        }
        if (38 in keys) { //up
            if (player.x <= 550 && player.y - player.speed >= 980 && player.y - player.speed <= 1370) flag = 0;
            if (player.x > 1080 && player.y - player.speed <= 1280 && player.y - player.speed >= 950) flag = 0;
            if (player.x <= 1650 && player.y - player.speed <= 510 && player.x >= 1090) flag = 0;
            if (player.y - player.speed <= 0) flag = 0;
            if (player.y - player.speed <= 510 && player.x < 750) flag = 0;
            if (player.y <= 800 && player.x < 370) flag = 0;
            player.y -= player.speed * flag;
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            player.direction = 9;
            console.log(player.x.toString() + "," + player.y.toString());
            player.type = (player.type + 1) % 3;
        }
        if (40 in keys) { //down
            if (player.x <= 550 && player.y + player.speed >= 990 && player.y + player.speed <= 1370) flag = 0;
            if (player.x <= 550 && player.y + player.speed >= 1460) flag = 0;
            if (player.y + player.speed >= 1490) flag = 0;
            if (player.x >= 1090 && player.y + player.speed >= 890 && player.y + player.speed <= 1290) flag = 0;
            player.y += player.speed * flag;
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            player.direction = 3;
            console.log(player.x.toString() + "," + player.y.toString());
            player.type = (player.type + 1) % 3;
        }

    }
}

function drawCharacter(player) {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    if (player.x - 350 + 35 <= 0 || player.y - 200 + 35 <= 0 || player.x + 350 - 35 >= 1700 || player.y + 200 - 35 >= 1700) {
        ctx2.drawImage(map, player.x - 350 + 35 <= 0 ? 0 : player.x - 350 + 35, player.y - 200 + 35 <= 0 ? 0 : player.y - 200 + 35, 700, 400, 0, 0, 700, 400);
        if (player.pocket != 0) {
            ctx2.drawImage(pockimg[player.pocket - 1], 0, 0, pockimg[player.pocket - 1].width, pockimg[player.pocket - 1].height, 305, 155, 50, 50);
        }
        ctx2.drawImage(charimg[player.direction + player.type], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, player.x - 350 + 35 <= 0 ? player.x : 315, player.y - 200 + 35 <= 0 ? player.y : 165, 70, 70);
        return;
    }

    ctx2.drawImage(map, player.x - 350 + 35, player.y - 200 + 35, 700, 400, 0, 0, 700, 400);
    if (player.pocket != 0) {
        ctx2.drawImage(pockimg[player.pocket - 1], 0, 0, pockimg[player.pocket - 1].width, pockimg[player.pocket - 1].height, 305, 155, 50, 50);
    }
    ctx2.drawImage(charimg[player.direction + player.type], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, 315, 165, 70, 70);
}

function drawCharacter2(player) {


    if (player.x - 350 + 35 <= 0 || player.y - 200 + 35 <= 0 || player.x + 350 - 35 >= 1700 || player.y + 200 - 35 >= 1700) {
        ctx2.drawImage(map, player.x - 350 + 35 <= 0 ? 0 : player.x - 350 + 35, player.y - 200 + 35 <= 0 ? 0 : player.y - 200 + 35, 700, 400, 0, 0, 700, 400);
        ctx2.drawImage(charimg2[player.direction + player.type], 0, 0, charimg2[player.direction + player.type].width, charimg2[player.direction + player.type].height, player.x - 350 + 35 <= 0 ? player.x : 315, player.y - 200 + 35 <= 0 ? player.y : 165, 70, 70);
        return;
    }
    ctx2.drawImage(map, player.x - 350 + 35, player.y - 200 + 35, 700, 400, 0, 0, 700, 400);
    //console.log(player.direction+player.type);
    ctx2.drawImage(charimg2[player.direction + player.type], 0, 0, charimg2[player.direction + player.type].width, charimg2[player.direction + player.type].height, 315, 165, 70, 70);
    ctx2.drawImage(charimg[4], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, 315, 165 - (player.y - 850), 70, 70);
    //ctx.drawImage(charimg2[player.direction+player.type],0,0,150,150,315,165,70,70);

}
function drawCharacter3(player) {


    ctx2.drawImage(map, player.x - 350 + 35, player.y - 200 + 35, 700, 400, 0, 0, 700, 400);
    //console.log(player.direction+player.type);
    ctx2.drawImage(charimg2[player.direction + player.type], 0, 0, charimg2[player.direction + player.type].width, charimg2[player.direction + player.type].height, 315, 165, 70, 70);
    ctx2.drawImage(charimg[10], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, 315, 165 - (player.y - 1460), 70, 70);
    //ctx.drawImage(charimg2[player.direction+player.type],0,0,150,150,315,165,70,70);

}

function update() {
    input(player);
}

function draw() {
    drawCharacter(player);
}

function loop() {

    update();
    draw();

}

function init() {

    for (var i = 0; i < 3; i++) {
        pockimg[i] = new Image;
        pockimg[i].src = char + "charimg" + (i + 1).toString() + ".webp";
    }
    for (var i = 0; i < 12; i++) {
        charimg[i] = new Image;
        charimg[i].src = char + selected_character + (i + 1).toString() + ".PNG";
        //console.log(charimg[i].src);
        charimg2[i] = new Image;
        charimg2[i].src = char + "dr" + (i + 1).toString() + ".PNG";
        //console.log(charimg2[i].src);
    }
    for (var i = 0; i < 33; i++) {
        dialog[i] = new Image;
        dialog[i].src = "./dialog/" + (i + 1).toString() + ".png";
    }
    map = new Image;
    map.src = char + "map1.png"



}

function change_position(obj) {
    var l = ($(window).width() - obj.width()) / 2;
    var t = ($(window).height() - obj.height()) / 2;

    obj.css({
        left: l
    });
    l = l - 10;
    $("#pageBox").css({
        left: l
    });
    $("#title").css({
        left: l
    });
}

//화면 중앙유지 구현
$(document).ready(function () {

    function change_position(obj) {
        var l = ($(window).width() - obj.width()) / 2;
        var t = ($(window).height() - obj.height()) / 2;

        obj.css({
            left: l
        });
        l = l - 10;
        $("#pageBox").css({
            left: l
        });
        $("#title").css({
            left: l
        });
    }

    function change_position_t(obj) {
        var l = ($("#title").width() - obj.width()) / 2;
        var t = ($("#title").height() - obj.height()) / 2;

        obj.css({
            left: l
        });
    } //title 속 중앙정렬 함수
    /*
    function change_position_gage(obj){
        var cx = $("#pageBox").offset().left;
        var cy = $("#pageBox").offset().top;
        cx = cx + 270;
        cy = cy + 405;
        obj.css({left: cx, top: cy});
    }

    function change_position_life1(obj){
        
        var cx = $("#pageBox").offset().left;
        var cy = $("#pageBox").offset().top;
        cx = cx + 930;
        cy = cy + 405;
        obj.css({left: cx, top: cy});
    }

    function change_position_life2(obj){
        
        var cx = $("#pageBox").offset().left;
        var cy = $("#pageBox").offset().top;
        cx = cx + 890;
        cy = cy + 405;
        obj.css({left: cx, top: cy});
    }

    function change_position_life3(obj){
        
        var cx = $("#pageBox").offset().left;
        var cy = $("#pageBox").offset().top;
        cx = cx + 850;
        cy = cy + 405;
        obj.css({left: cx, top: cy});
    }*/


    change_position($("#game_border_img"));

    $(window).resize(function () {
        change_position($("#game_border_img"));
        /*
        change_position_gage($("#gage0"));
        change_position_gage($("#gage05"));
        change_position_gage($("#gage1"));
        change_position_gage($("#gage2"));
        change_position_gage($("#gage3"));
        change_position_gage($("#gage4"));
        change_position_life1($("#life1"));
        change_position_life2($("#life2"));
        change_position_life3($("#life3"));*/

    });
    change_position($("#pageBox"));
    change_position($("#title"));
    change_position_t($("#title_sample_img"));
    change_position_t($("#introduceBtn"));
    change_position_t($(".creditBtn"));

    $("#volume_value").html(audio_volume);
    $("#volume_slider").on('input', function () {
        var allaudio = $("#all_audio").find("audio");
        audio_volume = $(this).val();
        $("#volume_value").html(audio_volume);
        allaudio.volume = audio_volume * 0.1;
    });
    $("#ball1").on("click", function () {
        $(this).css("border", "3px solid black");
        $("#ball2").css("border", "none");
        $("#ball3").css("border", "none");
        ball_selected = 'image_src/pokeball.png';
        balling2.src = ball_selected;
    });

    $("#ball2").on("click", function () {
        $(this).css("border", "3px solid black");
        $("#ball1").css("border", "none");
        $("#ball3").css("border", "none");
        ball_selected = 'image_src/하이퍼볼.webp';
        balling2.src = ball_selected;
    });

    $("#ball3").on("click", function () {
        $(this).css("border", "3px solid black");
        $("#ball2").css("border", "none");
        $("#ball1").css("border", "none");
        ball_selected = 'image_src/마스터볼.png';
        balling2.src = ball_selected;
    });






    $(window).resize(function () {
        change_position($("#pageBox"));
    })

    $(window).resize(function () {
        change_position($("#title"));
    })
    $("#startBtn").on("click", function () {
        startBtnClicked();
    });
    $("#backBtn").on("click", function () {
        previousStartPage();
    });
    $("#optionBtn").on("click", function () {
        if ($("#storyPage").css("display") == "block") {
            page = "storyPage";
        } else if ($("#chPage").css("display") == "block") {
            page = "chPage";
        }
        showOption();
        showBackBtn();
    });
    $(".audio").eq(0).on("click", function () {
        playBGM();
    });
    $(".audio").eq(1).on("click", function () {
        stopBGM();
    });
    $("#nextBtn").on("click", function () {
        nextBtnClicked();
    });
    $("#char1").on("click", function () {
        changenum1();
    });
    $("#char2").on("click", function () {
        changenum2();
    });
    $("#char3").on("click", function () {
        changenum3();
    });
    $("#restartBtn").on("click", function () {
        hiderestartPage();
        score = 0;
        var intext = "Score : " + score;
        $("#score_restart_p").html(intext);
        $("#myCanvas").show();
        pokemonselect(player.pocket, difficulty);
    });
    $("#backtostoryBtn").on("click", function () {
        var flag = 0;
        for (var i = 0; i < 3; i++) {
            if (clear[i + 1] == 1) {
                flag = flag + 1;

            }

        }
        $("#myCanvas").hide();
        $("#restartPage").hide();
        $("#clearPage").hide();
        $("#gamePage").hide();
        clearInterval(playstory);
        $("#myCanvas").hide();
        showStoryPage();
        changeBGM();
        showOptionBtn();
        $("#wrapper_gage").hide();
        $("#gametop").hide();
        $("#pageBox").css({
            width: 700,
            height: 400,
            left: 480
        });
        change_position($("pageBox"));
        drawCharacter(player);
        setTimeout(function () {
            drawCharacter(player);
            ctx2.drawImage(dialog[22], 0, 0, dialog[22].width, dialog[22].height, 370, 140, dialog[22].width / 3, dialog[22].height / 3);
            setTimeout(function () {
                if (flag != 0) {
                    drawCharacter(player);
                    console.log(flag);
                    ctx2.drawImage(dialog[22 + flag], 0, 0, dialog[22 + flag].width, dialog[22 + flag].height, 370, 140, dialog[22 + flag].width / 3, dialog[22 + flag].height / 3);

                } else {
                    draw();
                    ctx2.drawImage(dialog[30], 0, 0, dialog[30].width, dialog[30].height, 370, 140, dialog[30].width / 3, dialog[30].height / 3);

                }

                setTimeout(function () {
                    playstory= setInterval(loop,80);

                }, 3000);

            }, 3000);
        }, 1000);
        life = 3;
        score = 0;
        var intext = "Score : " + score;
        $("#score_restart_p").html(intext);
        skill_gage = 0;
    });
    $("#clearBtn").on("click", function () {
        $("#myCanvas").hide();
        $("#restartPage").hide();
        $("#clearPage").hide();
        clear[difficulty] = 1;
        var flag = 1;
        var count = 0;
        for (var i = 0; i < 3; i++) {
            if (clear[i + 1] == 0) {
                flag = 0;

            } else {
                count += 1;
            }

        }
        clearInterval(playstory);
        $("#gamePage").hide();
        $("#myCanvas").hide();
        $("#clearPage").hide();
        showStoryPage();
        changeBGM();
        showOptionBtn();
        $("#pageBox").css({
            width: 700,
            height: 400,
            left: 480
        });
        $("#wrapper_gage").hide();
        $("#gametop").hide();

        if (flag) {
            clearInterval(playstory);
            droh.y = 1290;
            ending();

        } else {
            clearInterval(playstory);
            setTimeout(function () {
                drawCharacter(player);
                ctx2.drawImage(dialog[21], 0, 0, dialog[21].width, dialog[21].height, 370, 140, dialog[21].width / 3, dialog[21].height / 3);
                setTimeout(function () {
                    if (count!= 0) {
                        drawCharacter(player);
                        console.log(count);
                        ctx2.drawImage(dialog[22 + count], 0, 0, dialog[22 + count].width, dialog[22 + count].height, 370, 140, dialog[22 + count].width / 3, dialog[22 + count].height / 3);
    
                    } else {
                        draw();
                        ctx2.drawImage(dialog[30], 0, 0, dialog[30].width, dialog[30].height, 370, 140, dialog[30].width / 3, dialog[30].height / 3);
    
                    }
    
                    setTimeout(function () {
                        playstory= setInterval(loop,80);
    
                    }, 3000);
    
                }, 3000);
            }, 1000);
        }
        life = 3;
        score_total += score;
        skill_gage = 0;
    });



    // 10개의 Audio객체를 배열에 담아둔다.
    for (let i = 0; i < 10; i++) {
        const sound = new Audio();
        sound.src = "sound_src/brick_audio.mp3";
        sound.volume = audio_volume * 0.1;

        // 크롬 예외 처리: audio 재생이 끝나면, 다시 로드해준다
        sound.addEventListener('ended', function () {
            if (window.chrome) {
                this.load();
            }
            this.pause();
        })

        arr_sound.push(sound);
    }

});

function nextBtnClicked() {
    hidechPage();
    //showGamePage();
    showStoryPage();
    //hideOptionBtn();
    hideBackBtn();
    //pokemonselect(2,2);
    start(ch_choose);
    //startGame(0);
    //changeBGM();

}

function pokemonselect(a, b) {
    showGamePage();
    hideOptionBtn();
    $("#restartPage").hide();
    $("#clearPage").hide();
    $("#save_pokemons").fadeIn("slow");
    if (b == 1) {
        $("#save_pokemons").attr("src", "./image_src/save_ev.jpg");
    } else if (b == 2) {
        $("#save_pokemons").attr("src", "./image_src/save_pikachu.jpg");
    } else {
        $("#save_pokemons").attr("src", "./image_src/save_obaksa.jpg");
    }
    $("#myCanvas").show();
    ch_choose = a;
    difficulty = b;
    startGame(0);
    hideStoryPage();
    changeBGM();
    $("#gametop").fadeIn("slow");
    $("#wrapper_gage").fadeIn("slow");
}

function hideStoryPage() {
    $("#storyPage").fadeOut("slow");
    $("#storyPage").css({
        display: "none"
    });
}

function showStoryPage() {
    $("#storyPage").fadeIn("slow");
    $("#storyPage").css({
        display: "block"
    });

}

function startBtnClicked() {
    hideStartPage();
    showNextPage();
    playSong();
}

function hideOptionBtn() {
    $("#optionBtn").hide();
}

function showOptionBtn() {
    $("#optionBtn").show();
}

function showGamePage() {
    $("#gamePage").fadeIn("slow");
}

function hideStartPage() {
    $("#startPage").addClass("hide");
}

function hidechPage() {
    $("#chPage").hide();
}

function showNextPage() {
    $("#chPage").removeClass("hide");
}

function showStartPage() {
    $("#startPage").removeClass("hide");
}

function showBackBtn() {
    $("#backBtn").show();
}

function hideBackBtn() {
    $("#backBtn").hide();
}

function hiderestartPage() {
    $("#restartPage").hide();
}

function showrestartPage() {
    $("#myCanvas").hide();
    $("#restartPage").show();
}

function showclearPage(i) {
    $("#myCanvas").hide();
    $("#restartPage").hide();
    $("#clearPage").hide();
    if (i == 0) {
        var flag = 0;
        for (var i = 0; i < 3; i++) {
            if (clear[i + 1] == 1) {
                flag = flag + 1;

            }

        }
        $("#gamePage").hide();
        clearInterval(playstory);
        $("#myCanvas").hide();
        showStoryPage();
        changeBGM();
        showOptionBtn();
        $("#wrapper_gage").hide();
        $("#gametop").hide();
        $("#pageBox").css({
            width: 700,
            height: 400,
            left: 480
        });
        change_position($("pageBox"));
        drawCharacter(player);
        
        life = 3;
        score = 0;
        var intext = "Score : " + score;
        $("#score_restart_p").html(intext);
        skill_gage = 0;
    } else {
        clear[difficulty] = 1;
        var flag = 1;
        for (var i = 0; i < 3; i++) {
            if (clear[i + 1] == 0) {
                flag = 0;
                break;
            }

        }

        $("#gamePage").hide();
        $("#myCanvas").hide();
        $("#clearPage").hide();
        showStoryPage();
        changeBGM();
        showOptionBtn();
        $("#pageBox").css({
            width: 700,
            height: 400,
            left: 480
        });
        $("#wrapper_gage").hide();
        $("#gametop").hide();
        if (flag) {


        }
        life = 3;
        score_total += score;
        skill_gage = 0;
    }
}

function changenum1() {
    $("#char1").css({
        border: "3px solid red",
        "border-radius": "10px"
    });
    $("#char2").css({
        border: "none"
    });
    $("#char3").css({
        border: "none"
    });
    ch_choose = 1;
}

function changenum2() {
    $("#char2").css({
        border: "3px solid blue",
        "border-radius": "10px"
    });
    $("#char1").css({
        border: "none"
    });
    $("#char3").css({
        border: "none"
    });
    ch_choose = 2;
}

function changenum3() {
    $("#char3").css({
        border: "3px solid green",
        "border-radius": "10px"
    });
    $("#char2").css({
        border: "none"
    });
    $("#char1").css({
        border: "none"
    });
    ch_choose = 3;
}

function previousStartPage() {
    hidechPage();
    hideStoryPage();
    hideOption();
    if (page == "chPage") {
        $("#chPage").show();
        ch = ""
    } else if (page == "storyPage") {
        showStoryPage();
        ch = ""
    }
    hideBackBtn();

}

function showOption() {
    $("#optionPage").removeClass("hide");
    hideStartPage();
    hidechPage();
    showBackBtn();
    hideStoryPage();

}

function hideOption() {
    $("#optionPage").addClass("hide");
}

function playSong() {
    if (audio_cond) {
        $("#bg-audio").attr("src", "sound_src/bg-music.mp3");
        var player = document.getElementById('bg-audio');
        player.volume = audio_volume * 0.1;

    }

}

function changeBGM() {
    if ($("#storyPage").css("display") == "block") {
        $("#bg-audio").attr("src", "sound_src/bg-music.mp3");
        var player = document.getElementById('bg-audio');
        player.volume = audio_volume * 0.1;
    } else {
        $("#bg-audio").attr("src", "sound_src/game_audio.mp3");
        var player = document.getElementById('bg-audio');
        player.volume = audio_volume * 0.1;
    }

    if (audio_cond) {
        $("#bg-audio").get(0).play();
    } else {
        $("#bg-audio").get(0).pause();
    }

}

function playBGM(target) {
    audio_cond = true;
    $("#bg-audio").get(0).play();
    $(".audio").eq(1).show();
    $(".audio").eq(0).hide();

}

function stopBGM(target) {
    audio_cond = false;
    $("#bg-audio").get(0).pause();
    $(".audio").eq(0).show();
    $(".audio").eq(1).hide();
}


function introduce_popup() { //팝업화면 띄우기(게임소개)
    //popup insert
    //$("#popup").css("display","block");
    $("#popup").fadeIn();
    var l = ($("#title").width() - $("#popup").width()) / 2;
    var t = ($("#title").height() - $("#popup").height()) / 2;

    $("#popup").css({
        left: l,
        top: t
    });
    $("#popup").html('<h2 class="popup_title">게임소개</h2><br><p>내용</p><br><img id="popup_close_img" src="image_src/nextBtn.png" onclick="close_popup();">');
} //위 html 함수에 게임소개 내용 추가

function credit_popup() { //팝업화면 띄우기(만든이)
    //credit insert
    $("#popup").fadeIn();
    var l = ($("#title").width() - $("#popup").width()) / 2;
    var t = ($("#title").height() - $("#popup").height()) / 2;

    $("#popup").css({
        left: l,
        top: t
    });
    $("#popup").html('<h2 class="popup_title">만든이</h2><p id="popup_p">이수민 202111340 <br><br>권순재 201911151<br><br>박성준 201911174<br><br>이지현 202111352</p><br><img id="popup_close_img" src="image_src/nextBtn.png" onclick="close_popup();">');
}

function close_popup() { //팝업 닫기
    //$("#popup").css("display","none");
    $("#popup").fadeOut();
}

function show_gage() {
    if (skill_gage == 0) {
        $("#gage0").show();
        $("#gage05").hide();
        $("#gage1").hide();
        $("#gage2").hide();
        $("#gage3").hide();
        $("#gage4").hide();
    } else if (skill_gage == 1) {
        $("#gage0").hide();
        $("#gage05").show();
        $("#gage1").hide();
        $("#gage2").hide();
        $("#gage3").hide();
        $("#gage4").hide();
    } else if (skill_gage == 2) {
        $("#gage0").hide();
        $("#gage05").hide();
        $("#gage1").show();
        $("#gage2").hide();
        $("#gage3").hide();
        $("#gage4").hide();
    } else if (skill_gage == 3) {
        $("#gage0").hide();
        $("#gage05").hide();
        $("#gage1").hide();
        $("#gage2").show();
        $("#gage3").hide();
        $("#gage4").hide();
    } else if (skill_gage == 4) {
        $("#gage0").hide();
        $("#gage05").hide();
        $("#gage1").hide();
        $("#gage2").hide();
        $("#gage3").show();
        $("#gage4").hide();
    } else if (skill_gage == 5) {
        $("#gage0").hide();
        $("#gage05").hide();
        $("#gage1").hide();
        $("#gage2").hide();
        $("#gage3").hide();
        $("#gage4").show();
    }

}

function show_life() {
    if (life == 3) {
        $("#life1").show();
        $("#life2").show();
        $("#life3").show();
    } else if (life == 2) {
        $("#life1").hide();
        $("#life2").show();
        $("#life3").show();
    } else if (life == 1) {
        $("#life1").hide();
        $("#life2").hide();
        $("#life3").show();
    } else if (life == 0) {
        $("#life1").hide();
        $("#life2").hide();
        $("#life3").hide();
    }
}


function keep() {
    console.log("keep ");
    coming_droh();

    drawCharacter2(droh);
    if (droh.y <= 920) {
        clearInterval(interval);
        setTimeout(function () {
            droh.type = 1;
            drawCharacter2(droh);
            console.log('sssss');
            console.log(dialog[0].width / 3);
            ctx2.drawImage(dialog[0], 0, 0, 450, 180, 330, 130, 150, 60);
            setTimeout(function () {
                droh.type = 1;
                drawCharacter2(droh);
                console.log('22222');

                ctx2.drawImage(dialog[1], 0, 0, dialog[1].width, dialog[1].height, 180, 70, dialog[1].width / 3, dialog[1].height / 3);

                setTimeout(function () {
                    droh.type = 1;
                    drawCharacter2(droh);
                    console.log('22222');

                    ctx2.drawImage(dialog[2], 0, 0, dialog[2].width, dialog[2].height, 330, 130, dialog[2].width / 3, dialog[2].height / 3);

                    setTimeout(function () {
                        var i = 3;
                        drawCharacter2(droh);
                        console.log('22222');

                        ctx2.drawImage(dialog[i], 0, 0, dialog[i].width, dialog[i].height, 240, 70, dialog[i].width / 3, dialog[i].height / 3);
                        setTimeout(function () {
                            var j = 4;
                            drawCharacter2(droh);
                            console.log('22222');

                            ctx2.drawImage(dialog[j], 0, 0, dialog[j].width, dialog[j].height, 330, 130, dialog[j].width / 3, dialog[j].height / 3);
                            setTimeout(function () {
                                var j = 5;
                                drawCharacter2(droh);
                                console.log('22222');

                                ctx2.drawImage(dialog[j], 0, 0, dialog[j].width, dialog[j].height, 330, 130, dialog[j].width / 3, dialog[j].height / 3);
                                setTimeout(function () {
                                    var i = 6;
                                    drawCharacter2(droh);
                                    console.log('22222');

                                    ctx2.drawImage(dialog[i], 0, 0, dialog[i].width, dialog[i].height, 240, 70, dialog[i].width / 3, dialog[i].height / 3);
                                    setTimeout(function () {
                                        var j = 7;
                                        drawCharacter2(droh);
                                        console.log('22222');

                                        ctx2.drawImage(dialog[j], 0, 0, dialog[j].width, dialog[j].height, 360, 130, dialog[j].width / 3, dialog[j].height / 3);
                                        setTimeout(function () {
                                            var i = 8;
                                            drawCharacter2(droh);
                                            console.log('22222');

                                            ctx2.drawImage(dialog[i], 0, 0, dialog[i].width, dialog[i].height, 240, 70, dialog[i].width / 3, dialog[i].height / 3);
                                            setTimeout(function () {
                                                var j = 9;
                                                drawCharacter2(droh);
                                                console.log('22222');

                                                ctx2.drawImage(dialog[j], 0, 0, dialog[j].width, dialog[j].height, 330, 130, dialog[j].width / 3, dialog[j].height / 3);
                                                setTimeout(function () {
                                                    var i = 10;
                                                    drawCharacter2(droh);
                                                    console.log('22222');

                                                    ctx2.drawImage(dialog[i], 0, 0, dialog[i].width, dialog[i].height, 240, 70, dialog[i].width / 3, dialog[i].height / 3);
                                                    setTimeout(function () {
                                                        var j = 11;
                                                        drawCharacter2(droh);
                                                        console.log('22222');

                                                        ctx2.drawImage(dialog[j], 0, 0, dialog[j].width, dialog[j].height, 330, 130, dialog[j].width / 3, dialog[j].height / 3);

                                                        setTimeout(function () {
                                                            var i = 12;
                                                            drawCharacter2(droh);
                                                            console.log('22222');

                                                            ctx2.drawImage(dialog[i], 0, 0, dialog[i].width, dialog[i].height, 240, 70, dialog[i].width / 3, dialog[i].height / 3);
                                                            setTimeout(function () {
                                                                var i = 13;
                                                                drawCharacter2(droh);
                                                                console.log('22222');

                                                                ctx2.drawImage(dialog[i], 0, 0, dialog[i].width, dialog[i].height, 180, 70, dialog[i].width / 3, dialog[i].height / 3);
                                                                setTimeout(function () {
                                                                    var j = 14;
                                                                    drawCharacter2(droh);
                                                                    console.log('22222sd');

                                                                    ctx2.drawImage(dialog[j], 0, 0, dialog[j].width, dialog[j].height, 330, 130, dialog[j].width / 3, dialog[j].height / 3);
                                                                    setTimeout(function () {
                                                                        var j = 15;
                                                                        drawCharacter2(droh);
                                                                        console.log('22222');

                                                                        ctx2.drawImage(dialog[j], 0, 0, dialog[j].width, dialog[j].height, 330, 130, dialog[j].width / 3, dialog[j].height / 3);
                                                                        setTimeout(function () {
                                                                            var i = 16;
                                                                            drawCharacter2(droh);
                                                                            console.log('22222');

                                                                            ctx2.drawImage(dialog[i], 0, 0, dialog[i].width, dialog[i].height, 200, 70, dialog[i].width / 3, dialog[i].height / 3);
                                                                            setTimeout(function () {
                                                                                var j = 17;
                                                                                drawCharacter2(droh);
                                                                                console.log('22222');

                                                                                ctx2.drawImage(dialog[j], 0, 0, dialog[j].width, dialog[j].height, 330, 130, dialog[j].width / 3, dialog[j].height / 3);
                                                                                setTimeout(function () {
                                                                                    playstory = setInterval(loop, 80);
                                                                                }, 3000);

                                                                            }, 3000);
                                                                        }, 3000);
                                                                    }, 3000);
                                                                }, 3000);

                                                            }, 3000);
                                                        }, 3000);
                                                    }, 3000);
                                                }, 3000);
                                            }, 3000);
                                        }, 3000);
                                    }, 3000);
                                }, 3000);
                            }, 3000);
                        }, 3000);
                    }, 3000);

                }, 3000);
            }, 3000);

        }, 1000);

        // setTimeout(function(){
        //     var i =3;
        //     drawCharacter2(droh);
        //     console.log('22222');

        //     ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   240,  70,   dialog[i].width/3,dialog[i].height/3);
        // },3000);
    }
}

function keep2() {
    console.log("keep2 ");
    
    droh.x = player.x;
    droh.speed= 3;
    player.y = 1460;
    coming_droh2();
    drawCharacter3(droh);
    ctx2.drawImage(charimg[10], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, 315, 165 - (droh.y - 1460), 70, 70);

    if (droh.y >= 1360) {
        clearInterval(interval);
        drawCharacter3(droh);
        setTimeout(function () {
            droh.type = 1;
            drawCharacter3(droh);

            console.log('sssss');
            console.log(dialog[0].width / 3);
            ctx2.drawImage(dialog[25], 0, 0, dialog[25].width, dialog[25].height, 330, 130, 150, 60);
            ctx2.drawImage(charimg[10], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, 315, 165 - (droh.y - 1460), 70, 70);
    
            setTimeout(function () {
                droh.type = 1;
                drawCharacter3(droh);

                console.log('22222');

                ctx2.drawImage(dialog[26], 0, 0, dialog[26].width, dialog[26].height, 330, 130, dialog[26].width / 3, dialog[26].height / 3);
                ctx2.drawImage(charimg[10], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, 315, 165 - (droh.y - 1460), 70, 70);
    
                setTimeout(function () {
                    droh.type = 1;
                    drawCharacter3(droh);
                    console.log('22222');

                    ctx2.drawImage(dialog[27], 0, 0, dialog[27].width, dialog[27].height, 330, 130, dialog[27].width / 3, dialog[27].height / 3);
                    ctx2.drawImage(charimg[10], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, 315, 165 - (droh.y - 1460), 70, 70);
    
                    setTimeout(function () {
                        var i = 28;
                        drawCharacter3(droh);
                        console.log('22222');

                        ctx2.drawImage(dialog[i], 0, 0, dialog[i].width, dialog[i].height, 330, 130, dialog[i].width / 3, dialog[i].height / 3);
                        ctx2.drawImage(charimg[10], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, 315, 165 - (droh.y - 1460), 70, 70);
    
                        setTimeout(function () {
                            var j = 29;
                            drawCharacter3(droh);
                            console.log('22222');

                            
                            ctx2.drawImage(dialog[j], 0, 0, dialog[j].width, dialog[j].height, 330, 130, dialog[j].width / 3, dialog[j].height / 3);
                            ctx2.drawImage(charimg[10], 0, 0, charimg[player.direction + player.type].width, charimg[player.direction + player.type].height, 315, 165 - (droh.y - 1460), 70, 70);
    
                            setTimeout(function () {
                                var j = 5;
                                drawCharacter3(droh);
                                console.log('22222');

                                
                            }, 3000);
                        }, 3000);
                    }, 3000);

                }, 3000);
            }, 3000);

        }, 1000);

        // setTimeout(function(){
        //     var i =3;
        //     drawCharacter2(droh);
        //     console.log('22222');

        //     ctx.drawImage(dialog[i], 0,0,  dialog[i].width,dialog[i].height,   240,  70,   dialog[i].width/3,dialog[i].height/3);
        // },3000);


    }

}