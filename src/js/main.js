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

const awardedResultsLoc = document.querySelector(".awarded");
const recordsOnPageLoc = document.querySelector(".records-on-page");
const pagesSwitchLoc = document.querySelector(".pages");

const brancheWrapperLoc = document.querySelector(".sector");
const brancheListLoc = document.querySelector(".sector .list");
const branchesLoc = document.querySelector(".sector ul");

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






let filterConfigData = {};
let apiPage = 1;
let rawAPIArray = [];
let allRecordsArray = [];
let recordsNumber = 0;
let recordsOnPage = 20;
let filtersON = false;
let filterBranchesList = [];
let filterListMaxHeight = 0;

recordsOnPageLoc.value = recordsOnPage;

// filter the data to create FILTERED OBJECTS ARRAY ///////////////////////////////
const createFilteredRecordsArray = () => {
    const branchesChildrenLoc = document.querySelectorAll(".branches option");
    const jobFormChildrenLoc = document.querySelectorAll(".job-form option");
    const jobTypeChildrenLoc = document.querySelectorAll(".job-type option");
    const langChildrenLoc = document.querySelectorAll(".lang option");
    const countriesChildrenLoc = document.querySelectorAll(".countries option");
    const citiesChildrenLoc = document.querySelectorAll(".cities option");

    let filteredRecordsArray = allRecordsArray;

    // selectedBranches ////////////////

    let selectedBranches = [];

    if (
        filterConfigData.branche_filter.length 
        // && !filterConfigData.branche_visible
    ) {
        selectedBranches = filterConfigData.branche_filter;
    } else {
        selectedBranches = Array.from(branchesChildrenLoc)
            .filter(function (elem) {
                return elem.selected;
            })
            .map(function (elem) {
                return elem.value;
            });
    }

    let filteredRecordsArray_1 = [];

    if (selectedBranches.length !== 0) {
        filteredRecordsArray.forEach((el, index) => {
            let addFlag = false;

            selectedBranches.forEach((selectedFiltr) => {
                if (el.branche === selectedFiltr) {
                    addFlag = true;
                }
            });

            if (addFlag) {
                filteredRecordsArray_1.push(el);
            }
        });
    } else {
        filteredRecordsArray_1 = filteredRecordsArray;
    }

    // selectedJobForms ////////////////

    let selectedJobForms = Array.from(jobFormChildrenLoc)
        .filter(function (elem) {
            return elem.selected;
        })
        .map(function (elem) {
            return elem.value;
        });

    let filteredRecordsArray_2 = [];

    if (selectedJobForms.length !== 0) {
        filteredRecordsArray_1.forEach((el, index) => {
            if (el.jobForm) {
                let addFlag = false;

                selectedJobForms.forEach((selectedFiltr) => {
                    if (el.jobForm.indexOf(selectedFiltr) !== -1) {
                        addFlag = true;
                    }
                });

                if (addFlag) {
                    filteredRecordsArray_2.push(el);
                }
            }
        });
    } else {
        filteredRecordsArray_2 = filteredRecordsArray_1;
    }

    // selectedJobTypes////////////////

    let selectedjobTypes = Array.from(jobTypeChildrenLoc)
        .filter(function (elem) {
            return elem.selected;
        })
        .map(function (elem) {
            return elem.value;
        });

    let filteredRecordsArray_3 = [];

    if (selectedjobTypes.length !== 0) {
        filteredRecordsArray_2.forEach((el, index) => {
            let addFlag = false;

            selectedjobTypes.forEach((selectedFiltr) => {
                if (el.jobType === selectedFiltr) {
                    addFlag = true;
                }
            });

            if (addFlag) {
                filteredRecordsArray_3.push(el);
            }
        });
    } else {
        filteredRecordsArray_3 = filteredRecordsArray_2;
    }

    // selectedLangs ////////////////
    let selectedLangs = [];

    if (
        filterConfigData.language_filter.length 
        // && !filterConfigData.language_visible
    ) {
        selectedLangs = filterConfigData.language_filter;
    } else {
        selectedLangs = Array.from(langChildrenLoc)
            .filter(function (elem) {
                return elem.selected;
            })
            .map(function (elem) {
                return elem.value;
            });
    }

    let filteredRecordsArray_4 = [];

    if (selectedLangs.length !== 0) {
        filteredRecordsArray_3.forEach((el, index) => {
            let addFlag = false;

            selectedLangs.forEach((selectedFiltr) => {
                if (el.lang === selectedFiltr) {
                    addFlag = true;
                }
            });

            if (addFlag) {
                filteredRecordsArray_4.push(el);
            }
        });
    } else {
        filteredRecordsArray_4 = filteredRecordsArray_3;
    }

    // selectedSalary ////////////////

    let selectedValOne;
    let selectedValTwo;
    if (salaryMarkLoc.checked) {
        selectedValOne = parseInt(displayValOne.innerText);
        selectedValTwo = parseInt(displayValTwo.innerText);
    }

    let filteredRecordsArray_5 = [];

    if (salaryMarkLoc.checked) {
        filteredRecordsArray_4.forEach((el, index) => {
            let addFlag = false;

            if (el.visibleRate) {
                if (el.salaryTo && el.salaryFrom) {
                    if (
                        el.salaryTo >= selectedValOne &&
                        el.salaryFrom <= selectedValTwo
                    ) {
                        addFlag = true;
                    }
                }
                if (el.salaryTo && !el.salaryFrom) {
                    if (el.salaryTo >= selectedValOne) {
                        addFlag = true;
                    }
                }
                if (!el.salaryTo && el.salaryFrom) {
                    if (el.salaryFrom <= selectedValTwo) {
                        addFlag = true;
                    }
                }
            }

            if (addFlag) {
                filteredRecordsArray_5.push(el);
            }
        });
    } else {
        filteredRecordsArray_5 = filteredRecordsArray_4;
    }

    // selectedCountry ////////////////

    let selectedCountry = [];

    if (
        filterConfigData.location_country_filter.length 
        // && !filterConfigData.location_visible
    ) {
        selectedCountry = filterConfigData.location_country_filter;
    } else {
        if (locationMarkLoc.checked) {
            selectedCountry = Array.from(countriesChildrenLoc)
                .filter(function (elem) {
                    if (elem.value) {
                        return elem.selected;
                    }
                })
                .map(function (elem) {
                    if (elem.value) {
                        return elem.value;
                    }
                });
        }
    }

    let filteredRecordsArray_6 = [];

    if (
        locationMarkLoc.checked ||
        (filterConfigData.location_country_filter.length 
            // && !filterConfigData.location_visible
            )
    ) {
        if (selectedCountry.length) {
            filteredRecordsArray_5.forEach((el, index) => {
                let addFlag = false;

                selectedCountry.forEach((selectedFiltr) => {
                    if (el.country === selectedFiltr) {
                        addFlag = true;
                    }
                });

                if (addFlag) {
                    filteredRecordsArray_6.push(el);
                }
            });
        } else {
            filteredRecordsArray_6 = filteredRecordsArray_5;
        }
    } else {
        filteredRecordsArray_6 = filteredRecordsArray_5;
    }

    // selectedCity & selectedDistance ////////////////

    let selectedCity = [];

    if (
        filterConfigData.location_city_filter.length
        // && !filterConfigData.location_visible
    ) {
        selectedCity = filterConfigData.location_city_filter;
    } else {
        if (locationMarkLoc.checked) {
            selectedCity = Array.from(citiesChildrenLoc)
                .filter(function (elem) {
                    if (elem.value) {
                        return elem.selected;
                    }
                })
                .map(function (elem) {
                    if (elem.value) {
                        return elem.value;
                    }
                });
        }
    }

    let filteredRecordsArray_7 = [];

    if (
        locationMarkLoc.checked ||
        (filterConfigData.location_city_filter.length 
            // && !filterConfigData.location_visible
            )
    ) {
        if (selectedCity.length) {
            let selectedDistance = 0;

            selectedDistance = parseInt(locationDotLoc.value);

            let lati;
            let longi;
            let min_lati;
            let max_lati;
            let min_longi;
            let max_longi;

            filteredRecordsArray_6.forEach((el, index) => {
                if (el.city === selectedCity[0]) {
                    lati = el.lati;
                    longi = el.longi;

                    min_lati = lati - selectedDistance * 0.009044;
                    max_lati = lati + selectedDistance * 0.009044;
                    min_longi =
                        longi -
                        (selectedDistance * 0.0089831) /
                            Math.cos((lati * Math.PI) / 180);
                    max_longi =
                        longi +
                        (selectedDistance * 0.0089831) /
                            Math.cos((lati * Math.PI) / 180);
                }
            });

            filteredRecordsArray_6.forEach((el, index) => {
                let addFlag = false;

                if (
                    el.lati <= max_lati &&
                    el.lati >= min_lati &&
                    el.longi <= max_longi &&
                    el.longi >= min_longi
                ) {
                    addFlag = true;
                }

                if (addFlag) {
                    filteredRecordsArray_7.push(el);
                }
            });
        } else {
            filteredRecordsArray_7 = filteredRecordsArray_6;
        }
    } else {
        filteredRecordsArray_7 = filteredRecordsArray_6;
    }

    // selectedRemote ////////////////

    let filteredRecordsArray_8 = [];

    if (
        remoteLoc.checked ||
        (filterConfigData.remote_filter 
            // && !filterConfigData.remote_visible
            )
    ) {
        filteredRecordsArray_7.forEach((el, index) => {
            let addFlag = false;

            if (el.remote) {
                addFlag = true;
            }

            if (addFlag) {
                filteredRecordsArray_8.push(el);
            }
        });
    } else {
        filteredRecordsArray_8 = filteredRecordsArray_7;
    }

    // selectedRelocation ////////////////

    let filteredRecordsArray_9 = [];

    if (relocationLoc.checked) {
        filteredRecordsArray_8.forEach((el, index) => {
            let addFlag = false;

            if (el.relocation) {
                addFlag = true;
            }

            if (addFlag) {
                filteredRecordsArray_9.push(el);
            }
        });
    } else {
        filteredRecordsArray_9 = filteredRecordsArray_8;
    }

    // searchText ////////////////

    let filteredRecordsArray_10 = [];

    let searchText = searchInputLoc.value;

    if (searchText) {
        filteredRecordsArray_9.forEach((el, index) => {
            let addFlag = false;

            let position;

            el.description.forEach(function (elem) {
                if (elem.value && elem.field_id !== "geolocation") {
                    position = elem.value
                        .toLowerCase()
                        .search(searchText.toLowerCase());
                    if (position !== -1) {
                        addFlag = true;
                    }
                }
            });

            position = el.name.toLowerCase().search(searchText.toLowerCase());
            if (position !== -1) {
                addFlag = true;
            }

            if (addFlag) {
                filteredRecordsArray_10.push(el);
            }
        });
    } else {
        filteredRecordsArray_10 = filteredRecordsArray_9;
    }

    // selectedRecruitmentType (coloring of records) ////////////////
    filteredRecordsArray_11 = [];
    
    let selectedRecruitmentType = [];

    if (filterConfigData.recruitmentType_filter.length) {
        selectedRecruitmentType = filterConfigData.recruitmentType_filter;
    }

    if (selectedRecruitmentType.length !== 0) {
        filteredRecordsArray_10.forEach((el, index) => {
            let addFlag = false;

            selectedRecruitmentType.forEach((selectedFiltr) => {
                if (el.recruitmentType === selectedFiltr) {
                    addFlag = true;
                }
            });

            if (addFlag) {
                filteredRecordsArray_11.push(el);
            }
        });
    } else {
        filteredRecordsArray_11 = filteredRecordsArray_10;
    }

    recordsNumber = filteredRecordsArray_11.length;
    summariseDownload(recordsNumber);
    createRecordBoxes(filteredRecordsArray_11, 0, recordsOnPage);
    setPages(recordsNumber);
    filtersON = true;
    hideFilter();
    
    setTimeout(setParentIframeHeight, 1000);
    
};

