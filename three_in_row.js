var canvas = document.querySelector('#board');
var inner_firkant = window.innerWidth < 600 ? 90 : 240;
var innerst_firkant = inner_firkant/3;

canvas.width = inner_firkant * 3;
canvas.height = inner_firkant * 3;

var c = canvas.getContext('2d');

function tegn_brett(){
  //innerfirkanter
  c.lineWidth = 4; // tykkere linje
  c.strokeRect(0,0,inner_firkant,inner_firkant);
  c.strokeRect(inner_firkant,0,inner_firkant,inner_firkant);
  c.strokeRect(inner_firkant*2,0,inner_firkant,inner_firkant);

  c.strokeRect(0,inner_firkant,inner_firkant,inner_firkant);
  c.strokeRect(inner_firkant,inner_firkant,inner_firkant,inner_firkant);
  c.strokeRect(inner_firkant*2,inner_firkant,inner_firkant,inner_firkant);

  c.strokeRect(0,inner_firkant*2,inner_firkant,inner_firkant);
  c.strokeRect(inner_firkant,inner_firkant*2,inner_firkant,inner_firkant);
  c.strokeRect(inner_firkant*2,inner_firkant*2,inner_firkant,inner_firkant);
  //innerfirkanter

  //innerst firkanter
  //innså det over er dust, forloop mye bedre
  c.lineWidth = 1;
  for (var i = 0; i < 9; i++) {
    for (var y = 0; y < 9; y++){
      c.strokeRect(i*innerst_firkant, y*innerst_firkant, innerst_firkant, innerst_firkant)
    }
  }
  console.log(canvas);
}
tegn_brett();


//prøve å lage x-er der man trykker i brettet
const mouse = {
  x: null, 
  y: null,
}


canvas.addEventListener("click", function(event){
  const rect = canvas.getBoundingClientRect(); // får posisjon og størrelse på canvas
  mouse.x = event.x - rect.left;
  mouse.y = event.y - rect.top;
  if (riktig_firkant()==false){
    return;
  }
  tegn_X_O();
  tre_paa_rad(bytte);
});

var bytte = true;
function tegn_X_O(){
  var x_click = mouse.x;
  var y_click = mouse.y;
  for (var i = 1; i < 81; i++) {
    if (x_click/innerst_firkant < (innerst_firkant/innerst_firkant) * i){
      x = i-1;
      var x_position = x * innerst_firkant;
      break;
    }
  }
  for (var i = 1; i < 81; i++) {
    if (y_click/innerst_firkant < (innerst_firkant/innerst_firkant) * i){
      var y_position = i * innerst_firkant;
      break;
    }
  }
  let fontSizeSmall = innerst_firkant*1.3;
  c.font = `${fontSizeSmall}px Verdana`;
  
  if (bytte == true){
    c.fillText("X",x_position, y_position, innerst_firkant, innerst_firkant);
    bytte = false;
  }
  else{
    c.fillText("O",x_position, y_position, innerst_firkant, innerst_firkant);
    bytte = true;
  }
}

