'use strict';

document.querySelector('.setup').classList.remove('hidden');

var wizardNames = ['Иван', 'Хуан Сьебастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

// функция получения случайного значения из массива
var getRandomItem = function (n) {
  n = Math.floor(Math.random() * n.length);
  return n;
};

var similarListElements = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards.push(
      {
        name: wizardNames[getRandomItem(wizardNames)] + ' ' + wizardSurnames[getRandomItem(wizardSurnames)],
        coatColor: wizardCoatColor[getRandomItem(wizardCoatColor)],
        eyesColor: wizardEyesColor[getRandomItem(wizardEyesColor)]
      }
  );
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}

similarListElements.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
