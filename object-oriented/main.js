// canvasAPIの設定
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// 表示領域
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
// 乱数
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// ボールクラス
// x,y座標、移動幅、色、サイズを引数に取る
class Ball {
  constructor(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
  // ボールを描画するメソッド
  draw() {
    ctx.beginPath(); // 描画する宣言
    ctx.fillStyle = this.color; // 色
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // 円を描く
    ctx.fill(); // 塗りつぶす
  }

  update(){
    // x座標がキャンバスの幅より大きいか (ボールは右端から飛び出そうとしている)
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
    // x座標が 0 より小さいか (ボールは左端から飛び出そうとしている)
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
    // y座標がキャンバスの高さより大きいか (ボールは下端から飛び出そうとしている)
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
    // y座標が 0 より小さいか (ボールは上端から飛び出そうとしている)
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  // velX を x 座標に、velY を y 座標に加算しています — 結果ボールはこのメソッドが呼ばれる毎に移動します。
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(){
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }
}

// ボールを格納する配列
let balls = [];
// Ballクラスからインスタンスを生成し配列に詰める
while (balls.length < 72) {
  let size = random(10,20);
  let ball = new Ball(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();