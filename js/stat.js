'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var INITIAL_X = 100;
var INITIAL_Y = 10;
var GAP = 10;

var WINNERS_TEXT_X = 235;
var WINNERS_TEXT_Y = 40;

var CENTERED_TIME_X = 145;
var CENTERED_TIME_Y = 80;

var BAR_CHART_HEIGHT = 150; //  общая высота гистограммы
var SINGLE_BAR_WIDTH = 40; // ширина одной колонки
var BAR_INDENT = 50; // отступ между колонками
var FONT_GAP = 20; // отступ для текста

var FIRST_BAR_WIDTH = INITIAL_X + SINGLE_BAR_WIDTH;
var FIRST_BAR_Y = CLOUD_HEIGHT - INITIAL_Y - FONT_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, INITIAL_X + GAP, INITIAL_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, INITIAL_X, INITIAL_Y, '#fff');

  var getRandomOpacity = function () { //  получение рандомной прозрачности для цвета
    return 'rgba(0, 0, 255, ' + Math.ceil(Math.random() * 10) / 10 + ')';
  };

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', WINNERS_TEXT_X, WINNERS_TEXT_Y);
  ctx.fillText('Список результатов:', WINNERS_TEXT_X - GAP, WINNERS_TEXT_Y + GAP * 2);

  var max = -1;

  var getMaxTime = function () {
    for (var i = 0; i < times.length; i++) {
      var time = times[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  };

  var getWorstPlayerName = function () {
    return times.indexOf(max);
  };

  ctx.fillText('Худшее время: ' + Math.floor(getMaxTime()) + ' ms у игрока ' + names[getWorstPlayerName()], CENTERED_TIME_X, CENTERED_TIME_Y);

  var renderGraphRect = function (y) {
    ctx.fillStyle = (names[y] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomOpacity();
    ctx.fillRect(FIRST_BAR_WIDTH + (BAR_INDENT + SINGLE_BAR_WIDTH) * y, FIRST_BAR_Y, SINGLE_BAR_WIDTH, -(times[y] * BAR_CHART_HEIGHT / getMaxTime()));
    ctx.fillStyle = (names[y] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[y], FIRST_BAR_WIDTH + (BAR_INDENT + SINGLE_BAR_WIDTH) * y, CLOUD_HEIGHT - INITIAL_Y);
  };

  for (var y = 0; y < names.length; y++) {
    renderGraphRect(y);
  }
};
