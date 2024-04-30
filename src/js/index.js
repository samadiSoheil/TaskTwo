const $ = document;
const showListBtn = $.getElementById("show-list-btn");
const searchInput = $.getElementById("search-input");
const list = $.getElementById("list");
const tableBody = $.getElementById("table-body");
const priceBtn = $.getElementById("price-btn");
const searchFormElem = $.getElementById("search-foem");
const sortingTimeBtn = $.getElementById("time-btn");
const PriceBtnIcon = $.getElementById("price-chevron");
const timeBtnIcon = $.getElementById("time-chevron");
const errorText = $.getElementById("error-text");

// fetching data function
let response;
const fetchData = async (url) => {
  try {
    response = await fetch(url)
      .then((res) => res.json())
      .then((data) => data);
    // console.log(response);
    return await response;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

let allData;
async function showlistHandler(e) {
  allData = await fetchData(`http://localhost:3000/transactions`);
  // console.log("data : ", allData);
  let sortedWithTime = sortingWithTime([...allData]);
  removeClass(searchInput, "form");
  removeClass(list, "hidden");
  createTableBody(sortedWithTime);
  //   console.log(e.target);
  e.target.parentElement.classList.add("hidden-btn");
}

// sorting with time function
function sortingWithTime(arr, isDescSortTime = true) {
  let sortedArr = arr.sort((a, b) => {
    let date1 = new Date(a.date);
    let date2 = new Date(b.date);
    return isDescSortTime ? date2 - date1 : date1 - date2;
  });
  // console.log("sortedArr : ", sortedArr);
  return sortedArr;
}

// remove class for element
function removeClass(element, deletedClass) {
  element.classList.remove(`${deletedClass}`);
}

// create body of table
function createTableBody(allData) {
  // console.log(allData);
  if (allData.length == 0) {
    errorText.classList.remove("hidden");
  } else {
    errorText.classList.add("hidden");
  }

  let allRows = "";
  allData.forEach((item, index) => {
    allRows += `<tr>
  <td>${index + 1}</td>
  <td class=${item.type === "افزایش اعتبار" ? "text-green-500" : "text-red-500"}>
  ${item.type}
  </td>
  <td>${item.price.toLocaleString("fa")}</td>
  <td>${item.refId}</td>
  <td>${new Date(item.date).toLocaleDateString("fa-IR")}
  ساعت

  ${new Date(item.date).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  })}
  
  </td>
    </tr>`;
  });
  tableBody.innerHTML = allRows;
}

// handler function sorting Price asc or des
let isDescSortPrice = true;

async function sortPriceHandler() {
  isDescSortPrice = !isDescSortPrice;
  let sortedDatas = await fetchData(
    `http://localhost:3000/transactions?_sort=price&_order=${
      isDescSortPrice ? "desc" : "asc"
    }`
  );
  createTableBody(sortedDatas);

  // changing price chevron Style
  rotateChevron(PriceBtnIcon, "rotate-180", isDescSortPrice);
}

// handler function sort with time
let isDescSortTime = true;
function timeSortHandler() {
  isDescSortTime = !isDescSortTime;
  let newDataSorted = sortingWithTime([...allData], isDescSortTime);
  createTableBody(newDataSorted);

  // changing price chevron Style
  rotateChevron(timeBtnIcon, "rotate-180", isDescSortTime);
}

// changing chevron style function
function rotateChevron(elem, className, bolianData) {
  if (!bolianData) {
    elem.classList.add(`${className}`);
  } else {
    elem.classList.remove(`${className}`);
  }
}

async function searchForm(e) {
  e.preventDefault();
  const searchedArr = await fetchData(
    `http://localhost:3000/transactions?refId_like=${e.target.value}`
  );
  createTableBody(searchedArr);
}

showListBtn.addEventListener("click", showlistHandler);
priceBtn.addEventListener("click", sortPriceHandler);
searchFormElem.addEventListener("input", (e) => searchForm(e));
sortingTimeBtn.addEventListener("click", timeSortHandler);
