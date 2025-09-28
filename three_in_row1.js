var canvas = document.querySelector('#board1');
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

