// The top right corner of the home page (job 213): "Sign in" when nobody is signed in, an avatar menu (Dashboard, Sign out) when someone is.
// No token is read or written here. The sign-in library (/vendor/msal-browser.min.js) keeps the signed-in person in this tab's session storage; this file only looks for
// its account entry there (a name and a sign-in name, never a token), so signed-out visitors never download the library. The library is loaded only when
// a person presses Sign out.
(function () {
  'use strict';
  var slot = document.getElementById('account');
  if (!slot) return;
  var CFG = { authority: 'https://crankbuild.ciamlogin.com/crankbuild.onmicrosoft.com', clientId: '3c327f1c-d6e8-48f0-824b-adbee2091b04' };

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }

  /** The signed-in person's account entry from this tab's session storage (name and sign-in name only), or null. */
  function readAccount() {
    try {
      var keys = JSON.parse(sessionStorage.getItem('msal.account.keys') || 'null');
      if (!Array.isArray(keys)) {
        keys = [];
        for (var i = 0; i < sessionStorage.length; i++) {
          var k = sessionStorage.key(i);
          if (/^msal\.\d+\.account\.keys$/.test(k)) keys = keys.concat(JSON.parse(sessionStorage.getItem(k) || '[]'));
        }
      }
      for (var j = 0; j < keys.length; j++) {
        var a = JSON.parse(sessionStorage.getItem(keys[j]) || 'null');
        if (a && (a.homeAccountId || a.username)) return { name: String(a.name || ''), username: String(a.username || '') };
      }
    } catch (e) { /* storage blocked or unreadable: treated as signed out */ }
    return null;
  }

  function initial(a) {
    var s = (a.name || a.username || '').trim();
    var m = s.match(/[A-Za-z0-9À-￿]/);
    return m ? m[0].toUpperCase() : '';
  }

  function drawSignedOut() {
    slot.textContent = '';
    var a = el('a', 'btn', 'Sign in');
    a.href = '/dashboard/';
    slot.appendChild(a);
  }

  var SILHOUETTE = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="12" cy="8.5" r="4" fill="currentColor"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" fill="currentColor"/></svg>';

  function signOut() {
    var s = document.createElement('script');
    s.src = '/vendor/msal-browser.min.js';
    s.onload = function () {
      try {
        var app = new window.msal.PublicClientApplication({
          auth: { clientId: CFG.clientId, authority: CFG.authority, knownAuthorities: [new URL(CFG.authority).host], redirectUri: location.origin + '/signed-in', postLogoutRedirectUri: location.origin + '/' },
          cache: { cacheLocation: 'sessionStorage' }
        });
        Promise.resolve(app.initialize ? app.initialize() : null).then(function () {
          var acc = app.getAllAccounts()[0];
          var req = { account: acc };
          if (acc && typeof acc.idToken === 'string' && acc.idToken) req.idTokenHint = acc.idToken;
          return acc ? app.logoutRedirect(req) : null;
        }).then(function () { }, function () { location.href = '/dashboard/'; });
      } catch (e) { location.href = '/dashboard/'; }
    };
    s.onerror = function () { location.href = '/dashboard/'; };
    document.head.appendChild(s);
  }

  function drawSignedIn(acct) {
    slot.textContent = '';
    var wrap = el('div', 'acct');
    var btn = el('button', 'avatar');
    btn.type = 'button';
    btn.id = 'acct-btn';
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'acct-menu');
    btn.setAttribute('aria-label', 'Your account' + (acct.username ? ' (' + acct.username + ')' : ''));
    var ini = initial(acct);
    if (ini) btn.textContent = ini; else btn.innerHTML = SILHOUETTE;

    var menu = el('div', 'acct-menu');
    menu.id = 'acct-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-labelledby', 'acct-btn');
    menu.hidden = true;
    var dash = el('a', '', 'Dashboard');
    dash.href = '/dashboard/'; dash.setAttribute('role', 'menuitem');
    var out = el('button', '', 'Sign out');
    out.type = 'button'; out.setAttribute('role', 'menuitem');
    menu.appendChild(dash); menu.appendChild(out);
    wrap.appendChild(btn); wrap.appendChild(menu);
    slot.appendChild(wrap);

    var list = [dash, out];
    function open() { menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
    function close(focusBtn) { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (focusBtn) btn.focus(); }
    btn.addEventListener('click', function () { if (menu.hidden) { open(); dash.focus(); } else close(false); });
    btn.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); open(); dash.focus(); } });
    menu.addEventListener('keydown', function (e) {
      var i = list.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); close(true); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i + list.length - 1) % list.length].focus(); }
      else if (e.key === 'Tab') close(false);
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(false); });
    out.addEventListener('click', function () { out.disabled = true; out.textContent = 'Signing out...'; signOut(); });
  }

  function draw() { var a = readAccount(); if (a) drawSignedIn(a); else drawSignedOut(); }
  draw();
  // A page the Back button brings back from the browser's memory is looked at again (a person who signed out must not see the avatar).
  window.addEventListener('pageshow', function (e) { if (e && e.persisted) draw(); });
})();