const pagesContainerStart = () => {
    pagesContainer.classList.add("active");
};

const dropDownBtnStart = () => {
    dropDownLoc.addEventListener("click", showHideFilters);

    dropDownLoc.classList.add("active");
};

// create HTML FILTERS LISTS //////////////////////////////////////////////////////
const createFilterLists = (filterConfigData) => {

    // if (!filterConfigData.salary_visible) {
    //     salaryLoc.classList.add("unactive");
    // }

    // if (!filterConfigData.relocation_visible) {
    //     relocationWrapperLoc.classList.add("unactive");
    // }

    // if (!filterConfigData.language_visible) {
    //     langWrapperLoc.classList.add("unactive");
    // }

    // if (!filterConfigData.remote_visible) {
    //     remoteWrapperLoc.classList.add("unactive");
    // }

    // if (!filterConfigData.location_visible) {
    //     locWrapperLoc.classList.add("unactive");
    // }

    if (!filterConfigData.branche_visible) {
        brancheWrapperLoc.classList.add("unactive");
    }

    // let isSamsungBrowser = navigator.userAgent.match(/SamsungBrowser/i);
    // let isChromeBrowser = navigator.userAgent.match(/Chrome/i);

    if (filterBranchesList.length > 0) {
        filterBranchesList.sort(function (a, b) {
            return a.localeCompare(b);
        });
        rowHeight = filterBranchesList.length * 21 + 3;
        filterListMaxHeight = rowHeight;
        // if (getMobileOperatingSystem() === "unknown") {
            // brancheListLoc.style.height = String(rowHeight) + "px";
        // } else if (isSamsungBrowser || isChromeBrowser) {
        //     branchesLoc.style.height = "50px";
        // } else {
        //     branchesLoc.style.height = String(rowHeight) + "px";
        // }
        
        filterBranchesList.forEach(function (el) {
            branchesLoc.insertAdjacentHTML(
                "beforeend",
                `<li>
                <div class="checkbox-container-small">
                    <label class="checkbox">
                        <input type="checkbox" id="sector-${el}" name="sector-${el}" value="sector-${el}">
                        <span class="checkmark"></span>
                    </label>
                    <label class="label-text" for="sector-${el}">${el}</label>
                </div>
            </li>`
            );
            
        });
    }

    // if (filterJobFormList.length > 0) {
    //     filterJobFormList.sort(function (a, b) {
    //         return a.localeCompare(b);
    //     });
    //     rowHeight = filterJobFormList.length * 21 + 3;
    //     // if (getMobileOperatingSystem() === "unknown") {
    //         jobFormLoc.style.height = String(rowHeight) + "px";
    //     // } else if (isSamsungBrowser || isChromeBrowser) {
    //     //     jobFormLoc.style.height = "50px";
    //     // } else {
    //     //     jobFormLoc.style.height = String(rowHeight) + "px";
    //     // }
    //     filterJobFormList.forEach(function (el) {
    //         jobFormLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${el}">${el}</option>`
    //         );
    //     });
    // }

    // if (filterJobTypeList.length > 0) {
    //     filterJobTypeList.sort(function (a, b) {
    //         return a.localeCompare(b);
    //     });
    //     rowHeight = filterJobTypeList.length * 21 + 3;
    //     // if (getMobileOperatingSystem() === "unknown") {
    //         jobTypeLoc.style.height = String(rowHeight) + "px";
    //     // } else if (isSamsungBrowser || isChromeBrowser) {
    //     //     jobTypeLoc.style.height = "50px";
    //     // } else {
    //     //     jobTypeLoc.style.height = String(rowHeight) + "px";
    //     // }
    //     filterJobTypeList.forEach(function (el) {
    //         jobTypeLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${el}">${el}</option>`
    //         );
    //     });
    // }

    // if (filterLangList.length > 0) {
    //     filterLangList.sort(function (a, b) {
    //         return a.localeCompare(b);
    //     });
    //     rowHeight = filterLangList.length * 21 + 3;
    //     // if (getMobileOperatingSystem() === "unknown") {
    //         langLoc.style.height = String(rowHeight) + "px";
    //     // } else if (isSamsungBrowser || isChromeBrowser) {
    //     //     langLoc.style.height = "50px";
    //     // } else {
    //     //     langLoc.style.height = String(rowHeight) + "px";
    //     // }
    //     filterLangList.forEach(function (el) {
    //         langLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${el}">${el}</option>`
    //         );
    //     });
    // }

    // if (Object.keys(filterCountriesList).length > 0) {
    //     countriesLoc.insertAdjacentHTML(
    //         "beforeend",
    //         `<option value="" class="placeholder">Państwo</option>`
    //     );

    //     citiesLoc.insertAdjacentHTML(
    //         "beforeend",
    //         `<option value="" class="placeholder">Miasto</option>`
    //     );

    //     function compare(a, b) {
    //         return a.city.localeCompare(b.city);
    //     }

    //     for (let key in filterCountriesList) {
    //         filterCountriesList[key].sort(compare);
    //     }

    //     filterCountriesList = Object.keys(filterCountriesList)
    //         .sort()
    //         .reduce((accumulator, key) => {
    //             accumulator[key] = filterCountriesList[key];
    //             return accumulator;
    //         }, {});

    //     let allCitiesObj = [];
    //     for (let key in filterCountriesList) {
    //         countriesLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${key}">${key}</option>`
    //         );
    //         allCitiesObj = allCitiesObj.concat(filterCountriesList[key]);
    //     }

    //     let allCitiesArray = [];
    //     allCitiesObj.forEach((el) => {
    //         allCitiesArray.push(el.city);
    //     });

    //     allCitiesArray.sort(function (a, b) {
    //         return a.localeCompare(b);
    //     });

    //     allCitiesArray.forEach(function (el) {
    //         citiesLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${el}" class="active">${el} </option>`
    //         );
    //     });
    // }

    // sliderOne.min = filterMinSalary.toString();
    // sliderTwo.min = filterMinSalary.toString();
    // sliderOne.max = filterMaxSalary.toString();
    // sliderTwo.max = filterMaxSalary.toString();
    // sliderOne.value = filterMinSalary.toString();
    // sliderTwo.value = filterMaxSalary.toString();
    // slideOne();
    // slideTwo();
};

