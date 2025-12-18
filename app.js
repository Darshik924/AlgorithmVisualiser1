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

async function quickSort(low, high) {
  let boxes = document.querySelectorAll(".box");

  if (low < high) {
    let pi = await partition(low, high);

    // Recursively sort elements before partition and after partition
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  } else {
    if (low >= 0 && low < boxes.length && low === high) {
      boxes[low].classList.remove("pending");
      boxes[low].classList.add("sorted");
    }
  }
}

async function partition(low, high) {
  let boxes = document.querySelectorAll(".box");

  let pivotIndex = high;
  let pivotValue = parseInt(boxes[pivotIndex].textContent);

  boxes[pivotIndex].classList.add("pivot");
  boxes[pivotIndex].classList.remove("pending");
  await delay(DELAY);

  let i = low - 1;

  for (let j = low; j < high; j++) {
    boxes[j].classList.add("comparing");
    boxes[j].classList.remove("pending");
    await delay(DELAY);

    let currentValue = parseInt(boxes[j].textContent);

    if (currentValue < pivotValue) {
      i++;
      if (i !== j) {
        boxes[i].classList.add("comparing");
        await delay(DELAY);
        await swap(boxes[i], boxes[j]);
        boxes[i].classList.remove("comparing");
      }
    }

    boxes[j].classList.remove("comparing");
    boxes[j].classList.add("pending");
    await delay(DELAY);
  }

  if (i + 1 !== high) {
    await swap(boxes[i + 1], boxes[high]);
  }

  boxes[high].classList.remove("pivot");
  boxes[high].classList.add("pending");

  boxes[i + 1].classList.remove("pending");
  boxes[i + 1].classList.remove("pivot");
  boxes[i + 1].classList.add("sorted");

  await delay(DELAY);

  return i + 1;
}

startbtn.addEventListener("click", async () => {
  startbtn.disabled = true;
  if (choice === "bubble") {
    await bubbleSort();
  } else if (choice === "selection") {
    await selectionSort();
  } else if (choice === "quick") {
    let boxes = document.querySelectorAll(".box");
    await quickSort(0, boxes.length - 1);
  }
  startbtn.disabled = false;
});
