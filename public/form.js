//select inputs
const submitBtn = document.querySelector('.submit-btn');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number');
const tac = document.querySelector('#term-and-cond');
const notification = document.querySelector('#notification');
const loader = document.querySelector('.loader');


submitBtn.addEventListener('click', () => {
  // if(name.value.length < 3){
  //   showAlert('name must be 3 letters long');
  // }
  // } else if(!email.value.length){
  //       showAlert("Watch out your email Please");
  // } else if(password.value.length < 6){
  //   showAlert("Password must be 6 long");
  // } else if(!number.value.length){
  //   showAlert('enter your phone number');
  // } else if(!Number(number.value) || number.value.length < 10){
  //   showAlert('invalid number, please');
  // } else if(!tac.checked){
  //   showAlert("you must agree to our terms and conditions");
  // } 
  // else{
  //   loader.style.display = 'block';
    sendData('/signup', {
      text: text.value,
      email: email.value,
      password: password.value,
      number: number.value,
      tac: tac.checked,
      notification: notification.checked,
      seller: false
    })
  // }
})


//send Data
const sendData = (path, data) =>{
 fetch(path, {
   method: 'post',
    headers: new Headers({'Content-Type' : 'application/json'}),
    body: JSON.stringify(data)
  }).then((res) => res.json())
  .then(response =>{
    console.log(response);
  })
}

//aleert function
const showAlert = (msg) =>{
  let alertBox = document.querySelector('.alert-box');
  let alertMsg = document.querySelector('.alert-msg');
  alertMsg.innerHTML = msg;
  alertBox.classList.add('.show');
  setTimeout(() =>{
    alertBox.classList.remove('.show');
  }, 2500);
}