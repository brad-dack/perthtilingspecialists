/* =============================================================================
   Interactivity — everything on the page that needs a browser.

   This file does NOT build the page. bake.js is the only renderer: it turns
   config.js into the finished HTML (header, hero, page content, footer, the
   quote form's markup) at build time, and that HTML is what ships. See "Why
   the pages look the way they do" in README.

   So: a copy or layout change means editing config.js (or bake.js) and running
   `node bake.js`. Editing this file will not change what the page looks like.

   What lives here is only the things static HTML can't carry: event handlers,
   the analytics snippet, the per-page-load idempotency key, the lazily-loaded
   spam widget, and two decorative scroll effects.

   The only text in this file is generic UI labels for elements built at
   runtime; everything niche-specific comes from config.js.
============================================================================= */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG;
  if (!cfg) {
    document.title = "Configuration missing";
    return;
  }

  /* Generic UI labels for the runtime-built contact bar. Everything else the
     visitor reads is baked, so its labels live in bake.js. */
  var UI = {
    callLabel: "Call",
    quoteShort: "Quote",
    emailLabel: "Email",
    sending: "Sending…"
  };

  /* ---------- helpers ------------------------------------------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Unset config degrades to absent, never to broken: while business.phone
     or .email is empty, every UI element that would use it is omitted
     rather than rendered with dead/fake data. */
  function hasPhone() { return !!(cfg.business.phone && cfg.business.phoneDisplay); }
  function hasEmail() { return !!cfg.business.email; }

  function telHref() {
    return "tel:" + cfg.business.phone;
  }

  /* ---------- analytics ---------------------------------------------------
     The brand palette and the theme attributes on <html> are baked into every
     page by bake.js, so nothing here needs to re-derive them. */

  function injectGA4() {
    var id = cfg.ga4Id;
    if (!id || id.indexOf("XXXX") !== -1 || !/^G-[A-Z0-9]+$/.test(id)) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id);
  }

  /* Click-to-call tracking: fires a GA4 event for any tel: link. gtag only
     exists when injectGA4 ran (i.e. a real measurement ID is configured),
     so this is a silent no-op while the placeholder ID is in place. */
  function trackPhoneClicks() {
    document.addEventListener("click", function (e) {
      var link = e.target && e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
      if (!link || typeof window.gtag !== "function") return;
      window.gtag("event", "click_to_call", {
        phone_number: link.getAttribute("href").replace("tel:", ""),
        link_text: (link.textContent || "").trim(),
        page_location: window.location.href
      });
    });
  }

  /* ---------- header nav --------------------------------------------------
     The header markup (logo, links, active state, phone button) is baked.
     Only the mobile toggle's behaviour is wired here. */

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var navEl = document.getElementById("site-nav");
    if (!toggle || !navEl) return;
    toggle.addEventListener("click", function () {
      var open = navEl.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Fixed bottom bar on mobile — phone/quote/email stay reachable below the
     1024px breakpoint where the header nav is collapsed (800px in the
     template; moved for this build's five-item nav, see css/styles.css). Auto-hides while
     the quote form itself is on screen (no point showing a call bar over
     the form the visitor is already filling in).

     Built here rather than baked: it's a position:fixed overlay that only
     duplicates links already in the baked header and footer, so putting it in
     the HTML would add markup to every page for no crawler benefit. */
  function renderContactBar() {
    var parts = [];
    if (hasPhone()) parts.push('<a class="contact-bar-item" href="' + telHref() + '">' + UI.callLabel + "</a>");
    /* This page's own #quote when it has a form, else the About form.
       Extensionless to match the baked CTAs (see pathFor in bake.js). */
    parts.push('<a class="contact-bar-item contact-bar-primary" href="' +
      (document.getElementById("quote") ? "#quote" : "/about#quote") + '">' + UI.quoteShort + "</a>");
    if (hasEmail()) parts.push('<a class="contact-bar-item" href="mailto:' + esc(cfg.business.email) + '">' + UI.emailLabel + "</a>");
    if (parts.length < 2) return; // just the quote link isn't worth a bar

    var bar = document.createElement("div");
    bar.className = "contact-bar";
    bar.innerHTML = parts.join("");
    document.body.appendChild(bar);

    var form = document.getElementById("quote-form");
    if (form && "IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        bar.classList.toggle("contact-bar-hidden", entries[0].isIntersecting);
      }, { rootMargin: "0px 0px -20% 0px" });
      obs.observe(form);
    }
  }

  /* ---------- quote form --------------------------------------------------
     The form's markup is baked (see quoteFormHtml in bake.js). Everything
     below is the behaviour: revealing step 2, the idempotency key, the spam
     widget, and the submit handler. */

  /* One id per page load, shared by every render of the form. The ingest
     function dedupes leads on (channel, source_ref) and reads source_ref from
     _id, falling back to a random uuid per request when it's absent — so a
     site that never sends _id creates a fresh lead on every retry after a
     failed submit. crypto.randomUUID needs a secure context; the fallback
     isn't cryptographically strong, but this only has to be unique enough to
     dedupe one visitor's retries.

     This is why bake.js leaves the _id field's value empty: a fixed value
     baked into the HTML would make every visitor to a page share one key. */
  var _submissionId = null;
  function submissionId() {
    if (_submissionId) return _submissionId;
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      _submissionId = window.crypto.randomUUID();
    } else {
      _submissionId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }
    return _submissionId;
  }

  /* Turnstile's api.js is deliberately NOT a static <head> tag: it competes
     with the hero image for bandwidth and main-thread time during the LCP
     window on every page, whether or not that visitor ever reaches the form.
     Load it on demand instead — when the enquiry section is about to scroll
     into view, or immediately on first interaction as a fast path for anyone
     who scrolls or types before the observer's margin trips. */
  var _turnstileLoading = false;
  function loadTurnstileScript() {
    if (_turnstileLoading || window.turnstile || !cfg.turnstileSiteKey) return;
    _turnstileLoading = true;
    var s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    document.head.appendChild(s);
  }

  function scheduleTurnstileLoad(section) {
    if (!cfg.turnstileSiteKey) return;
    if (!section || !("IntersectionObserver" in window)) {
      loadTurnstileScript();
      return;
    }
    var triggered = false;
    var trigger = function () {
      if (triggered) return;
      triggered = true;
      loadTurnstileScript();
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      });
    }, { rootMargin: "600px 0px" });
    observer.observe(section);
    ["pointerdown", "focusin", "keydown"].forEach(function (evt) {
      document.addEventListener(evt, trigger, { once: true, passive: true });
    });
  }

  /* The api.js load above is async, so Turnstile's own auto-render-on-load
     scan may run before — or long after — this point. Render explicitly once
     the API is available rather than relying on that scan. */
  function renderTurnstile(container) {
    if (!container || !cfg.turnstileSiteKey) return;
    if (container.hasChildNodes()) return;     // already rendered into
    if (window.turnstile) {
      window.turnstile.render(container, { sitekey: cfg.turnstileSiteKey });
    } else {
      setTimeout(function () { renderTurnstile(container); }, 100);
    }
  }

  function wireQuoteForm() {
    var form = document.getElementById("quote-form");
    if (!form) return;
    var step2 = document.getElementById("form-step-2");
    var status = document.getElementById("form-status");
    var fieldNames = (cfg.contact.fields || []).map(function (f) { return f.name; });

    // Baked empty; set fresh on every page load. See submissionId() above.
    var idField = document.getElementById("qf-id");
    if (idField) idField.value = submissionId();
    // Observe the form's own containing section rather than a fixed id — the
    // form is dropped into a differently-named section on different page
    // types (and different sites), and a missed lookup here silently degrades
    // to loading Turnstile eagerly, which is the thing this avoids.
    scheduleTurnstileLoad(form.closest ? form.closest("section") || form : form);
    renderTurnstile(document.getElementById("turnstile-widget"));

    form.addEventListener("change", function (e) {
      if (e.target.name === "service" && step2 && step2.hidden) {
        step2.hidden = false;
        var first = form.querySelector(".form-field input");
        if (first) first.focus();
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var service = form.querySelector('input[name="service"]');
      var serviceVal = service && (service.type === "radio" ? form.querySelector('input[name="service"]:checked') : service);
      var values = {};
      var missing = !serviceVal;
      fieldNames.forEach(function (name) {
        var el = document.getElementById("qf-" + name);
        values[name] = el ? el.value.trim() : "";
        if (el && el.required && !values[name]) missing = true;
      });
      if (missing) {
        status.textContent = "Please fill in the required fields.";
        status.className = "form-status error";
        return;
      }

      var ingestUrl = cfg.ingestUrl;
      if (!ingestUrl || !cfg.ingestSecret || ingestUrl.indexOf("YOUR_") === 0) {
        // Owner hasn't configured the ingest endpoint yet — fail gracefully
        // for visitors (the phone number is offered as a fallback below).
        console.warn("ingestUrl/ingestSecret not set in config.js — form cannot submit.");
        showError();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.textContent = UI.sending;
      status.className = "form-status";

      var gotcha = document.getElementById("qf-gotcha");
      var submissionIdField = document.getElementById("qf-id");
      var turnstileResponse = form.querySelector('[name="cf-turnstile-response"]');
      // Config-driven fields first, then the fixed keys — so a stray field
      // name in config can't clobber `service` or any of the meta fields.
      var payload = {};
      Object.keys(values).forEach(function (name) { payload[name] = values[name]; });
      payload.service = serviceVal.value;
      payload.subject = "New quote request: " + serviceVal.value;
      payload._secret = cfg.ingestSecret;
      payload._gotcha = gotcha ? gotcha.value : "";
      payload._id = (submissionIdField && submissionIdField.value) || submissionId();
      payload["cf-turnstile-response"] = turnstileResponse ? turnstileResponse.value : "";

      fetch(ingestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (res.ok) {
          form.innerHTML = '<p class="form-status success">' + esc(cfg.contact.successMessage) + "</p>";
        } else {
          btn.disabled = false;
          showError();
        }
      }).catch(function () {
        btn.disabled = false;
        showError();
      });

      function showError() {
        status.innerHTML = esc(cfg.contact.errorMessage) +
          (hasPhone() ? ' <a href="' + telHref() + '">' + esc(cfg.business.phoneDisplay) + "</a>" : "");
        status.className = "form-status error";
      }
    });
  }

  /* ---------- motion ------------------------------------------------------
     Purely decorative. Both helpers bail out cleanly when the browser lacks
     support or the user prefers reduced motion — content is always visible
     because the hidden state only exists under html.anim (see styles.css).

     Note there is deliberately nothing here that animates the hero: html.anim
     is added after first paint, so a fade-in on hero elements would hide the
     headline and image and re-reveal them a moment later, and Google measures
     that later moment as Largest Contentful Paint. */

  function initHeaderShadow() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    // Deferred rather than called synchronously during boot — reading
    // window.scrollY there forces a layout flush (shows up as "forced reflow"
    // in PageSpeed). setTimeout, not requestAnimationFrame: see the boot
    // section for why rAF is wrong here.
    setTimeout(onScroll, 0);
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("anim");

    var targets = document.querySelectorAll(
      ".card, .step, .faq-item, .testimonial, .photo, .section h2, " +
      ".price-note, .intro-copy, .intro-media, .contact-lines, " +
      "#quote-form, .area-links li"
    );
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    // Two passes rather than one — read every element's sibling position
    // first, then apply all the style/class writes — so DOM reads and writes
    // don't interleave per element.
    // Stagger siblings (e.g. cards in a grid) by their position.
    var indices = Array.prototype.map.call(targets, function (el) {
      return el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
    });
    Array.prototype.forEach.call(targets, function (el, i) {
      el.style.transitionDelay = (indices[i] % 6) * 70 + "ms";
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  /* ---------- boot --------------------------------------------------------- */

  injectGA4();
  trackPhoneClicks();

  /* The rest is deferred one task so this script's own synchronous block isn't
     occupying the main thread at the exact moment the browser would otherwise
     paint the already-baked hero. Much less work happens here than it used to
     — the page is built before it ever reaches the browser — but initReveal
     still touches every animated element, which is enough to matter.

     Deliberately setTimeout, not requestAnimationFrame: rAF callbacks don't
     fire for a tab that isn't compositing frames (backgrounded, prerendered,
     an unfocused preview pane). Perth Brickworks tried rAF here first and it
     left the entire page blank in exactly that case. setTimeout has no such
     dependency and still yields the same opportunity to paint. */
  setTimeout(function () {
    initNav();
    initHeaderShadow();
    wireQuoteForm();
    renderContactBar();
    initReveal();

    /* If the URL has a hash (e.g. about.html#quote), re-scroll: the browser's
       own scroll restoration can land before layout settles. Forced to
       "auto" because the stylesheet sets scroll-behavior: smooth, and a
       smooth scroll started here gets cancelled by that restoration. rAF is
       fine for this one — a non-compositing tab just means the scroll doesn't
       happen yet, not that content stays missing. */
    if (window.location.hash) {
      requestAnimationFrame(function () {
        var target = null;
        try { target = document.querySelector(window.location.hash); } catch (e) { /* not a selector */ }
        if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
  }, 0);
})();
