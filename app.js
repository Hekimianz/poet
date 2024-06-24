const day = document.querySelector(".date");
const poem = document.querySelector(".poem");
let poemData = {};
const date = new Date();
const spinner = document.querySelector(".loader");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

day.innerText = `${days[date.getDay()]}, ${
  months[date.getMonth()]
} ${date.getDate()}`;

const getPoemData = () =>
  fetch("https://poetrydb.org/title")
    .then((res) => res.json())
    .then((data) => data.titles[Math.floor(Math.random() * 3010)])
    .then((title) => fetch(`https://poetrydb.org/title/${title}`))
    .then((res) => res.json())
    .then((data) => {
      poemData = data[0];
      console.log(data);
      renderPoemData();
      spinner.classList.add("hidden");
    });

getPoemData();

const renderPoemData = () => {
  const title = poemData.title;
  const titleElem = document.createElement("h2");
  titleElem.classList.add("poemTitle");
  titleElem.innerText = title;
  poem.appendChild(titleElem);
  const author = poemData.author;
  const authorElem = document.createElement("p");
  authorElem.classList.add("poemAuthor");
  authorElem.innerText = author;
  poem.appendChild(authorElem);
  poemData.lines.forEach((line) => {
    const elem = document.createElement("p");
    elem.classList.add("line");
    elem.innerText = line;
    poem.appendChild(elem);
  });
};
