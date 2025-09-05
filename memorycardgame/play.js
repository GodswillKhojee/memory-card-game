let intro = document.querySelector('.intro')
let logo = document.querySelector('.logo-header')
let logoSpan = document.querySelectorAll('.logo')
const startGameContainer=document.querySelector(".startgame"),

startGameCards = document.querySelectorAll(".startgame .card"),
startgame = document.querySelector(".startgame button"),
playground = document.querySelector(".playground"),
faRepeat = document.querySelector(".fa-repeat");
    window.addEventListener('DOMContentLoaded',()=>{
      setTimeout(()=>{
        logoSpan.forEach((span,idx) => {
          setTimeout(()=>{
            span.classList.add('active')
        }, (idx+1)*400);
      });

      setTimeout(()=>{
        logoSpan.forEach((span,idx)=>{
          setTimeout(()=>{
            span.classList.remove('active');
            span.classList.add('fade');
          }, (idx+1)*50)
        })
      },2000);
      setTimeout(() => {
        intro.style.top= '-100vh'
      },2300);
    })
  })
  

 let levels = 2,
 columns = 2,
 rows = 2,
 matched = 0,
 cardOne,
 cardTwo,
 IsPreventClick = true;

 startGameCards.forEach((element) =>{
    element.addEventListener("click",(e) =>{
        startGameCards.forEach((el) =>{
            el.classList.remove("active");
        })
        e.target.parentElement.classList.add("active");
        levels=e.target.parentElement.getAttribute("level");
        columns = e.target.parentElement.getAttribute("column");
        rows =e.target.parentElement.getAttribute("row");

        console.log(levels,columns,rows);

    });
 });

 startgame.addEventListener("click",()=>{
    startGameContainer.style.display = "none";
    playground.style.display = "grid";
   playground.style.gridTemplateColumns = `repeat(${columns},100px)`;
   playground.style.gridTemplateRows = `repeat(${rows},100px)`;
    createCards();
 });

 function createCards(){
    const cardArr = [
        "house",
        "bomb",
        "poo",
        "gift",
        "egg",
        "dragon",
        "person-biking",
        "jet-fighter-up",
    ];
    shuffleArray(cardArr);
    console.log(cardArr)
    shuffleCard([...cardArr.slice(0, levels),...cardArr.slice(0, levels)])
 }
 const shuffleArray = (array) =>{
    for (let i = array.length - 1; i> 0; i--){
        const j = Math.floor(Math.random()* (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        console.log(temp);
    }
 }

 function shuffleCard(cards)
 {
   playground.innerHTML = "";
   shuffleArray(cards);

   for(let i = 0; i < cards.length; i++)
   {
      playground.innerHTML += 
      `<div class = "card" onclick ="flipCard(this)">
         <div class="front"><i class="fa-solid fa-question"></i></div>
         <div class="back"><i class="fa-solid fa-${cards[i]}"></i></div>
      </div>`;
   }
   faRepeat.style.display = "block";
 }

 function flipCard(card){
   

   if (cardOne != card && IsPreventClick)
   {
    card.classList.add("flip");
    if(!cardOne){
        cardOne = card;
        return
        }
        cardTwo = card;
        IsPreventClick = false;

        let cardOneValue = cardOne.querySelector(".back").innerHTML,
         cardTwoValue = cardTwo.querySelector(".back").innerHTML;
        matchCards(cardOneValue , cardTwoValue);
   }
 }
 function matchCards(cardOneValue, cardTwoValue){
    if(cardOneValue == cardTwoValue)
    {
        matched++;
        if(matched == levels){
            setTimeout(()=>{
                alert("congratulation🥳! You won...");
            },500);
        }
        cardOne.classList.add("match");
        cardTwo.classList.add("match");

        cardOne.removeAttribute("onclick");
        cardTwo.removeAttribute("onclick");

        (cardOne = null), (cardTwo = null);
        IsPreventClick = true;
        return;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 500);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        (cardOne = null), (cardTwo = null );
        IsPreventClick = true;
    }, 1200);
 }
 faRepeat.addEventListener("click",()=>{
   startGameContainer.style.display = "grid";
   playground.style.display = "none";
   faRepeat.style.display = "none";

   matched = 0,
   cardOne="",
   cardTwo,
   IsPreventClick = true;
 })