var put_overalt = false;
var liten_rute_nr_prev = null;
var liten_rute_x_before = null;
var liten_rute_y_before = null;
var store_firkanter_tatt = [];
var all_moves_list = [];
function riktig_firkant() {
  
  var x_click = mouse.x;
  var y_click = mouse.y;
  var rute_x = Math.floor(x_click/innerst_firkant);
  rute_x++;
  var rute_y = Math.floor(y_click/innerst_firkant);
  rute_y++;
  //først finner vi hvilen store firkant som ble trykket på
  var stor_rute_x = 1;
  if (rute_x > 3 && rute_x < 7){
    stor_rute_x = 2;
  }
  if (rute_x > 6 && rute_x < 10){
  stor_rute_x = 3;
  }
  //stor rute x funnet
  var stor_rute_y = 1;
  if (rute_y > 3 && rute_y < 7){
    stor_rute_y = 2;
  }
  if (rute_y > 6 && rute_y < 10){
  stor_rute_y = 3;
  }
  //stor rute y funnet
  var stor_rute = [stor_rute_x, stor_rute_y];
  var stor_rute_nr = null;
  for (var i = 1; i < 10; i++){
    for (var y = 1; y < 10; y++){
      if(stor_rute[0]==i && stor_rute[1]==y){
        if(y == 1){
          stor_rute_nr = i;
        }
        if(y == 2){
          stor_rute_nr = i + 3;
        }
        if(y == 3){
          stor_rute_nr = i + 6;
        }
      }
    }
  }
  //over finner vi stor firkant, fra 1 til 9, under gjør vi det samme for de små som er inni
  //under finner vi hvilken lille firkant som er trykket på

  //variabler til å vite om del-seier eller seier (om det trengs)
  //variabler som må lagres under
  var liten_rute_x = rute_x;
  var liten_rute_y = rute_y;
  //variabler som må lagres over
  if (rute_x > 3 && rute_x < 7){
    liten_rute_x = rute_x - 3;
  }
  if (rute_x > 6 && rute_x < 10){
    liten_rute_x = rute_x - 6;
  }
  //finner liten y under
  if (rute_y > 3 && rute_y < 7){
    liten_rute_y = rute_y - 3;
  }
  if (rute_y > 6 && rute_y < 10){
    liten_rute_y = rute_y - 6;
  }
  var liten_rute = [liten_rute_x, liten_rute_y];

  //under finner vi nummerene til de små rutene
  var liten_rute_nr = null;
  for (var i = 1; i < 10; i++){
    for (var y = 1; y < 10; y++){
      if(liten_rute[0]==i && liten_rute[1]==y){
        if(y == 1){
          liten_rute_nr = i;
        }
        if(y == 2){
          liten_rute_nr = i + 3;
        }
        if(y == 3){
          liten_rute_nr = i + 6;
        }
      }
    }
  }

  //
  //lagrer til å vite når noe vinner under
  liten_firkant_oversikt_x = liten_rute_nr;
  stor_firkant_oversikt_x = stor_rute_nr;
  //
  c.strokeStyle = "black";
  var sort_pa_vunnen_firkant = false;
  for (var i = 0; i < store_firkanter_tatt.length; i++){
    if(liten_rute_nr==store_firkanter_tatt[i]){
      sort_pa_vunnen_firkant = true;
    }
  }

  var all_moves = liten_rute_nr + 9*(stor_rute_nr-1);
  if (put_overalt == false && liten_rute_nr_prev != null && stor_rute_nr != liten_rute_nr_prev || all_moves_list.includes(all_moves)){
    check = false;
    return check;
  }

  if (stor_rute_nr == liten_rute_nr_prev || liten_rute_nr_prev == null || put_overalt == true){
    tegn_brett();
    if (sort_pa_vunnen_firkant == false){
      c.strokeStyle = "red";
    }
    c.lineWidth = 4; // tykkere linje
    c.strokeRect((liten_rute_x-1)*inner_firkant,(liten_rute_y-1)*inner_firkant,inner_firkant,inner_firkant);
  }
  if (put_overalt == true){
    if (store_firkanter_tatt.includes(stor_rute_nr)){
      check = false;
      c.strokeStyle = "black";
      tegn_brett();
      return check;
    }
  }
  put_overalt = false; 
  for (var i = 0; i < store_firkanter_tatt.length; i++){
    if(liten_rute_nr==store_firkanter_tatt[i]){
      put_overalt = true;
      break;
    }
  }

  // all_moves_list brukes slik at vi ikke legger to oppå hverandre
  
  all_moves_list.push(all_moves);
  liten_rute_nr_prev = liten_rute_nr;
  liten_rute_x_before = liten_rute_x;
  liten_rute_y_before = liten_rute_y;
}

//vite hvem som vinner hvor under
var liten_firkant_oversikt_x;
var stor_firkant_oversikt_x;
var liste_over_trekk_X_brett = [];
var liste_over_trekk_O_brett = [];
var liste_over_alle_trekk = [];

//både funksjon tre_paa_rad og check_list funker, men de er ikke bra og ganske så umulige å forstå. burde tenkt fra start at funksjonen under skal funke med x og o, but life is life
function tre_paa_rad(true_false){
  if(true_false == false){
    liste_over_trekk_X_brett.push([stor_firkant_oversikt_x, liten_firkant_oversikt_x]);
    liste_over_alle_trekk.push([stor_firkant_oversikt_x, liten_firkant_oversikt_x]);
    check_list(liste_over_trekk_X_brett, true_false);
  }
  else{
    liste_over_trekk_O_brett.push([stor_firkant_oversikt_x, liten_firkant_oversikt_x]);
    liste_over_alle_trekk.push([stor_firkant_oversikt_x, liten_firkant_oversikt_x]);
    check_list(liste_over_trekk_O_brett, true_false);
  }
  fullt_brett(liste_over_alle_trekk);
}

