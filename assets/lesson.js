/* lesson.js — 课程页共享交互
   1) 步骤清单勾选 + 进度条（结构见 .steps-widget）
   2) 部件浏览器：点击部件名 → 显示对应官方插图与说明（结构见 .explorer）
*/
(function () {
  "use strict";

  /* ---------- 步骤清单 ---------- */
  document.querySelectorAll(".steps-widget").forEach(function (widget) {
    var list = widget.querySelector(".steps");
    if (!list) return;
    var countEl = widget.querySelector(".progress-count .val");
    var fillEl = widget.querySelector(".progress-fill");
    var doneEl = widget.querySelector(".steps-done");
    var inputs = Array.prototype.slice.call(list.querySelectorAll(".step-input"));

    function update() {
      var total = inputs.length;
      var count = inputs.filter(function (i) { return i.checked; }).length;
      if (countEl) countEl.textContent = count + " / " + total + " 步";
      if (fillEl) fillEl.style.setProperty("--p", total ? String(count / total) : "0");
      if (doneEl) doneEl.hidden = !(total > 0 && count === total);
      inputs.forEach(function (input) {
        var item = input.closest(".step");
        if (item) item.classList.toggle("is-done", input.checked);
      });
    }

    list.addEventListener("change", function (event) {
      if (event.target.classList.contains("step-input")) update();
    });
    update();
  });

  /* ---------- 部件浏览器 ---------- */
  document.querySelectorAll(".explorer").forEach(function (explorer) {
    var buttons = Array.prototype.slice.call(explorer.querySelectorAll("[data-part-btn]"));
    var views = Array.prototype.slice.call(explorer.querySelectorAll("[data-part-view]"));

    function show(key) {
      buttons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.partBtn === key));
      });
      views.forEach(function (view) {
        view.hidden = view.dataset.partView !== key;
      });
    }

    explorer.addEventListener("click", function (event) {
      var button = event.target.closest("[data-part-btn]");
      if (!button || !explorer.contains(button)) return;
      show(button.dataset.partBtn);
    });

    var initial = buttons.find(function (b) { return b.getAttribute("aria-pressed") === "true"; }) || buttons[0];
    if (initial) show(initial.dataset.partBtn);
  });
})();
