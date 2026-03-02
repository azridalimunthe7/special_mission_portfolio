/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // Saat kita mengklik setiap nav__link, kita menghapus kelas show-menu.
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]",
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(
  ".home__data, .about__img, .skills__subtitle, .skills__text, .project-card, .certificate-container",
  {},
);
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .contact__input", { interval: 200 });

/* === Form Contact === */
const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const statusMessage = document.getElementById("status");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  // 🔵 Aktifkan Loading
  submitButton.classList.add("loading");
  submitButton.disabled = true;
  btnText.innerText = "Mengirim...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      statusMessage.innerHTML = "Terima kasih, pesan kamu telah terkirim!";
      form.reset();
    } else {
      statusMessage.innerHTML = "Terjadi kesalahan, silahkan coba lagi!";
    }
  } catch (error) {
    statusMessage.innerHTML = "Terjadi kesalahan jaringan!";
  }

  // 🔴 Matikan Loading (apapun hasilnya)
  submitButton.classList.remove("loading");
  submitButton.disabled = false;
  btnText.innerText = "Kirim";
});
