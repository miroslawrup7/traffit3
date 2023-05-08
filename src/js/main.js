const cityListBtnLoc = document.querySelector(".city .arrow-down");
const cityListLoc = document.querySelector(".city .list");

const distanceListBtnLoc = document.querySelector(".distance .arrow-down");
const distanceListLoc = document.querySelector(".distance .list");

const sectorListBtnLoc = document.querySelector(".sector .arrow-down");
const sectorListLoc = document.querySelector(".sector .list");

const employmentFormListBtnLoc = document.querySelector(".employment-form .arrow-down");
const employmentFormListLoc = document.querySelector(".employment-form .list");

const workingHoursListBtnLoc = document.querySelector(".working-hours .arrow-down");
const workingHoursListLoc = document.querySelector(".working-hours .list");

const languageListBtnLoc = document.querySelector(".language .arrow-down");
const languageListLoc = document.querySelector(".language .list");

cityListBtnLoc.addEventListener("click", () => {
    cityListLoc.classList.toggle("expand");
})

distanceListBtnLoc.addEventListener("click", () => {
    distanceListLoc.classList.toggle("expand");
})

sectorListBtnLoc.addEventListener("click", () => {
    sectorListLoc.classList.toggle("expand");
})

employmentFormListBtnLoc.addEventListener("click", () => {
    employmentFormListLoc.classList.toggle("expand");
})

workingHoursListBtnLoc.addEventListener("click", () => {
    workingHoursListLoc.classList.toggle("expand");
})

languageListBtnLoc.addEventListener("click", () => {
    languageListLoc.classList.toggle("expand");
})