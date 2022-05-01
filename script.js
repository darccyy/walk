const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;
document.querySelector("#contain").append(canvas);
const ctx = canvas.getContext("2d");
F.createListeners();

var person;
var floor = 400;

function reset() {
  person = {
    head: 20,
    body: {
      x: NaN,
      y: floor - 150,
      w: 40,
      h: 60,
    },
    arm: 100,
    feet: [],
  };

  for (var i = 0; i < 2; i++) {
    person.feet.push({
      x: 20 + i * 100,
      y: floor - 30,
      w: 30,
      h: 20,
      lastStep: Date.now(),
    });
  }
}

function render() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (person) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.ellipse(
      person.body.x + person.body.w / 2,
      person.body.y - person.head,
      person.head,
      person.head,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    ctx.fillRect(person.body.x, person.body.y, person.body.w, person.body.h);

    ctx.beginPath();
    ctx.moveTo(
      person.body.x + person.body.w / 2 - person.arm,
      person.body.y + 10,
    );
    ctx.lineTo(
      person.body.x + person.body.w / 2 + person.arm,
      person.body.y + 10,
    );
    ctx.stroke();

    for (var i in person.feet) {
      ctx.fillRect(
        person.feet[i].x,
        person.feet[i].y,
        person.feet[i].w,
        person.feet[i].h,
      );
      ctx.beginPath();
      ctx.moveTo(
        person.body.x + person.body.w / 2,
        person.body.y + person.body.h / 2,
      );
      ctx.lineTo(person.feet[i].x + 10, person.feet[i].y + 10);
      ctx.stroke();
    }
  }
}

function update(mod) {
  if (F.keys.r) {
    reset();
  }

  for (var i = 0; i < person.feet.length; i++) {
    var foot = person.feet[i];

    var duration = 500;
    var length = 50;
    var height = 50;
    var time = Date.now() - foot.lastStep - i * duration * 3;

    var sinX = Math.max(0, Math.sin(time / duration));
    foot.x += sinX * mod * length;

    var sinY = Math.sin((time / duration) * 2);
    foot.y -= sinY * mod * height;

    if (foot.y >= floor - foot.h || Math.sin(time / duration) <= 0) {
      foot.y = floor - foot.h;
    }
  }

  person.body.x = (person.feet[0].x + person.feet[1].x) / 2;
}

function main() {
  render();
  update((Date.now() - then) / 1000);
  then = Date.now();
  requestAnimationFrame(main);
}
var then = Date.now();
reset();
main();
