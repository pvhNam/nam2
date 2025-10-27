// Chờ cho toàn bộ nội dung HTML tải xong rồi mới chạy script
document.addEventListener("DOMContentLoaded", function () {
  // Lấy các element cần thiết
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger-menu");
  const hamburgerIcon = hamburger.querySelector("i"); // Lấy thẻ <i> bên trong
  const menu = document.querySelector(".menu");
  const backToTopButton = document.querySelector("#back-to-top");

  // --- CHỨC NĂNG 1: MENU HAMBURGER (Đã có) ---
  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      menu.classList.toggle("active");
      if (menu.classList.contains("active")) {
        hamburgerIcon.classList.remove("fa-bars");
        hamburgerIcon.classList.add("fa-times");
      } else {
        hamburgerIcon.classList.remove("fa-times");
        hamburgerIcon.classList.add("fa-bars");
      }
    });
  }

  // --- CHỨC NĂNG 2: HIỆU ỨNG TRƯỢT LÊN (Sửa lỗi "mất nội dung") ---
  const animatedElements = document.querySelectorAll(
    ".card, .skill-item, .cv-section, .container h2, .container p" // Thêm vài element cho mượt
  );
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  function observerCallback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // --- CHỨC NĂNG 3: HEADER STICKY & BACK-TO-TOP (Đã có) ---
  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (header) {
      if (scrollTop > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    if (backToTopButton) {
      if (scrollTop > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    }
  });

  if (backToTopButton) {
    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --- CHỨC NĂNG 4: HIỆU ỨNG GÕ CHỮ (MỚI) ---
  const subtitleElement = document.getElementById("hero-subtitle");
  if (subtitleElement) {
    const texts = [
      "Sinh viên - Lập trình viên.",
      "Đam mê phát triển Web.",
      "Khám phá các dự án của tôi.",
      "Sinh viên - Lập trình viên.", // Lặp lại
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const cursorSpan = '<span class="cursor"></span>';

    function type() {
      const currentText = texts[textIndex];
      let displayText = "";

      if (isDeleting) {
        // Xóa chữ
        displayText = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Gõ chữ
        displayText = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      subtitleElement.innerHTML = displayText + cursorSpan;
      subtitleElement.classList.add("typing"); // Thêm class để giữ chiều cao

      let typeSpeed = isDeleting ? 75 : 150;

      if (!isDeleting && charIndex === currentText.length) {
        // Gõ xong, đợi 2s rồi xóa
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Xóa xong, chuyển chữ mới
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length; // Quay vòng mảng chữ
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }
    
    // Bắt đầu hiệu ứng
    type();
  }
});