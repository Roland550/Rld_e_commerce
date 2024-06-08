const createNav = () => {
  const nav = document.querySelector(".navbar ");
  nav.innerHTML = ` 
   <div class="nav">
    <img src="img/Rlogo.jpg" class="brand-logo" alt="">
    <div class="nav-items">
        <div class="seach">
            <input type="text" class="search-box" placeholder="search brand, product">
            <button class="search-btn">Search</button>
        </div>
        <a href="#">
           <img src="img/User.png" id="user-img" alt="">
           <div class="login-logout-popup hide">
             <p class="account-info">Log in as  </p>
             <button class="btn" id="user-btn">Log out</button>
             
          </div>
         </a>
        <a href="#"><img src="img/Cart.png"> </a>
    </div>
   </div> 
   <ul class="links-container">
     <li class="link-item"><a href="#" class="link">home</a></li>
     <li class="link-item"><a href="#" class="link">women</a></li>
     <li class="link-item"><a href="#" class="link">men</a></li>
     <li class="link-item"><a href="#" class="link">kids</a></li>
     <li class="link-item"><a href="#" class="link">accessories </a></li>
   </ul>
    `;
};
createNav();

const userImageButton = document.querySelector("#user-img");
const userPop = document.querySelector(".login-logout-popup");
const popuptext = document.querySelector(".account-info");
const actioBTN = document.querySelector("#user-btn");

userImageButton.addEventListener("click", () => {
  userPop.classList.toggle("hide");

});
 
async function getUserInfo() {
  const res = await fetch('/api/auth/me');
  if (res.ok) {
      const data = await res.json();
      popuptext.innerHTML = `Logged in as: ${data.name}`;
  } else {
      window.location.href = 'login.html';
  }
}
getUserInfo();


// window.onload = () =>{
//   let user = JSON.parse(sessionStorage.user || null);
//   if(user != null){
//     //means user is logged in
//     popuptext.innerHTML = `log in as, ${user.name}`;
//     actioBTN.innerHTML = 'log out'
//     actioBTN.addEventListener('click',() =>{
//       sessionStorage.clear();
//       location.reload()
//     } )
//   }else{
//     // user logged out
//     popuptext.innerHTML = 'log in to place order';
//     actioBTN.innerHTML = 'log in'
//     actioBTN.addEventListener('click',() =>{
      
//       location.href= '/login';
//     })
//   }
// }