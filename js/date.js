const currentDate = document.querySelector('#date');

function getCurrentDate() {
    const today = new Date();
    const yy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const weekday = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    const week = weekday[today.getDay()];

    currentDate.innerText = `${yy}. ${mm}. ${dd}. ${week}.`
}

getCurrentDate();
