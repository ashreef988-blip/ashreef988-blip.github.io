document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalVideo = document.getElementById("modalVideo");
  const closeModal = document.querySelector(".close-modal");
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");

  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  let currentIndex = 0;

  function showMedia(index) {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentIndex = index;

    const item = galleryItems[currentIndex];
    const type = item.getAttribute("data-type");
    const src = item.getAttribute("data-src");

    if (type === "video") {
      modalImg.style.display = "none";
      modalVideo.style.display = "block";
      modalVideo.src = src;
      modalVideo.currentTime = 0;
      modalVideo.play();
    } else {
      modalVideo.pause();
      modalVideo.style.display = "none";
      modalImg.style.display = "block";
      modalImg.src = src;
    }
    modal.classList.add("active");
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showMedia(index);
    });
  });

  function hideModal() {
    modal.classList.remove("active");
    modalVideo.pause();
    modalVideo.src = "";
    modalImg.src = "";
  }

  closeModal.addEventListener("click", hideModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showMedia(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showMedia(currentIndex + 1);
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") hideModal();
    if (e.key === "ArrowLeft") showMedia(currentIndex - 1);
    if (e.key === "ArrowRight") showMedia(currentIndex + 1);
  });
});