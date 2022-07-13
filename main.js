
  let cardsArr = [];
  let checkArr = []; // массив для проверки пары
  let finishArr = [];// массив с найденными числами
  let input = document.querySelector('.input');
  let startButton = document.querySelector('.start-btn');


  //создаем рандомный массив
  function createGame () {
  let countCards = input.value;
  for (let i = 1; i <= countCards; i++) {
    cardsArr.push(i);
  }
  cardsArr.push(...cardsArr);
  cardsArr.sort(() => Math.random() - 0.5);
  return cardsArr;
  }

  //создаем поле
  function createGameCards() {
  const box = document.createElement('div');
    box.classList.add('box');
    cardsArr.forEach(el => {
      let card = document.createElement('button');
      card.disabled = false;
      box.append(card);
      card.textContent = el;
      card.classList.add('card');

      let container = document.querySelector('.container');
      container.append(box)

      return box;
    })
  }


  //переворачиваем карточку
  function flip(item) {
    item.classList.add('active');
    item.disabled = true
    checkArr.push(item);
  }

  // Начать заново
  function reload () {
    const result = confirm("Начать заново?");
    if (result) {
      document.querySelector('.box').remove()
      finishArr = []
      cardsArr = []
      checkArr = []
      startButton.disabled = false
    }
  }

  // Запускаем игру
  function createApp() {
    createGame();
    createGameCards();
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', () => {
      flip(card);
      if (checkArr.length === 2 && checkArr[0].textContent === checkArr[1].textContent) {
        checkArr.forEach((el) => {
          el.classList.add('true');
          el.disabled = true
        });
        finishArr.push(...checkArr)
        if (finishArr.length === cardsArr.length) {
          setTimeout(() => reload(), 200)
          }
        checkArr = [];        
        } else if (checkArr.length === 2 && checkArr[0].textContent !== checkArr[1].textContent) {
          setTimeout(() => checkArr.forEach((el)=>{
            el.classList.remove('active');
            el.disabled = false
            checkArr = [];
        }), 200);
        };
      })
      );
  }
  startButton.addEventListener('click', function() {
    createApp();
    startButton.disabled = true
  } )