// PAGES /////////////////////////////////////////////////////////////
const changePage = (pageBtn) => {
    pageButtonsLoc.forEach((el) => {
        el.classList.remove("active");
    });
    pageBtn.classList.add("active");
    let firstRecord =
        recordsOnPage * parseInt(pageBtn.innerText) - recordsOnPage;
    let lastRecord = recordsOnPage * parseInt(pageBtn.innerText);

    filtersON
        ? createRecordBoxes(filteredRecordsArray_11, firstRecord, lastRecord)
        : createRecordBoxes(allRecordsArray, firstRecord, lastRecord);
    globActivePageNo = parseInt(pageBtn.innerText);
    setTimeout(setParentIframeHeight(), 500);
};

// RWD /////////////////////////////////////////////////////////////
function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

let maxPageBtns;

if (getWidth() < 500) {
    maxPageBtns = 6;
}
if (getWidth() >= 500 && getWidth() < 700) {
    maxPageBtns = 8;
}
if (getWidth() > 700 && getWidth() < 900) {
    maxPageBtns = 10;
}
if (getWidth() > 900 && getWidth() < 1024) {
    maxPageBtns = 15;
}
if (getWidth() > 1024) {
    maxPageBtns = 20;
}

let pagesQuantityCalc;

const setPages = (recordsNumber) => {
    pagesQuantityCalc = Math.ceil(recordsNumber / recordsOnPage);

    if (pagesQuantityCalc > maxPageBtns) {
        pagesSwitchLoc.replaceChildren();

        for (n = 1; n <= maxPageBtns; n++) {
            if (n === 1) {
                pagesSwitchLoc.insertAdjacentHTML(
                    "beforeend",
                    `<div class="page active">${n}</div>`
                );
            } else {
                pagesSwitchLoc.insertAdjacentHTML(
                    "beforeend",
                    `<div class="page">${n}</div>`
                );
            }
        }
        pagesSwitchLoc.insertAdjacentHTML(
            "beforeend",
            `<div class="next active"><img src="./img/chevron-right.svg" alt="" /></div>`
        );
        let nextBtnLoc = document.querySelector(".next");
        nextBtnLoc.addEventListener("click", () => {
            moveNextPagesBtns();
        });
    } else {
        pagesSwitchLoc.replaceChildren();

        for (n = 1; n <= pagesQuantityCalc; n++) {
            if (n === 1) {
                pagesSwitchLoc.insertAdjacentHTML(
                    "beforeend",
                    `<div class="page active">${n}</div>`
                );
            } else {
                pagesSwitchLoc.insertAdjacentHTML(
                    "beforeend",
                    `<div class="page">${n}</div>`
                );
            }
        }

        pagesSwitchLoc.insertAdjacentHTML(
            "beforeend",
            `<div class="next"><img src="" alt="" /></div>`
        );
    }

    pagesSwitchLoc.insertAdjacentHTML(
        "afterbegin",
        `<div class="prev"><img src="" alt="" /></div>`
    );

    pageButtonsLoc = document.querySelectorAll(".page");
    pageButtonsLoc.forEach((el) => {
        el.addEventListener("click", (e) => {
            changePage(e.target);
        });
    });
};

