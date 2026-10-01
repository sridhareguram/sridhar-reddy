// Screenshot switcher for the AURA project. Falls back to a plain message if an image cannot load.
(function () {
  var root = document.querySelector("[data-gallery]");
  if (!root) return;

  var items;
  try {
    items = JSON.parse(root.getAttribute("data-items"));
  } catch (e) {
    return;
  }

  var shot = root.querySelector(".shot");
  var img = shot.querySelector("img");
  var caption = root.querySelector(".shot-caption");
  var buttons = root.querySelectorAll("[data-index]");

  img.addEventListener("error", function () {
    shot.classList.add("broken");
  });
  // The first image may have failed before this script ran.
  if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) shot.classList.add("broken");

  function show(i) {
    var item = items[i];
    shot.classList.remove("broken");
    img.alt = "Screenshot of AURA: " + item.caption;
    img.src = item.remote;
    caption.textContent = item.caption;
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(Number(b.getAttribute("data-index")) === i));
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      show(Number(b.getAttribute("data-index")));
    });
  });
})();
