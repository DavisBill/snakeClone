

var snake_head_class = get_rule('.snake_head') 
var snake_head = [get_rule('#snake_head_0'),get_rule('#snake_head_1')]
var playground = get_rule('#playground')
// var playground_w = parseInt(playground.style.width)
// var playground_h = parseInt(playground.style.height)

// 為了響應 螢幕長寬 CSS 自動識別，先暫且硬寫
var playground_w = 1000;
var playground_h = 500;


var x;
var y;
var snake_unit = parseInt(snake_head_class.style.width)
var dx = []
var dy = []

var direction = [] 
var dir_lock = [false,false]

var snake_body_id_num = [0,0]
var snake_body_array =[[],[]]

var food_id_num = 0
var food_array =[]

var pause_b = true

var t;
var move = [,]
var player_num;
var grade_lock;
var border_lock;
var pre_move = [[],[]];

var playing = false;

var restarted =false;

//聲音設定

//開場音樂
var opensound = new Audio();
opensound.src="resource/audio/titleBGM.mp3";
opensound.loop = true; // 設定重覆播放

// 遊戲音樂
var mainsound = new Audio();
mainsound.src="resource/audio/MaruMoriBGM.mp3";
mainsound.loop = true; // 設定重覆播放

// 死亡音樂
var deadsound = new Audio();
deadsound.src="resource/audio/enemyAttack.mp3";

//進食音樂
var eatsound = new Audio();
eatsound.src="resource/audio/MarioCoin.mp3";


// GameOver音樂
var gameoversound = new Audio();
gameoversound.src="resource/audio/gameoverBGM.mp3";


// 檢測是否為行動裝置
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	isMobile = true;
	
	

}



var settings = document.setting
for(var i = 0; i < settings.length; i++){
	settings[i].addEventListener("change",settingChange)
}


function get_rule(name){
	var ss = document.styleSheets[0]
	for (i = 0; i < ss.cssRules.length; i++){
		var rule = ss.cssRules[i]
		if( rule.selectorText == name){
			return rule;
		}
	} 
}

function creat_body(player){
	var pg = document.getElementById("playground")
	var id_name = "snake" + player + "_body" + snake_body_id_num[player]
	var para=document.createElement("DIV");
	pg.append(para);
	para.setAttribute("id", id_name)
	para.setAttribute("class", "snake_body_"+player);
	para.setAttribute("style", "left: "+x[player]+"px; top: "+y[player]+"px; transform:"+ snake_head[player].style.transform +";") 
	snake_body_array[player][snake_body_id_num[player]] = document.getElementById(id_name)
	snake_body_id_num[player] = snake_body_id_num[player] + 1
	score(player)
}

function snake_body_follow(player){	
	for (var i = snake_body_array[player].length - 1; i > 0; i--) {
		snake_body_array[player][i].style.left = snake_body_array[player][i-1].style.left
		snake_body_array[player][i].style.top = snake_body_array[player][i-1].style.top
		snake_body_array[player][i].style.transform = snake_body_array[player][i-1].style.transform 
	}
	if(snake_body_array[player].length > 0){			
		snake_body_array[player][0].style.left = x[player] + 'px'
		snake_body_array[player][0].style.top = y[player] + 'px'
		snake_body_array[player][0].style.transform = snake_head[player].style.transform
	}
	
}

function move_horizontal(player){
	x[player] = parseInt(snake_head[player].style.left)
	var nx = x[player] + dx[player]
	snake_head[player].style.left = nx + 'px'
}

function move_vertical(player){
	y[player] = parseInt(snake_head[player].style.top)
	var ny = y[player] + dy[player]
	snake_head[player].style.top = ny + 'px'
}

function border_dead(player){
	if(border_lock != "true"){
		return false
	}
	if(parseInt(snake_head[player].style.left) + dx[player] > playground_w - snake_unit){
		end(player)
		return true
	}
	if(parseInt(snake_head[player].style.left) + dx[player] < 0){
		end(player)
		return true
	}
	if(parseInt(snake_head[player].style.top)  + dy[player] > playground_h - snake_unit){
		end(player)
		return true
	}
	if(parseInt(snake_head[player].style.top) + dy[player] < 0){
		end(player)
		return true
	}
}

