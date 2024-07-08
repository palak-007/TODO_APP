const inputElem = document.querySelector('.input-field');
const containerElem = document.querySelector('.content-section');

let checkIconElems = document.querySelectorAll('.checked-icon');
let crossElems = document.querySelectorAll('.cross-icon');
let countElem = document.querySelector('.items-left-div');

let clearBtn = document.querySelector('.clear-div')
let allBtn = document.querySelector('.all')
let activeBtn = document.querySelector('.active')
let completedBtn = document.querySelector('.seeCompleted')

let modeElem = document.querySelector('.mode-icon')
let image = document.querySelector('.mode-icon img')
let BG_ELem = document.querySelector('.top-section')
let checkIcons = document.querySelectorAll('.check-icon')

let checked_cnt = 0, total_cnt = 0;

function addTODO(value) {
    containerElem.innerHTML += `
        <div class="new-div">
            <div class="task-div">
                <div class="checked-icon circle-div">
                    <img src="images/icon-check.svg" class = "check-icon">
                </div>
                <div class="task">
                    ${value}
                </div>
            </div>
            <div class="cross-icon-div">
                <img src="images/icon-cross.svg" class = "cross-icon">
            </div>
        </div>
    `;

    total_cnt++;
    countElem.innerText = `${total_cnt - checked_cnt} items left`

    checkIconElems = document.querySelectorAll('.checked-icon')
    crossElems = document.querySelectorAll('.cross-icon')
    checkIcons = document.querySelectorAll('.check-icon')

    if (document.querySelector('body').classList.contains('dark')) {
        checkIcons.forEach((icon) => {
            icon.style.visibility = "hidden"
        })
    }

    // TOGGLE CLASSEs
    checkIconElems.forEach((item) => {
        item.addEventListener('click', (e) => {
            item.classList.toggle('check-icon-div');
            if (item.classList.contains('check-icon-div'))
                checked_cnt++;
            else {
                if (checked_cnt >= 1)
                    checked_cnt--;
            }

            countElem.innerText = `${total_cnt - checked_cnt} items left`

            item.nextElementSibling.classList.toggle('completed');

            if (document.querySelector('body').classList.contains('dark')) {
                checkIcons.forEach((icon) => {
                    if (icon.parentElement.classList.contains('check-icon-div'))
                        icon.style.visibility = "visible"
                    else
                        icon.style.visibility = "hidden"
                })
            }
        })
    })


    // DELETE SELECTED TODO
    crossElems.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
            // checkIconElems = document.querySelectorAll('.checked-icon')
            // x = e.target;
            if(e.target.parentElement.previousElementSibling.childNodes[1].classList.contains('check-icon-div'))
                checked_cnt = (checked_cnt >= 1) ? checked_cnt-1 : checked_cnt 
            total_cnt = (total_cnt >= 1) ? total_cnt-1 : total_cnt  
            countElem.innerText = `${total_cnt - checked_cnt} items left`
        })
    })
}

let x;

// CLEAR COMPLETED
clearBtn.addEventListener('click', (e) => {
    checkIconElems = document.querySelectorAll('.checked-icon')
    checkIconElems.forEach((item) => {
        if (item.classList.contains('check-icon-div')) {
            item.parentElement.parentElement.remove();
            checked_cnt = (checked_cnt >= 1) ? checked_cnt-1 : checked_cnt
            total_cnt = (total_cnt >= 1) ? total_cnt-1 : total_cnt
        }
    })
    countElem.innerText = `${total_cnt - checked_cnt} items left`
})

// SEE ALL
allBtn.addEventListener('click', (e) => {
    checkIconElems.forEach((item) => {
        item.parentElement.parentElement.style.display = 'flex';
    })
})

// SEE COMPLETED
completedBtn.addEventListener('click', (e) => {
    checkIconElems.forEach((item) => {
        if (!item.classList.contains('check-icon-div')) {
            item.parentElement.parentElement.style.display = 'none';
        }
        else {
            item.parentElement.parentElement.style.display = 'flex';
        }
    })
})

// SEE ACTIVE
activeBtn.addEventListener('click', (e) => {
    checkIconElems.forEach((item) => {
        if (item.classList.contains('check-icon-div')) {
            item.parentElement.parentElement.style.display = 'none';
        }
        else {
            item.parentElement.parentElement.style.display = 'flex';
        }
    })
})


inputElem.addEventListener('focus', (e) => {
    inputElem.placeholder = 'Currently Typing...';
})

inputElem.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        if (e.target.value !== '')
            addTODO(e.target.value);
        e.target.value = '';
    }
})

modeElem.addEventListener('click', (e) => {
    document.querySelector('body').classList.toggle('dark')
    BG_ELem.classList.toggle('dark')

    if (document.querySelector('body').classList.contains('dark')) {
        image.src = "images/icon-sun.svg"
        checkIcons.forEach((icon) => {
            if (icon.parentElement.classList.contains('check-icon-div'))
                icon.style.visibility = "visible"
            else
                icon.style.visibility = "hidden"
        })
    }
    else
        image.src = "images/icon-moon.svg"
})



