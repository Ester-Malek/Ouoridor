// מערך התמונות המקורי
let arrPictures = ["a.jpg", "b.jpg", "c.jpg", "d.jpg", "e.jpg", "f.jpg", "g.jpg", "h.jpg", "i.jpg", "j.jpg", "k.jpg", "l.jpg", "m.jpg", "n.jpg", "o.jpg", "p.jpg"];

let container = document.querySelector(".container");
let numCupples = 8; // מספר הזוגות (שימי לב שלא יעלה על אורך המערך)
let updateArr = [];
let firstCard = null, secondCard = null;
let canClick = true; // משתנה למניעת לחיצות בזמן בדיקה

// 1. בחירת תמונות ייחודיות ויצירת זוגות
let tempPictures = [...arrPictures]; // העתקה כדי לא להרוס את המקור
for (let i = 0; i < numCupples; i++) {
    let randomIndex = Math.floor(Math.random() * tempPictures.length);
    let pic = tempPictures.splice(randomIndex, 1)[0]; // מוציא תמונה אחת מהמערך
    updateArr.push(pic, pic); // מוסיף אותה פעמיים למערך המשחק
}

// 2. ערבוב המערך הסופי (כדי שהזוגות לא יהיו צמודים)
updateArr.sort(() => Math.random() - 0.5);

// 3. יצירת הקלפים ב-DOM
updateArr.forEach((picName) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = picName; // שמירת שם התמונה בתוך attribute מוסתר
    
    // הוספת אירוע לחיצה
    card.addEventListener('click', clickOnCard);
    
    container.append(card);
});

// 4. פונקציית הלחיצה
function clickOnCard(e) {
    let clickedCard = e.currentTarget;

    // מניעת לחיצה אם זה אותו קלף, או אם כבר פתוחים שניים, או אם הקלף כבר פתור
    if (!canClick || clickedCard === firstCard || clickedCard.classList.contains("matched")) return;

    // הצגת התמונה (הוספת מחלקה או שינוי עיצוב)
    clickedCard.style.backgroundImage = `url('./pictures/${clickedCard.dataset.image}')`;
    clickedCard.classList.add("flipped");

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        checkMatch();
    }
}

function checkMatch() {
    canClick = false; // חסימת לחיצות נוספות
    
    if (firstCard.dataset.image === secondCard.dataset.image) {
        // יש התאמה!
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetTurn();
    } else {
        // אין התאמה - הופכים חזרה אחרי שנייה
        setTimeout(() => {
            firstCard.style.backgroundImage = "";
            secondCard.style.backgroundImage = "";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    canClick = true;
}