function head_move(player){
	if(pause_b == true){
		return
	}
	turn_direction(player)
	if(bump_into_myself(player) == true || bump_into_other_body(player) == true || border_dead(player) == true){
		
	}else{
		move_horizontal(player)
		move_vertical(player)
		dir_lock[player] = true
		snake_body_follow(player)
		without_border(player)
		eat_food(player)
	}
}

function bump_into_myself(player){

	var x = parseInt(snake_head[player].style.left) + dx[player] 
	var y = parseInt(snake_head[player].style.top) + dy[player] 
	if(border_lock != "true"){
		if (x == playground_w) {x = 0}
		if (x == -snake_unit ) {x = playground_w - snake_unit}
		if (y == playground_h) {y = 0}
		if (y == -snake_unit) {y = playground_h - snake_unit}
	}
	var head_x_going = x + 'px'
	var head_y_going = y  + 'px'
	for(i = 0; i < snake_body_array[player].length; i++){
		if(head_x_going == snake_body_array[player][i].style.left && head_y_going == snake_body_array[player][i].style.top){
			end(player)
			return true
		}
	}

}

function bump_into_other_body(player){
	if(player_num < 2){
		return false
	}
	if(player == 0){
		var opponent = 1
	}else if(player == 1){
		var opponent = 0
	}
	var x = parseInt(snake_head[player].style.left) + dx[player] 
	var y = parseInt(snake_head[player].style.top) + dy[player] 
	
	if(border_lock != "true"){
		if (x == playground_w) {x = 0}
		if (x == -snake_unit ) {x = playground_w - snake_unit}
		if (y == playground_h) {y = 0}
		if (y == -snake_unit) {y = playground_h - snake_unit}
	}
	var head_x_going = x + 'px'
	var head_y_going = y  + 'px'
	for(i = 0; i < snake_body_array[opponent].length; i++){
		
		if(head_x_going == snake_body_array[opponent][i].style.left && head_y_going	== snake_body_array[opponent][i].style.top){
			end(player)
			return true
		}
	
	}
	if (head_x_going == snake_head[opponent].style.left && head_y_going == snake_head[opponent].style.top){
		end(player)
		return true
	}

}


function move_oneway_left(player){
	dx[player] = -snake_unit
	dy[player] = 0
	dir_lock[player] = false
	direction[player] = 37
}

function move_oneway_right(player){
	dx[player] = snake_unit
	dy[player] = 0
	dir_lock[player] = false
	direction[player] = 39
}

function move_oneway_down(player){
	dx[player] = 0
	dy[player] = snake_unit
	dir_lock[player] = false
	direction[player] = 40
}

function move_oneway_up(player){
	dx[player] = 0
	dy[player] = -snake_unit
	dir_lock[player] = false
	direction[player] = 38
}

// PC 電腦鍵盤 鍵入 監聽事件
addEventListener("keydown", keboard_control);
function keboard_control(event){
	switch(event.which){
		case 32:
			pause()
			break;
		case 48://0
			break;
		case 49://1
			restart()
			break;
		case 50://2
			check_value()
			break;
		case 51://3
			creat_food()
			break;
		case 52://4
			recycle_food()
			break;
		case 53://5
			faster(0)
			break;
		case 54://6
			slower()
			break;
		case 55://7
			dead_gray(0)
			break;
		case 56://8
			creat_player2_snake_head()
			break;
		case 57://9
			break;
	}

	if(event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40){
		pre_control(0,event.which)
	}
	if(event.which == 65 || event.which == 68 || event.which == 83 || event.which == 87){
		//a		
		pre_control(1,event.which)	
	}
}

// 有更好的方法，使用滑動
// // 手機螢幕  觸碰 監聽事件
// document.getElementById("upTouchBtn").addEventListener("touchend",touch_control);
// document.getElementById("downTouchBtn").addEventListener("touchend",touch_control);
// document.getElementById("leftTouchBtn").addEventListener("touchend",touch_control);
// document.getElementById("rightTouchBtn").addEventListener("touchend",touch_control);

document.getElementById("phoneStartBtn").addEventListener("touchend",touch_control);

