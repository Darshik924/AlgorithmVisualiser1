const bubble = document.querySelector(".bubble");
const selection = document.querySelector(".selection");
const quick = document.querySelector(".quick");
const startbtn = document.querySelector(".start-sort");

const container = document.querySelector(".container");
const userData = document.querySelector(".datainput");
const submit_btn = document.querySelector(".submit-value");

let choice;

userData.style.visibility = "hidden";
submit_btn.style.visibility = "hidden";
container.style.visibility = "hidden";
startbtn.style.visibility = "hidden";

bubble.addEventListener("click", () => {
  userData.style.visibility = "visible";
  submit_btn.style.visibility = "visible";
  choice = "bubble";
});
selection.addEventListener("click", () => {
  userData.style.visibility = "visible";
  submit_btn.style.visibility = "visible";
  choice = "selection";
});
quick.addEventListener("click", () => {
  userData.style.visibility = "visible";
  submit_btn.style.visibility = "visible";
  choice = "quick";
});

const choose_algo = document.querySelector(".choose-algo");
let arrNum;
submit_btn.addEventListener("click", () => {
  choose_algo.style.display = "none";
  userData.style.display = "none";
  submit_btn.style.display = "none";
  container.style.visibility = "visible";
  startbtn.style.visibility = "visible";

  const textArea = document.querySelector(".input-content");
  const arr = textArea.value.split(" ");
  arrNum = arr.map((value) => {
    return parseInt(value);
  });

  const n = document.querySelector(".input-length").value;
  for (let i = 0; i < n; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("box");
    newDiv.classList.add("pending");
    newDiv.textContent = arrNum[i];
    container.appendChild(newDiv);
    newDiv.style.order = i;
  }
});

const DELAY = 1000;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swap(el1, el2) {
  const distance = el2.offsetLeft - el1.offsetLeft;

  el1.style.transform = `translateX(${distance}px)`;
  el2.style.transform = `translateX(-${distance}px)`;

  await delay(DELAY);

  el1.style.transition = "none";
  el2.style.transition = "none";

  el2.style.transform = "none";
  el1.style.transform = "none";

  let Temp = el1.textContent;
  el1.textContent = el2.textContent;
  el2.textContent = Temp;

  setTimeout(() => {
    el1.style.transition = "background-color 0.3s ease, transform 0.3s ease";
    el2.style.transition = "background-color 0.3s ease, transform 0.3s ease";
  }, 20);
}

async function bubbleSort() {
  let boxes = document.querySelectorAll(".box");
  const n = boxes.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      let boxes = document.querySelectorAll(".box");
      const box1 = boxes[j];
      const box2 = boxes[j + 1];

      box1.classList.remove("pending");
      box2.classList.remove("pending");
      box1.classList.add("comparing");
      box2.classList.add("comparing");
      await delay(DELAY);
      if (parseInt(box1.textContent) > parseInt(box2.textContent)) {
        await swap(box1, box2);
      }

      box1.classList.remove("comparing");
      box2.classList.remove("comparing");
      box1.classList.add("pending");
      box2.classList.add("pending");
      await delay(DELAY);
    }

    const boxes = document.querySelectorAll(".box");
    boxes[n - i - 1].classList.add("sorted");
    boxes[n - i - 1].classList.remove("pending");
    await delay(DELAY);
  }
  document.querySelectorAll(".box")[0].classList.remove("pending");
  document.querySelectorAll(".box")[0].classList.add("sorted");
}

async function selectionSort() {
  let boxes = document.querySelectorAll(".box");
  const n = boxes.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    boxes[minIndex].classList.remove("pending");
    boxes[minIndex].classList.add("minfound");

    for (let j = i + 1; j < n; j++) {
      boxes[j].classList.remove("pending");
      boxes[j].classList.add("comparing");
      await delay(DELAY);

      if (
        parseInt(boxes[j].textContent) < parseInt(boxes[minIndex].textContent)
      ) {
        if (minIndex !== i) {
          boxes[minIndex].classList.remove("minfound");
          boxes[minIndex].classList.add("pending");
          await delay(DELAY);
        }
        minIndex = j;

        boxes[minIndex].classList.remove("comparing");
        boxes[minIndex].classList.add("minfound");
        await delay(DELAY);
      } else {
        boxes[j].classList.remove("comparing");
        boxes[j].classList.add("pending");
        await delay(DELAY);
      }
    }

    if (minIndex !== i) {
      await swap(boxes[i], boxes[minIndex]);

      boxes[minIndex].classList.remove("minfound");
      boxes[minIndex].classList.add("pending");
      await delay(DELAY);
    } else {
      boxes[minIndex].classList.remove("minfound");
      await delay(DELAY);
    }

    boxes[i].classList.remove("pending");
    boxes[i].classList.add("sorted");
  }
  await delay(DELAY);
  boxes[n - 1].classList.add("sorted");
  boxes[n - 1].classList.remove("pending");
}

async function quickSort() {
  
}

startbtn.addEventListener("click", () => {
  if (choice === "bubble") {
    bubbleSort();
  } else if (choice === "selection") {
    selectionSort();
  } else if (choice === "quick") {
    quickSort();
  }
});
