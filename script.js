var numbers = document.querySelectorAll("[data-number]"),
    operations = document.querySelectorAll("[data-operator]"),
    clearBtns = document.querySelectorAll("[data-clear]"),
    decimalBtn = document.getElementById('decimal'),
    result = document.getElementById('result'),
    display = document.getElementById('display'),
    memoryCurrentNumber = 0,
    memoryNewNumber = false,
    memoryPendingOperation = '';
// обработка события нажатия кнопки с цифрами
for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
};
// обработка события нажатия кнопки с опирациями
for (var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
      operationPress(e.target.textContent);
    });
};
// обработка события нажатия кнопки очистки
for (var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
      clear(e.target.textContent);
    });
};
// обработка события нажатия кнопки точка
decimalBtn.addEventListener('click', decimal);
// обработка события нажатия кнопки =
result.addEventListener('click', result);

// функция нажатия кнопки
function numberPress(number) {
    if (memoryNewNumber) {
      display.value = number;
      memoryNewNumber = false;
    } else {
      if (display.value === '0') {
        display.value = number;
      } else {
        display.value += number;
      }
    }
  };
// функция нажатия кнопки операции
  function operationPress(op) {
    let localOperationMemory = display.value;
  
    if (memoryNewNumber && memoryPendingOperation !== '=') {
      display.value = memoryCurrentNumber;
    } else {
      memoryNewNumber = true;
      switch(memoryPendingOperation) {
        case '+':
          memoryCurrentNumber = (memoryCurrentNumber + +localOperationMemory).toFixed(10);
          break;
        case '-':
          memoryCurrentNumber = (memoryCurrentNumber - +localOperationMemory).toFixed(10);
          break;
        case '*':
          memoryCurrentNumber = +(memoryCurrentNumber * +localOperationMemory).toFixed(10);
          break;
        case '/':
          memoryCurrentNumber = +(memoryCurrentNumber / +localOperationMemory).toFixed(10);
          break;        
        default: 
        memoryCurrentNumber = +localOperationMemory;
      }
      display.value = memoryCurrentNumber;
      memoryPendingOperation = op;
    }
  };
  // функция нажатия кнопки .
  function decimal(argument) {
    let localDecimalMemory = display.value;
  
    if (memoryNewNumber) {
      localDecimalMemory = '0.';
      memoryNewNumber = false;
    } else {
      if (localDecimalMemory.indexOf('.') === -1) {
        localDecimalMemory += '.';
      }
    }
    display.value = localDecimalMemory;
  };
 // функция нажатия кнопки СЕ или С
  function clear(id) {
    if (id === 'ce') {
      display.value = '0';
      memoryNewNumber = true;
    } else if (id === 'c') {
      display.value = '0';
      memoryNewNumber = true;
      MemoryCurrentNumber = 0;
      memoryPendingOperation = '';
    }
  };
  