function touch_control(event)
{
	switch(event.srcElement.id){
		// case "upTouchBtn":
		// 	// 方向鍵上 Code 為38
		// 	pre_control(0,38)
		// 	break;
		// case "downTouchBtn":
		// 	// 方向鍵下 Code 為40
		// 	pre_control(0,40)
		// 	break;
		// case "leftTouchBtn":
		// 	// 方向鍵左 Code 為37
		// 	pre_control(0,37)
		// case "rightTouchBtn":
		// 	// 方向鍵右 Code 為39
		// 	pre_control(0,39)
		// 	break;		
		case "phoneStartBtn":
		// 進入全屏模式
		// iOS 疑似沒有這個API  先註解起來看看
		// document.body.requestFullscreen();
		document.getElementById("phoneStartBtn").setAttribute("style","display: none ;");
		// 空白鍵 Code 為32
		pause();
		break;		
	}
}


addEventListener("touchstart", handleTouchEvent);
addEventListener("touchend", handleTouchEvent);
addEventListener("touchmove", handleTouchEvent,false);
var startX;
var startY;
function handleTouchEvent(event) {
	switch (event.type){
		case "touchstart":
			startX = event.touches[0].pageX;
			startY = event.touches[0].pageY;
			break;
		case "touchend":
			var spanX = event.changedTouches[0].pageX - startX;
			var spanY = event.changedTouches[0].pageY - startY;

			if(Math.abs(spanX) > Math.abs(spanY)){      //認定水平方向
				if(spanX > 30){       
					// 方向鍵右 Code 為39
					pre_control(0,39)
				} else if(spanX < -30){ 
					// 方向鍵左 Code 為37
					pre_control(0,37)
				}
			} else {                                    //認定为垂直方向
				if(spanY > 30){         
					// 方向鍵下 Code 為40
					pre_control(0,40)
				} else if (spanY < -30) {
					// 方向鍵上 Code 為38
					pre_control(0,38)
				}
			}

			break;
		case "touchmove":	
			// event.preventDefault();			
	}
	}





function creat_food(){

	var lx = Math.floor((playground_w/snake_unit)*Math.random())*snake_unit
	var ly = Math.floor((playground_h/snake_unit)*Math.random())*snake_unit
	var pg = document.getElementById("playground")
	var id_name = "food" + food_id_num
	var para=document.createElement("DIV")
	pg.append(para);
	para.setAttribute("id", id_name)
	para.setAttribute("class", "food");
	para.setAttribute("style", "left: "+lx+"px; top: "+ly+"px;")
	food_array[food_array.length] = document.getElementById(id_name)
	food_id_num = food_id_num + 1
}


function eat_food(player){
	for(i = 0; i < food_array.length; i++){
		if(snake_head[player].style.left == food_array[i].style.left && snake_head[player].style.top == food_array[i].style.top){
			

			eatsound.currentTime =0;
			
			eatsound.play();

			var food = food_array[i]
			var pg = document.getElementById("playground")
			pg.removeChild(food)
			food_array.splice(i,1)
			creat_body(player)
			creat_food()
			if(grade_lock == "true"){
				grade(player)
			}
		}
	} 
}
function end(player){
	clearInterval(move[player])
	dir_lock[player] = false
	dead_gray(player)
}

function pause(player){

	// 按下空白建後，將所有的Focus 取消掉，可以避免 若原本僅要移動人物，卻誤觸使控制面板設定跑掉，遊戲機制重啟的問題
	document.activeElement.blur();
	
	// 假如沒有重新設置， 就主動重來
	if(!restarted)
	{	
		restart();
	}

	playing = true;

	if(pause_b)
	{
		gameoversound.pause();
		opensound.pause();
		mainsound.play();
	}
	else
	{
		mainsound.pause();
	}

	pause_b = !pause_b
	dir_lock[player] = false	
}


function settingChange()
{
	if(playing)
	{
		var r=confirm("Do you want to restart Game?")
		if (r==true)
		{
			playing = false;
			restart();		
		}		
	}else
	{
		restart();		
	}
}


