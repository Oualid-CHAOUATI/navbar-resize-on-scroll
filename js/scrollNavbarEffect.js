function random(max) {
  let r = Math.random();
  r *= max + 1;
  r = Math.floor(r);
  return r;
}
const arrs = [
  "// home",
  "// services",
  "// contact me",
  "hahahahahahahahahahahah",
];
const header = document.querySelector("header");
console.log(header);
header.addEventListener("mouseover", () => {
  console.log("mouseover on header");
  showNav();
});
const miniNav = document.querySelector(".mini-nav");
const nav = document.querySelector(".nav");
const navWrapper = document.querySelector(".nav-wrapper");

function showMini(text) {
  // const r = random(arrs.length - 1);
  miniNav.textContent = text;
  nav.classList.add("hide");
  navWrapper.style.width = miniNav.offsetWidth + "px";
  setTimeout(() => {
    miniNav.classList.remove("hide");
    nav.classList.add("hide");
  }, 300);
}

function showNav() {
  navWrapper.style.width = navWrapper.scrollWidth + "px";
  miniNav.classList.add("hide");
  setTimeout(() => {
    nav.classList.remove("hide");
    miniNav.classList.add("hide");
  }, 300);
}

function scrollSectionEfffect() {
  //pour empecher que la mini nav s'affiche
  let isJustLoadPage = true;
  let lastScroll = 0;
  let isShowMini = false;

  const elementsToWatch = document.querySelectorAll("section");
  let currectSection = elementsToWatch[0].id;
  //pour avoir une largeur fixed et permettre la transition
  showNav();

  //---------------

  addEventListener("scroll", (e) => {
    const offset = 30;
    const scroll = document.documentElement.scrollTop;
    const scrollDiff = scroll - lastScroll;
    const isScrollingDown = scrollDiff >= 0;

    function handleScroll() {
      if (isScrollingDown) {
        if (Math.abs(scrollDiff) > offset) {
          lastScroll = scroll;

          if (!isShowMini) {
            showMini(currectSection);
            isShowMini = true;
          }
        }
      } else {
        if (Math.abs(scrollDiff) > offset) {
          lastScroll = scroll;
          if (isShowMini) {
            showNav();
            isShowMini = false;
          }
        }
      }
    }

    handleScroll();
    setTimeout(() => {
      // handleScroll();
    }, 310);
  });

  const observer = new IntersectionObserver(intersectionObserverCallback, {
    rootMargin: "-100px 0% -200px 0%",
  });
  elementsToWatch.forEach((element) => observer.observe(element));

  function intersectionObserverCallback(entries) {
    entries.forEach((entry) => {
      // console.log("entry");
      // console.log(entry.target);

      const isIntersecting = entry.isIntersecting;
      const target = entry.target;

      if (!isIntersecting) return;
      currectSection = target.id;
      //si le défilement est vers le Haut on fait rien
      if (entry.intersectionRect.top > entry.boundingClientRect.top) return;
      if (isJustLoadPage) return (isJustLoadPage = false);
      showMini(currectSection);
      isShowMini = true;

      //entry.tareget (l'élément HTML)
      //entry.isIntersecting
    });
  }
}

scrollSectionEfffect();
