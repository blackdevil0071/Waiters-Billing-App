const form = document.getElementById("myForm");
const userList = document.querySelector('#userList')
form.addEventListener("submit", handleFormSubmit);
// document.addEventListener('DOMContentLoaded',handleFormSubmit)
function handleFormSubmit(event){
    event.preventDefault()

    let userName = document.querySelector('#username')
    let emailId = document.querySelector('#email')
    let phone = document.querySelector('#phone')

    let users = JSON.parse(localStorage.getItem('users'))||[]
   
    let newUser = {
        userName:userName.value,
        emailId:emailId.value,
        phone:phone.value
    }

    users.push(newUser)
    localStorage.setItem('users',JSON.stringify(users))
    console.log(newUser)


    // const li = document.createElement('li')
    // li.appendChild(document.createTextNode(`${newUser.userName}-${newUser.phone}`))
    // userList.append(li)

}