// create AWARDED RECORDS BOXES ///////////////////////////////////////////////
const createAwardedRecordBoxes = (recordsArray, filterConfigData) => {

    awardedResultsLoc.replaceChildren();

    let awardedRecordsArray = recordsArray.filter((elem) => {
        return elem.awarded;  
    });

    console.log(awardedRecordsArray)

    if (awardedRecordsArray.length > 0) {

        if (filterConfigData.remote_filter) {
            awardedRecordsArray = awardedRecordsArray.filter((elem) => {
                return elem.remote;
            });
        }
        
        if (filterConfigData.language_filter.length > 0) {
            filterAwarded(filterConfigData.language_filter, awardedRecordsArray, "lang");
        }

        if (filterConfigData.branche_filter.length > 0) {
            filterAwarded(filterConfigData.branche_filter, awardedRecordsArray, "branche");
        }

        if (filterConfigData.location_country_filter.length > 0) {
            filterAwarded(filterConfigData.location_country_filter, awardedRecordsArray, "country");
        }

        if (filterConfigData.location_city_filter.length > 0) {
            filterAwarded(filterConfigData.location_city_filter, awardedRecordsArray, "city");
        }

        if (filterConfigData.recruitmentType_filter.length > 0) {
            filterAwarded(filterConfigData.recruitmentType_filter, awardedRecordsArray, "recruitmentType");
        }

        for (i = firstRecordNumber; i < 10; i++) {
            if (awardedRecordsArray[i]) {
                let borderColorClass = "";
                let textColorClass = "";

                if (awardedRecordsArray[i].recruitmentType === "PT") {
                    borderColorClass = "pt-border";
                    textColorClass = "pt-text";
                }
                if (awardedRecordsArray[i].recruitmentType === "RS") {
                    borderColorClass = "rs-border";
                    textColorClass = "rs-text";
                }
                if (awardedRecordsArray[i].recruitmentType === "WEW") {
                    borderColorClass = "wew-border";
                    textColorClass = "wew-text";
                }

                let formaZatrudnienia = "";

                if (awardedRecordsArray[i].jobForm) {
                    awardedRecordsArray[i].jobForm.forEach(function (elem) {
                        formaZatrudnienia =
                            formaZatrudnienia + "<p>" + elem + "</p>";
                    });
                }

                awardedResultsLoc.insertAdjacentHTML(
                    "beforeend",
                    `<a href="${
                        awardedRecordsArray[i].url
                    }" target="_blank"><div class="result ${borderColorClass}">
                <div class="top">
                
                        <div class="lang">
                            <p>${awardedRecordsArray[i].lang}</p>
                        </div>
                        <div class="branche-name">
                            <div class="branche">${
                                awardedRecordsArray[i].branche
                                    ? awardedRecordsArray[i].branche
                                    : ""
                            }</div>
                            <div class="name ${textColorClass}">${
                        awardedRecordsArray[i].name
                    }</div>
                        </div>
                    
                </div>

                <div class="bottom">
                    <div class="city-container">
                        <div class="city"><img src="./img/location_dot.svg">${
                            awardedRecordsArray[i].city
                        }</div></div>
                        <div class="details-container">
                        ${
                            awardedRecordsArray[i].remote
                                ? "<div class='remote'>zdalna</div>"
                                : ""
                        }
                        ${
                            awardedRecordsArray[i].relocation
                                ? "<div class='relocation'>relocation</div>"
                                : ""
                        }
                        ${
                            awardedRecordsArray[i].jobType
                                ? "<div class='jobtype'>" +
                                awardedRecordsArray[i].jobType +
                                "</div>"
                                : ""
                        }
                        ${
                            awardedRecordsArray[i].visibleRate
                                ? awardedRecordsArray[i].salaryFrom &&
                                awardedRecordsArray[i].salaryTo
                                    ? "<div class='salary'>" +
                                    awardedRecordsArray[i].salaryFrom +
                                    " - " +
                                    awardedRecordsArray[i].salaryTo +
                                    "</div>"
                                    : ""
                                : ""
                        }
                        <div class="employmentform">${formaZatrudnienia}</div>
                        </div>
                    
                </div>

                <div class="ribbon-wrap">
                        <div class="ribbon">
                                <img src="./img/star.svg" alt="">
                                <img src="./img/star.svg" alt="">
                                <img src="./img/star.svg" alt="">
                            </div>
                        </div>
                </div>

                

            </div></a>`
                );
            }
        }
    }
};

