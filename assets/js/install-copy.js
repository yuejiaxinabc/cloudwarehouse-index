/* ============================================================
   云仓官网 · 复制命令按钮（首页使用）
   - 任意 [data-copy] 按钮：点击写入剪贴板并给出反馈
   - 跳过 install.html 自带的 .cmd-copy，避免重复绑定
   ============================================================ */
(function () {
  "use strict";

  function writeClipboard(text, done) {
    function legacy() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, legacy);
    } else {
      legacy();
    }
  }

  var buttons = document.querySelectorAll("[data-copy]");
  Array.prototype.forEach.call(buttons, function (btn) {
    if (btn.classList.contains("cmd-copy")) return;
    var label = btn.querySelector("span");
    var original = label ? label.textContent : btn.textContent;

    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy") || "";
      writeClipboard(text, function (ok) {
        var next = ok ? "已复制" : "请手动复制";
        if (label) { label.textContent = next; } else { btn.textContent = next; }
        btn.classList.toggle("is-copied", ok);
        clearTimeout(btn._copyTimer);
        btn._copyTimer = setTimeout(function () {
          if (label) { label.textContent = original; } else { btn.textContent = original; }
          btn.classList.remove("is-copied");
        }, 1800);
      });
    });
  });
})();