var store_firkanter_tatt_o = [];
var store_firkanter_tatt_x = [];
var win_on_last = false;
function check_list(liste_over_trekk_X_or_O_brett, true_false){
  var temp_save = [];
    liste_over_trekk_X_or_O_brett.forEach(x => {
    if(x[0] == stor_firkant_oversikt_x){
      temp_save.push(x[1]);
    }
    if(temp_save.includes(1) && temp_save.includes(2) && temp_save.includes(3) ||
        temp_save.includes(4) && temp_save.includes(5) && temp_save.includes(6) ||
        temp_save.includes(7) && temp_save.includes(8) && temp_save.includes(9) ||
        temp_save.includes(1) && temp_save.includes(4) && temp_save.includes(7) ||
        temp_save.includes(2) && temp_save.includes(5) && temp_save.includes(8) ||
        temp_save.includes(3) && temp_save.includes(6) && temp_save.includes(9) ||
        temp_save.includes(1) && temp_save.includes(5) && temp_save.includes(9) ||
        temp_save.includes(3) && temp_save.includes(5) && temp_save.includes(7) ){
      var win_mål_x = 0;
      var win_mål_y = inner_firkant;
      if(x[0]==2){
        win_mål_x = 1 * inner_firkant;
      }
      if(x[0]==3){
        win_mål_x = 2 * inner_firkant;
      }
      if(x[0]==4){
        win_mål_y = 1.98 * inner_firkant;
      }
      if(x[0]==5){
        win_mål_y = 1.98 * inner_firkant;
        win_mål_x = 1 * inner_firkant;
      }
      if(x[0]==6){
        win_mål_y = 1.98 * inner_firkant;
        win_mål_x = 2 * inner_firkant;
      }
      if(x[0]==7){
        win_mål_y = 2.98 * inner_firkant;
      }
      if(x[0]==8){
        win_mål_y = 2.98 * inner_firkant;
        win_mål_x = 1 * inner_firkant;
      }
      if(x[0]==9){
        win_mål_y = 2.98 * inner_firkant;
        win_mål_x = 2 * inner_firkant;
      }
      let fontSize_big = 4.1 * innerst_firkant;
      c.font = `${fontSize_big}px Verdana`;
      c.fillStyle = "black"; 
      
      if(true_false == true){
        c.fillText("O",win_mål_x, win_mål_y, inner_firkant, inner_firkant);
        
        store_firkanter_tatt.push(x[0]);
        store_firkanter_tatt_o.push(x[0]);
        win_on_last = false;
        if(x[0] == x[1]){
          win_on_last = true;
          if(win_on_last){
            c.strokeStyle = "black";
            tegn_brett();
            put_overalt = true;
          }
        }
      }
      else{
        c.fillText("X",win_mål_x, win_mål_y, inner_firkant, inner_firkant);
        store_firkanter_tatt.push(x[0]);
        store_firkanter_tatt_x.push(x[0]);
        win_on_last = false;
        if(x[0] == x[1]){
          win_on_last = true;
          if(win_on_last){
            c.strokeStyle = "black";
            tegn_brett();
            put_overalt = true;
          }
        }
      }
      if (if_loop(store_firkanter_tatt_x) == true){
        setTimeout(() => alert("X vant!"), 50);
      }
      else if(if_loop(store_firkanter_tatt_o) == true){
        setTimeout(() => alert("O vant!"), 50);
      }
    }
  }
);
}

function if_loop(liste){
  var check = false;
  if(liste.includes(1) && liste.includes(2) && liste.includes(3) ||
    liste.includes(4) && liste.includes(5) && liste.includes(6) ||
    liste.includes(7) && liste.includes(8) && liste.includes(9) ||
    liste.includes(1) && liste.includes(4) && liste.includes(7) ||
    liste.includes(2) && liste.includes(5) && liste.includes(8) ||
    liste.includes(3) && liste.includes(6) && liste.includes(9) ||
    liste.includes(1) && liste.includes(5) && liste.includes(9) ||
    liste.includes(3) && liste.includes(5) && liste.includes(7) ){
      check = true;
      return check;
    }
}


function fullt_brett(liste_over_trekk_X_or_O_brett){
  var all_trekk_i_firkant = [];
    liste_over_trekk_X_or_O_brett.forEach(x => {
      
    if(x[0] == stor_firkant_oversikt_x){
      console.log(x);
      all_trekk_i_firkant.push(x[1]);
      if (all_trekk_i_firkant.includes(1) && all_trekk_i_firkant.includes(2) && all_trekk_i_firkant.includes(3) &&
      all_trekk_i_firkant.includes(4) && all_trekk_i_firkant.includes(5) && all_trekk_i_firkant.includes(6) &&
      all_trekk_i_firkant.includes(7) && all_trekk_i_firkant.includes(8) && all_trekk_i_firkant.includes(9)){
        store_firkanter_tatt.push(x[0]);
        //return true;
        if(x[0] == x[1]){
          win_on_last = true;
          if(win_on_last){
            c.strokeStyle = "black";
            tegn_brett();
            put_overalt = true;
          }
        }
      }
    }
  }
)}