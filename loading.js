const loadingButton = document.querySelector(".continue")
const section2 = document.querySelector(".sectionNumber2")
const loadingPage = document.querySelector(".loadingScreen")


loadingButton.addEventListener("click",()=>{
  setTimeout(function(){
    section2.style.display= "flex";
    loadingPage.style.display= "none";
  },500)  
})