// show RECORDS NUMBER ///////////////////////////////////////////////
const summariseDownload = (recordsNumber) => {
    recNumLoc.innerText = `Znaleziono ${recordsNumber} ogłoszeń`;
    if (!recordsNumber) {
        noResultsLoc.classList.add("active");
    } else {
        noResultsLoc.classList.remove("active");
    }
};

// create FILTER DATA from API data ///////////////////////////////////////////////
const createDataForFilters = (
    branche,
    jobForm,
    jobType,
    lang,
    visibleRate,
    salaryFrom,
    salaryTo,
    country,
    city,
    lati,
    longi
) => {
   
    if (filterBranchesList.indexOf(branche) === -1 && branche !== undefined) {
        if (filterConfigData.branche_filter.length) {
            if (filterConfigData.branche_filter.indexOf(branche) !== -1) {
                filterBranchesList.push(branche);
            }
        } else {
            filterBranchesList.push(branche);
        }
       
    }

    // if (jobForm) {
    //     jobForm.forEach(function (elem) {
    //         if (filterJobFormList.indexOf(elem) === -1) {
    //             filterJobFormList.push(elem);
    //         }
    //     });
    // }

    // if (filterJobTypeList.indexOf(jobType) === -1 && jobType !== undefined) {
    //     filterJobTypeList.push(jobType);
    // }

    // if (filterLangList.indexOf(lang) === -1) {

    //     if (filterConfigData.language_filter.length) {
    //         if (filterConfigData.language_filter.indexOf(lang) !== -1) {
    //             filterLangList.push(lang);
    //         }
    //     } else {
    //         filterLangList.push(lang);
    //     }
    // }

    // if (visibleRate) {
    //     if (salaryFrom < filterMinSalary) {
    //         filterMinSalary = salaryFrom;
    //     }
    //     if (salaryTo > filterMaxSalary) {
    //         filterMaxSalary = salaryTo;
    //     }
    // }

    // if (filterConfigData.location_country_filter.length) {
        
    //     if (filterConfigData.location_country_filter.indexOf(country) !== -1) {
    //         if (filterCountriesList[country]) {
    //             if (
    //                 filterCountriesList[country].findIndex(
    //                     (arr_el) => arr_el.city === city
    //                 ) === -1
    //             ) {
    //                 if (filterConfigData.location_city_filter.length) {
    //                     if (filterConfigData.location_city_filter.indexOf(city) !== -1) {
    //                         filterCountriesList[country].push({
    //                             city: city,
    //                             lati: lati,
    //                             longi: longi,
    //                         });
    //                     }
    //                 } else {
    //                     filterCountriesList[country].push({
    //                         city: city,
    //                         lati: lati,
    //                         longi: longi,
    //                     });
    //                 }
    //             }
    //         } else {
    //             filterCountriesList[country] = [];
    //             if (filterConfigData.location_city_filter.length) {
    //                 if (filterConfigData.location_city_filter.indexOf(city) !== -1) {
    //                     filterCountriesList[country].push({
    //                         city: city,
    //                         lati: lati,
    //                         longi: longi,
    //                     });
    //                 }
    //             } else {
    //                 filterCountriesList[country].push({
    //                     city: city,
    //                     lati: lati,
    //                     longi: longi,
    //                 });
    //             }
    //         }
    //     }

    // } else {
        
    //     if (filterCountriesList[country]) {
    //         if (
    //             filterCountriesList[country].findIndex(
    //                 (arr_el) => arr_el.city === city
    //             ) === -1
    //         ) {
    //             filterCountriesList[country].push({
    //                 city: city,
    //                 lati: lati,
    //                 longi: longi,
    //             });
    //         }
    //     } else {
    //         filterCountriesList[country] = [];
    //         filterCountriesList[country].push({
    //             city: city,
    //             lati: lati,
    //             longi: longi,
    //         });
    //     }
    // }
};

