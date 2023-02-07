const accountAPI = 'http://localhost:3000/Account'

function start(){
    getAPI(account => renderHTML(account))

    setPost()
}
start()


//GET API
function getAPI(callBack){
    fetch(accountAPI)
    .then(res => res.json())
    .then(callBack)
}

function renderHTML (account){
    const blockAccount = document.querySelector('.show-infomation')
    let getHTML = account.map(acc =>{
        return `<div class="item item-${acc.id}">
        <p class='user'>Tài Khoản: <span>${acc.username}</span></p>
        <p class='mail'>Email: <span>${acc.email}</span></p>
        <p class='pass'>Mật Khẩu: <span>${acc.password}</span></p>
        <button class='delete-${acc.id}' onclick='deleteAPI(${acc.id})'>Xoá</button>
        <button class='edit-${acc.id}' onclick='setPut(${acc.id})'>Sửa</button>
    </div>`
    })
    blockAccount.innerHTML = getHTML.join('')
}

//POST API
function postAPI(data,callBack){
    fetch(accountAPI,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(callBack)
}

function setPost(){
    const btnAdd = document.querySelector('.button')
    btnAdd.addEventListener('click',() => {
        console.log('click')
        let userName = document.querySelector('input[name=username]').value
        let password = document.querySelector('input[name=password]').value
        let email = document.querySelector('input[name=email]').value

        let data = {
            username: userName,
            email: email,
            password: password
        }

        postAPI(data, ()=> getAPI(account => renderHTML(account)))
    })
}

//DELETE API
function deleteAPI(id){
    fetch(`${accountAPI}/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(()=>{
        document.querySelector(`.item-${id}`).remove()
    })
}

// PUT
function putAPI(id,data,callBack){
    fetch(`${accountAPI}/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(callBack)
}

function setPut(id){
    let dataUser = document.querySelector(`.item-${id} .user span`)
    let dataMail = document.querySelector(`.item-${id} .mail span`)
    let dataPass = document.querySelector(`.item-${id} .pass span`)

    let inputUser = document.querySelector('input[name=username]')
    let inputPass = document.querySelector('input[name=password]')
    let inputMail = document.querySelector('input[name=email]')

    inputUser.value=dataUser.innerText
    inputPass.value=dataPass.innerText
    inputMail.value=dataMail.innerText

    const btnEdit = document.querySelector('.button-edit')
    btnEdit.addEventListener('click',()=>{
        let data = {
            username: inputUser.value,
            email: inputMail.value,
            password: inputPass.value
        }
        putAPI(id, data, ()=> getAPI(account => renderHTML(account)))
    })
}
