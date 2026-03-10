const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const controlPoints: [number, number][] = [
  [54, 456], [140, 213], [476, 180], [568, 407]
];

const recursiveBezier = function (points: [number, number][], t: number): [number, number] {
  if (points.length === 1) return points[0];
  const next: [number, number][] = [];
  for (let i = 0; i < points.length - 1; i++) {
    next.push([
      t * points[i][0] + (1 - t) * points[i + 1][0],
      t * points[i][1] + (1 - t) * points[i + 1][1],
    ]);
  }
  return recursiveBezier(next, t);
}

const drawControlPoints = function () {
  ctx.fillStyle = 'white';
  for (const [x, y] of controlPoints) {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

const render = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    for (let t = 0; t <= 1.0; t += 0.001) {
      const [px, py] = recursiveBezier(controlPoints, t);
      ctx.fillRect(px, py, 1, 1);
    }
    drawControlPoints();
}

const bindClick = function () {
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(`Left button clicked - position (${x}, ${y})`);
    controlPoints.push([x, y]);
    render();
  });
}


const main = function () {
  bindClick();
  render();
}

main();
