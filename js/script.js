// Dark mode (safe)
const darkBtn = document.getElementById("darkBtn");
if(darkBtn){
  darkBtn.onclick = () => {
    document.body.classList.toggle("dark");
  };
}

// Lightbox (safe)
function openImg(src){
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if(lightbox && img){
    lightbox.style.display = "block";
    img.src = src;
  }
}
