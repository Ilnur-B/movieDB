/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};

document.querySelectorAll(".promo__adv img").forEach(function (item) {
  item.style.display = "none";
});

// document.querySelector(".promo__genre").innerHTML =
//   '<div class="promo__genre">ДРАМА</div>';
document.querySelector(".promo__genre").textContent = "драма";
document.querySelector(".promo__bg").style.backgroundImage =
  "url('img/bg.jpg')";

let sortedFilms;
function sortFilms() {
  sortedFilms = movieDB.movies.sort();
}
// function sortArr(arr) {
//   return arr.sort();
// }

// let sortedArr = sortArr(путь);

const films = document.querySelector(".promo__interactive-list");

function listFilms() {
  films.innerHTML = "";
  sortFilms();
  sortedFilms.forEach(function (item, i) {
    //+= для записи каждого значения массива
    films.innerHTML += `
    <li class="promo__interactive-item">${i + 1}. ${item}
      <div class="delete"></div>
    </li>`;
  });

  const del = document.querySelectorAll(".delete").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      btn.parentElement.remove(); //удалит родительский эл-т
      movieDB.movies.splice(i, 1); //удалит из массива

      listFilms(); //рекурсия для отрисовки списка снова
    });
  });
}
listFilms();

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

let input = document.querySelector(".adding__input");
const btn = document.querySelector("form.add");
const checkBox = document.querySelector("[type = 'checkbox']");

btn.addEventListener("submit", function (e) {
  let newFilm = input.value;
  let favFilm = checkBox.checked;
  e.preventDefault();
  if (newFilm) {
    //проверка на пустую строку
    if (newFilm.length > 21) {
      //если слово длиннее 21
      newFilm = `${newFilm.substr(0, 21)}...`;
    } else if (favFilm) {
      console.log("Добавляем любимый фильм");
      newFilm = "";
    }
    movieDB.movies.push(newFilm);

    listFilms();
  }
  e.target.reset();
});
