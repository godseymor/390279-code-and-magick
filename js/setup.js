'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Сьебастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var wizards = [];

// MODULE4-TASK1 VARIABLES START

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setup = document.querySelector('.setup');
var setupUserName = document.querySelector('.setup-user-name');
var popupInputName = false;

var setupWizardCoat = setup.querySelector('.wizard-coat');
var setupWizardEyes = setup.querySelector('.wizard-eyes');
var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');

// MODULE4-TASK1 VARIABLES END


// MODULE5-TASK1 VARIABLES START

var setupHandle = setup.querySelector('.upload');

// MODULE5-TASK1 VARIABLES END

document.querySelector('.setup').classList.remove('hidden');

// функция получения случайного числа
var getRandomItem = function (n) {
  return Math.floor(Math.random() * n.length);
};

// функция получения случайного значения из массива
var getRandomValue = function (y) {
  return y[getRandomItem(y)];
};

var similarListElements = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// функция заполнения массива волшебниками
var createWizards = function (wizard) {
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizard.push(
        {
          name: getRandomValue(WIZARD_NAMES) + ' ' + getRandomValue(WIZARD_SURNAMES),
          coatColor: getRandomValue(WIZARD_COAT_COLORS),
          eyesColor: getRandomValue(WIZARD_EYES_COLORS)
        }
    );
  }
};

createWizards(wizards);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// функция вставки волшебников в DOM
var appendWizard = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }
  similarListElements.appendChild(fragment);
};

appendWizard();

document.querySelector('.setup-similar').classList.remove('hidden');

// MODULE4-TASK1 START

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !popupInputName) {
    closePopup();
  }
};

var onPopupInputNameFocus = function () {
  setupUserName.addEventListener('focus', function () {
    popupInputName = true;
  });
  setupUserName.addEventListener('blur', function () {
    popupInputName = false;
  });
};

onPopupInputNameFocus();

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  setup.removeAttribute('style');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var clickCustomizer = function (setupElement, colors) {
  if (setupElement !== setupWizardFireball) {
    setupElement.style.fill = getRandomValue(colors);
  }
  setupElement.style.background = getRandomValue(colors);
};

setupWizardCoat.addEventListener('click', function () {
  clickCustomizer(setupWizardCoat, WIZARD_COAT_COLORS);
});

setupWizardEyes.addEventListener('click', function () {
  clickCustomizer(setupWizardEyes, WIZARD_EYES_COLORS);
});

setupWizardFireball.addEventListener('click', function () {
  clickCustomizer(setupWizardFireball, WIZARD_FIREBALL_COLORS);
});

// MODULE4-TASK1 END

// MODULE5-TASK1 START

setupHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    setup.style.top = (setup.offsetTop - shift.y) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefalt = function () {
        evt.preventDefault();
        setupHandle.removeEventListener('click', onClickPreventDefalt);
      };
      setupHandle.addEventListener('click', onClickPreventDefalt);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// MODULE5-TASK1 END
