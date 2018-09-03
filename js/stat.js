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
var BAR_HEIGHT = GIST_HEIGHT - FONT_GAP;

var renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
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
  renderRect(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + 3 * GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 3 * GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + 2 * GAP + i * (COLUMN_GAP + BAR_WIDTH), CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }

    renderRect(ctx, CLOUD_X + 2 * GAP + i * (COLUMN_GAP + BAR_WIDTH), CLOUD_HEIGHT - GAP - FONT_GAP - (BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + 2 * GAP + i * (COLUMN_GAP + BAR_WIDTH), CLOUD_HEIGHT - GAP - FONT_GAP - (BAR_HEIGHT * times[i]) / maxTime - FONT_GAP);
  }
};
