let arrPictures = ["0.jpg","1.jpg","2.jpg","3.jpg",
"4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg",
"10.jpg","11.jpg","12.jpg","13.jpg","14.jpg"];

let container= document.querySelector(".container");
let level=document.querySelectorAll('input[name="difficulty"]');//מערך של סוגי השלב קל בינוני קשה
let numCupples;
let updateArr=[];
let firstCard,secondCard;
let count=0;
let card;
let succeed=0;
let s= document.querySelector(".s");
//s.onclick=start;
s.addEventListener('click',start);

//s.onclick=
function start(){
container.innerHTML="";//ניקוי הקונטיינר לפני התחלת משחק חדש
if(level[0].checked)
    numCupples=6;
else if(level[1].checked)
    numCupples=10;
else if(level[1].checked)
    numCupples=15;
else
    alert("בחר רמת קושי");
updateArr=arrPictures.slice(0,numCupples);
updateArr=updateArr.concat(updateArr);//הכפלה
mix();//ערבוב המערך
for(let i=0;i<updateArr.length;i++)
{
    card=document.createElement("div");
    card.classList.add("card");
    //let random=Math.floor(Math.random()*updateArr.length-1);
    card.addEventListener('click',press)
    //card.onclick=press;
    container.append(card);
    card.dataset.image = updateArr[i]; // שמירת שם התמונה בתוך attribute מוסתר
   //updateArr.splice(random,1);//מחיקה ממערך תמונות כדי שלא יגריל אותו דבר פעמיים 
}
function mix(){
    for(let i=updateArr.length-1;i>0;i--)
    {
        let random=Math.floor(Math.random()*(i+1));
        let temp=updateArr[i];
        updateArr[i]=updateArr[random];
        updateArr[random]=temp;
    }
}

}
function press(e)
{
    if(count>=2)
        return;
    if(count==0)
    {
        firstCard=e.target;
        firstCard.style.backgroundImage="url('./pictures/"+ firstCard.dataset.image +"')";
        count++;
    }
    else if(count==1)
    {
        if (e.target!=firstCard) {
        secondCard=e.target;
        secondCard.style.backgroundImage="url('./pictures/"+ secondCard.dataset.image +"')";
        count++;
        
        if(firstCard.dataset.image==secondCard.dataset.image)
        {
            setTimeout(() => {
                firstCard.style.visibility = "hidden"; // מחביא את firstCard 
                secondCard.style.visibility = "hidden"; // מחביא את firstCard
                succeed++;
                if(succeed==numCupples)
                {
                    alert("כל הכבוד! סיימת את המשחק!");
                }
                count=0;
            }, 1000);
        }
        else
        {
            setTimeout(() => {
                firstCard.style.backgroundImage="";
                secondCard.style.backgroundImage="";
                count=0;
            }, 1000);
        }
        }   
        /*secondCard=e.target;
        secondCard.style.backgroundImage="url('./pictures/"+ secondCard.dataset.image +"')";
        count++;*/
    }
}

//start();