// create OBJECTS ARRAY from Raw API JSON ///////////////////////////////////////////////
const reworkData = (rawAPIArray) => {
    rawAPIArray.forEach((el) => {
        if (el.options.job_location) {
            parsedJobLocation = JSON.parse(el.options.job_location);
        }

        allRecordsArray.push({
            url: el.url,
            name: el.advert.name,
            branche: el.options.branches,
            lang: el.advert.language,
            jobType: el.options.job_type,
            visibleRate: parseInt(el.options._Widoczna_stawka),
            salaryFrom: parseInt(el.options._spodziewane_wynagrodzenie_od),
            salaryTo: parseInt(el.options._spodziewane_wynagrodzenie_do),
            remote: el.options.remote,
            relocation: el.options._relokacja,
            recruitmentType: el.options._rekrutacja_rodzaj,
            jobForm: el.options._forma_zatrudnienia,
            country: parsedJobLocation.country,
            city: parsedJobLocation.locality,
            lati: parseFloat(parsedJobLocation.latitude),
            longi: parseFloat(parsedJobLocation.longitude),
            description: el.advert.values,
            awarded: el.awarded,
        });

        createDataForFilters(
            el.options.branches,
            el.options._forma_zatrudnienia,
            el.options.job_type,
            el.advert.language,
            parseInt(el.options._Widoczna_stawka),
            parseInt(el.options._spodziewane_wynagrodzenie_od),
            parseInt(el.options._spodziewane_wynagrodzenie_do),
            parsedJobLocation.country,
            parsedJobLocation.locality,
            parseFloat(parsedJobLocation.latitude),
            parseFloat(parsedJobLocation.longitude)
        );
    });
};

