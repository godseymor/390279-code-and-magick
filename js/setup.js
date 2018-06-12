'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Сьебастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;
var wizards = [];

document.querySelector('.setup').classList.remove('hidden');

// функция получения случайного значения из массива
var getRandomItem = function (n) {
  return Math.floor(Math.random() * n.length);
};

var similarListElements = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// функция заполнения массива волшебниками
var createWizards = function (wizard) {
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizard.push(
        {
          name: WIZARD_NAMES[getRandomItem(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomItem(WIZARD_SURNAMES)],
          coatColor: WIZARD_COAT_COLOR[getRandomItem(WIZARD_COAT_COLOR)],
          eyesColor: WIZARD_EYES_COLOR[getRandomItem(WIZARD_EYES_COLOR)]
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