function restart(){

	playing = false;
	mainsound.currentTime =0;
	mainsound.pause();
	gameoversound.pause();

	for(ii = 0; ii < player_num; ii++){
		end(ii)
		remove_snake_body(ii)
		if(document.getElementById("snake_head_"+ii) != null){
			remove_snake_head(ii)
		}
	}
	for(i = food_array.length-1; i >= 0; i--){
		recycle_food()
	}

	dir_lock = [false,false]

	food_id_num = 0
	food_array =[]
	pause_b = true
	pre_move = [[],[]]

	grade_lock = setting("n_grade")
	border_lock = setting("n_border")	
	t = [setting("n_speed"),setting("n_speed")]
	player_num = setting("n_player")
	for (var i = 0; i < player_num; i++) {
		creat_snake_head(i)
		clearInterval(move[i])
		move[i] = setInterval("head_move("+i+")", t[i])
		size(i)
	}
	for (var i = 0; i < setting("n_food"); i++) {
		creat_food()
	}
	
	opensound.currentTime =0;
	opensound.play();

	restarted = true;
}
function remove_snake_body(player){
	var length = snake_body_array[player].length
	for(i = 0; i < length; i++){
		var snake_body = snake_body_array[player][i]
		var pg = document.getElementById("playground")
		pg.removeChild(snake_body);
		snake_body_id_num[player] = snake_body_id_num[player] - 1
	}
	for(var ix = 0; ix < length; ix++){
		snake_body_array[player].splice(0,1)
	}
}
function recycle_food(){
	if (food_array.length < 1) {
		return
	}
	var food = food_array[food_array.length-1]
	var pg = document.getElementById("playground")
	pg.removeChild(food)
	food_array.splice(food_array.length-1,1)
}	
function faster(player){
	t[player] = parseInt(t[player]*0.95)
	clearInterval(move[player])
	move[player] = setInterval("head_move("+player+")", t[player])
	var screen = document.getElementById("speed_screen")
	screen.value = t[player]
}
function slower(player){
	t[player] = parseInt(t[player]*1/0.9)
	clearInterval(move[player])
	move[player] = setInterval("head_move("+player+")", t[player])
	var screen = document.getElementById("speed_screen")
	screen.value = t[player]
}
function score(player){
	var screen = document.getElementById("score_screen")
	screen.value = snake_body_id_num[player]
}
function grade(player){
	if(snake_body_id_num[player] < 5 && t[player] <200){
		return
	}
	else if(snake_body_id_num[player] < 20 &&  t[player] < 150){
		return
	}
	else if(snake_body_id_num[player] < 35 && t[player] < 120){
		return
	}
	else if(snake_body_id_num[player] > 35 ){
		return
	}
	// 稍微調整速度上限，避免遊戲後期速度過快
	// else if(snake_body_id_num[player] < 80 && t[player] < 75){
	// 	return
	// }
	// else if(snake_body_id_num[player] < 130 && t[player] < 65){
	// 	return
	// }
	// else if(snake_body_id_num[player] < 150 && t[player] < 55){
	// 	return
	// }
	else{
		faster(player)
	}
}
function check_value(player){

	console.log(move[0])
	console.log(move[1])

	// console.log(snake_body_array)
}
function creat_snake_head(player){

	var pg = document.getElementById("playground")
	var para=document.createElement("DIV");
	pg.append(para);
	para.setAttribute("id", "snake_head_"+player)
	para.setAttribute("class", "snake_head")
	switch(player){
		case 0:
			snake_head[player].style.left = 0 + 'px'
			snake_head[player].style.top = 0 + 'px'	
			snake_head[player].style.transform = "rotate(90deg)" 
			dx[player] = snake_unit
			dy[player] = 0
			direction[player] = 37 

			break;
		case 1:
			snake_head[player].style.left = playground_w - snake_unit + 'px'
			snake_head[player].style.top = playground_h - snake_unit + 'px'	
			snake_head[player].style.transform = "rotate(270deg)" 
			dx[player] = -snake_unit
			dy[player] = 0
			direction[player] = 39 
			break;

	}
	x = [parseInt(snake_head[0].style.left),parseInt(snake_head[1].style.left)]
	y = [parseInt(snake_head[0].style.top),parseInt(snake_head[1].style.top)]
}
function remove_snake_head(player){
	var pg = document.getElementById("playground")
	var para=document.getElementById("snake_head_"+player)
	pg.removeChild(para)
}
function setting(name){
    var x = document.getElementsByName(name);
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].checked == true) {
            return x[i].value
        }
    }
}
function size(player){
	var size = setting("n_size")
	for (var i = 0; i < size; i++) {
		creat_body(player)
	}
} 
function without_border(player){
	if(border_lock == "true"){
		return
	}
	if(parseInt(snake_head[player].style.left) + snake_unit > playground_w){
		snake_head[player].style.left = '0px'
	}
	if(parseInt(snake_head[player].style.left)   < 0){
		snake_head[player].style.left = playground_w - snake_unit + 'px'
	}
	if(parseInt(snake_head[player].style.top)  + snake_unit > playground_h){
		snake_head[player].style.top = '0px'
	}
	if(parseInt(snake_head[player].style.top) < 0){
		snake_head[player].style.top = playground_h - snake_unit + 'px'
	}
}
function dead_gray(player){
	
	if(!playing)
	{
		return;
	}

	playing = false;
	

	deadsound.play();

	mainsound.pause();

	gameoversound.play();

	for (var i = 0; i < snake_body_array[player].length; i++) {
		var gradient = 30 + parseInt((1-i/snake_body_array[player].length)*50)
		snake_body_array[player][i].style.filter = "opacity("+gradient+"%)blur(1px)"
		// console.log()
	}
	// snake_head[player].style.filter = "grayscale(80%)blur(1px)"

	//document.getElementById("snake_head_"+player).setAttribute("style", "filter: opacity(80%)blur(1px)")

	// 撞擊死亡後。更換頭像
	document.getElementById("snake_head_"+player).setAttribute("style", "background-image: url('resource/image/RabitNo.gif')")
	
	restarted = false;

	// 假如是手機開啟，則重新呼叫開始
	if(isMobile)
	{
		document.getElementById("phoneStartBtn").setAttribute("style","display: block ;");

	}
}