// gets DATA FROM API ///////////////////////////////////////////////
const getAPI = (apiPage) => {
    const response = fetch(
        "https://grupaprogres.traffit.com/public/job_posts/published",
        {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "X-Request-Page-Size": "100",
                "X-Request-Current-Page": apiPage,
                "X-Request-Sort": '{"sort_by": "id", "direction": "ASC"}',
            },
        }
    );

    return response;
};

const loopOnAPI = (jsonData, filterConfigData) => {
    if (jsonData.length > 0) {
        rawAPIArray = rawAPIArray.concat(jsonData);
        apiPage++;
        console.log("rawAPIArray", rawAPIArray)
        createRecordsObjFromAPI(apiPage, filterConfigData);
    } else {
        reworkData(rawAPIArray);
        console.log("allRecordsArray", allRecordsArray)
        recordsNumber = rawAPIArray.length;
        console.log("recordsNumber", recordsNumber)
        // summariseDownload(recordsNumber); // not used
        createAwardedRecordBoxes(allRecordsArray, filterConfigData); // obecnie brak wyróżnionych ogłoszeń - wymagane ostylowanie css gdy się pojawią
        setPages(recordsNumber); // trzeba dokończyć listenery na utworzonych buttonach
        createFilterLists(filterConfigData);
        // dropDownBtnStart();
        // pagesContainerStart();
        // createFilteredRecordsArray();

        
    }
};

async function createRecordsObjFromAPI(apiPage, filterConfigData) {
    const rawData = await getAPI(apiPage);
    const jsonData = await rawData.json();
    loopOnAPI(jsonData, filterConfigData);
}

// consider configuration filters ////////////////////////
const getConfigFilter = () => {
    const response = fetch("./config/config.json");
    return response;
};

async function readConfigFilter() {
    try {
        const rawData = await getConfigFilter();
        filterConfigData = await rawData.json();
        console.log("filterConfigData", filterConfigData)
        createRecordsObjFromAPI(apiPage, filterConfigData);
    } catch (e) {
        console.error(e);
        createRecordsObjFromAPI(apiPage);
    }
}

readConfigFilter();