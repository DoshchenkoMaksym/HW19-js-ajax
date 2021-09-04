
let inputTitle = document.querySelector('.section__form-input-title');
let inputAuthor = document.querySelector('.section__form-input-author');
let formSubmit = document.querySelector('.section__form');
let mainElem = document.querySelector('.main');

window.onload = getJson('http://localhost:3000/posts').then(result => render(result, mainElem))

function getJson(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            let status = xhr.status;
            if (status === 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.onerror = () => {
            reject("Error fetching " + url);
        }
        xhr.send();
    });
};

function saveJson(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.setRequestHeader(
            'Content-type', 'application/json; charset=utf-8'
        );
        xhr.responseType = 'json';
        xhr.onload = () => {
            let status = xhr.status;
            if (status === 201) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.onerror = (e) => {
            reject("Error fetching " + url);
        };
        xhr.send(data);
    });
};

function getValue(titleFormValue, authorFormValue) {
    let obj = {};
    obj.title = titleFormValue.value;
    obj.author = authorFormValue.value;
    return obj;
};

function render(arr, ell) {
    for (let item of arr) {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('main__block');
        mainDiv.innerHTML = `<div>Title: ${item.title}</div><div>Author: ${item.author}</div>`
        ell.append(mainDiv);
    };
};

function addTask(obj, ell) {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('main__block');
    mainDiv.innerHTML = `<div>Title: ${obj.title}</div><div>Author: ${obj.author}</div>`
    ell.append(mainDiv)
};

formSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    saveJson('http://localhost:3000/posts', JSON.stringify(getValue(inputTitle, inputAuthor)))
        .then(getJson('http://localhost:3000/posts'))
            .then(result => addTask(result, mainElem))
            .catch(err => console.log('Возникла ошибка:', err))
});