function pre_control(player,keycode){	
	pre_move[player].push(keycode)
}

function turn_direction(player){
	switch(player){
		case 0:
			while(dir_lock[player] == true && pre_move[player][0] != null){
				if(pre_move[player][0] == 37 && direction[0] != 39 && direction[0] != 37){
					move_oneway_left(0)
					snake_head[0].style.transform = "rotate(270deg)"
				}
				if(pre_move[player][0] == 39 && direction[0] != 37 && direction[0] != 39){
					move_oneway_right(0)
					snake_head[0].style.transform = "rotate(90deg)"		
				}
				if(pre_move[player][0] == 40 && direction[0] != 38 && direction[0] != 40){
					move_oneway_down(0)
					snake_head[0].style.transform = "rotate(180deg)"
				}
				if(pre_move[player][0] == 38 && direction[0] != 40 && direction[0] != 38){
					move_oneway_up(0)
					snake_head[0].style.transform = "rotate(0deg)"
				}
				pre_move[player].splice(0,1)
			}
			break;
		case 1:
			while(dir_lock[player] == true && pre_move[player][0] != null){
				if(pre_move[player][0] == 65 && direction[1] != 39 && direction[1] != 37){
					//a		
					move_oneway_left(1)
					snake_head[1].style.transform = "rotate(270deg)"
				}
				if(pre_move[player][0] == 68 && direction[1] != 37 && direction[1] != 39){
					//d
					move_oneway_right(1)
					snake_head[1].style.transform = "rotate(90deg)"
				}
				if(pre_move[player][0] == 83 && direction[1] != 38 && direction[1] != 40){
					//s
					move_oneway_down(1)
					snake_head[1].style.transform = "rotate(180deg)"
				}
				if(pre_move[player][0] == 87 && direction[1] != 40 && direction[1] != 38){
					//w
					move_oneway_up(1)
					snake_head[1].style.transform = "rotate(0deg)"
				}
				pre_move[player].splice(0,1)

			}
			break;
	
	}
}

alert("press space to start/pause")



restart()




// document.getElementById('testbutton1').onclick = restart
// document.getElementById('testbutton2').onclick = check_value
// document.getElementById('testbutton3').onclick = creat_food

// document.getElementById('testbutton4').onclick = recycle_food
// document.getElementById('testbutton5').onclick = faster
// document.getElementById('testbutton6').onclick = slower

// document.getElementById('testbutton7').onclick = "dead_gray(0)"
// document.getElementById('testbutton8').onclick = 

// document.getElementById('testbutton9').onclick = player2_pause
