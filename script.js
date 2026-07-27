const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".site-nav");
menuButton?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".site-nav a").forEach(link=>{
  link.addEventListener("click",()=>{
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded","false");
  });
});
document.getElementById("year").textContent=new Date().getFullYear();
