const roleElement = document.getElementById("dynamic-role");
const roles = ["Director", "Actor", "Video Editor", "Graphic Designer"];
let roleIndex = 0;

const getRotatedRoles = (index) =>
  [...roles.slice(index), ...roles.slice(0, index)].join(" | ");

if (roleElement) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleElement.textContent = getRotatedRoles(roleIndex);
  }, 2200);
}

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    portfolioItems.forEach((item) => {
      const matches = category === "all" || item.dataset.category === category;
      item.style.display = matches ? "block" : "none";
    });
  });
});
