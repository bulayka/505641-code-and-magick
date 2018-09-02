'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var COLUMN_GAP = 50;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var GIST_HEIGHT = 150;
var barHeight = GIST_HEIGHT - 2 * FONT_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + GAP + i * (COLUMN_GAP + BAR_WIDTH), CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }

    ctx.beginPath();
    ctx.moveTo(CLOUD_X + GAP + i * (COLUMN_GAP + BAR_WIDTH), CLOUD_HEIGHT - GAP - FONT_GAP);
    ctx.lineTo(CLOUD_X + GAP + i * (COLUMN_GAP + BAR_WIDTH), (barHeight * times[i]) / maxTime);
    ctx.lineTo(CLOUD_X + GAP + i * (COLUMN_GAP + BAR_WIDTH) + BAR_WIDTH, (barHeight * times[i]) / maxTime);
    ctx.lineTo(CLOUD_X + GAP + i * (COLUMN_GAP + BAR_WIDTH) + BAR_WIDTH, CLOUD_HEIGHT - GAP - FONT_GAP);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + i * (COLUMN_GAP + BAR_WIDTH), (barHeight * times[i]) / maxTime - FONT_GAP);
  }
};
