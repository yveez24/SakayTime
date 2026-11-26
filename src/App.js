import React, { useCallback, useEffect, useState } from 'react';
import AuthDialog from './components/auth/AuthDialog.js';
import { getCurrentUser } from './components/auth/authApi.js';

const SESSION_KEY = 'sakaytime.session';
function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [toast, setToast] = useState('');
  const [savedRoutes, setSavedRoutes] = useState([]);
  const closeAuth = useCallback(() => setAuthMode(null), []);
  useEffect(() => {
    const storedSession = sessionStorage.getItem(SESSION_KEY);
    if (!storedSession) return;
    let session;
    try {
      session = JSON.parse(storedSession);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
      return;
    }
    getCurrentUser(session.token).then(({
      user: currentUser
    }) => {
      const refreshedSession = {
        ...session,
        user: currentUser
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(refreshedSession));
      setUser(currentUser);
    }).catch(() => sessionStorage.removeItem(SESSION_KEY));
  }, []);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);
  function handleAuthSuccess(session) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session.user);
    setAuthMode(null);
    setToast(`Welcome${session.user.full_name ? `, ${session.user.full_name}` : ''}!`);
  }
  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
    setSavedRoutes([]);
    setToast('You have been logged out.');
  }
  function handleTripSearch(event) {
    event.preventDefault();
    const destination = new FormData(event.currentTarget).get('destination')?.trim();
    setToast(destination ? `Route search for “${destination}” is coming soon.` : 'Enter a destination to start planning your trip.');
  }
  function toggleFavorite(route) {
    if (!user) {
      setAuthMode('login');
      setToast('Log in to save your favorite routes.');
      return;
    }
    setSavedRoutes(current => current.includes(route) ? current.filter(savedRoute => savedRoute !== route) : [...current, route]);
    setToast(savedRoutes.includes(route) ? 'Route removed from favorites.' : 'Route saved to favorites.');
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "site-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "brand",
    href: "#home",
    "aria-label": "SakayTime home"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-mark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 23V9c0-1.7 1.3-3 3-3h12c1.7 0 3 1.3 3 3v14M7 17h18M11 23v2m10-2v2M11 11h.1m9.8 0h.1M10 6l1-2m10 2-1-2",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m10 17 2-4h8l2 4",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", null, "Sakay", /*#__PURE__*/React.createElement("span", {
    className: "brand-accent"
  }, "Time"))), /*#__PURE__*/React.createElement("nav", {
    className: "nav",
    "aria-label": "Main navigation"
  }, /*#__PURE__*/React.createElement("a", {
    className: "active",
    href: "#home"
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    href: "#routes"
  }, "Routes"), /*#__PURE__*/React.createElement("a", {
    href: "#announcements"
  }, "Announcements"), /*#__PURE__*/React.createElement("a", {
    href: "#about"
  }, "About")), /*#__PURE__*/React.createElement("div", {
    className: "nav-actions"
  }, user ? /*#__PURE__*/React.createElement("div", {
    className: "auth-actions"
  }, /*#__PURE__*/React.createElement("span", {
    className: "account-avatar",
    "aria-hidden": "true"
  }, user.full_name?.charAt(0)?.toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "account-name",
    title: user.full_name
  }, user.full_name), /*#__PURE__*/React.createElement("button", {
    className: "link-button",
    type: "button",
    onClick: handleLogout
  }, "Log out")) : /*#__PURE__*/React.createElement("div", {
    className: "auth-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "login-button",
    type: "button",
    onClick: () => setAuthMode('login')
  }, "Login"), /*#__PURE__*/React.createElement("button", {
    className: "button register-button",
    type: "button",
    onClick: () => setAuthMode('signup')
  }, "Register"))))), /*#__PURE__*/React.createElement("main", {
    id: "home"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero-banner",
    "aria-labelledby": "hero-title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-shade"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-kicker"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-kicker-dot"
  }), " ILOILO CITY & PROVINCE"), /*#__PURE__*/React.createElement("h1", {
    id: "hero-title"
  }, "SakayTime"), /*#__PURE__*/React.createElement("h2", null, "Ride Smart. Travel On Time."), /*#__PURE__*/React.createElement("p", {
    className: "hero-description"
  }, "Check schedules, view routes, and plan your trip with ease across Iloilo Province."), /*#__PURE__*/React.createElement("form", {
    className: "hero-search",
    onSubmit: handleTripSearch,
    role: "search"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "10.8",
    cy: "10.8",
    r: "6.8",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m16 16 4.5 4.5",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("input", {
    name: "destination",
    type: "search",
    placeholder: "Search routes, towns, or terminals...",
    "aria-label": "Search routes, towns, or terminals"
  }), /*#__PURE__*/React.createElement("button", {
    className: "button",
    type: "submit"
  }, "Search"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-photo-credit"
  }, "Explore Iloilo with SakayTime")), /*#__PURE__*/React.createElement("section", {
    className: "quick-actions content-width",
    "aria-label": "Quick links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "quick-card",
    href: "#routes"
  }, /*#__PURE__*/React.createElement("span", {
    className: "quick-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 18.5V6.8C5 5.8 5.8 5 6.8 5h10.4c1 0 1.8.8 1.8 1.8v11.7M5 14h14M8 18.5v1m8-1v1M8.2 9h.1m7.4 0h.1",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 5l1-2m9 2-1-2",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "View Routes"), /*#__PURE__*/React.createElement("small", null, "Explore destinations")), /*#__PURE__*/React.createElement("span", {
    className: "quick-arrow"
  }, "↗")), /*#__PURE__*/React.createElement("a", {
    className: "quick-card",
    href: "#schedules"
  }, /*#__PURE__*/React.createElement("span", {
    className: "quick-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "6",
    width: "16",
    height: "14",
    rx: "2",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 4v4m8-4v4M4 10h16M8 14h3m-3 3h7",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Check Schedules"), /*#__PURE__*/React.createElement("small", null, "Plan your departure")), /*#__PURE__*/React.createElement("span", {
    className: "quick-arrow"
  }, "↗")), /*#__PURE__*/React.createElement("a", {
    className: "quick-card",
    href: "#announcements"
  }, /*#__PURE__*/React.createElement("span", {
    className: "quick-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 14V9a1 1 0 0 1 1-1h3l8-4v15l-8-4H5a1 1 0 0 1-1-1Zm4 1 1.5 5H13l-2-6m8-7a6 6 0 0 1 0 8",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Latest Announcements"), /*#__PURE__*/React.createElement("small", null, "Travel updates")), /*#__PURE__*/React.createElement("span", {
    className: "quick-arrow"
  }, "↗")), /*#__PURE__*/React.createElement("button", {
    className: "quick-card quick-card-button",
    type: "button",
    onClick: () => user ? document.querySelector('#routes')?.scrollIntoView({
      behavior: 'smooth'
    }) : setAuthMode('login')
  }, /*#__PURE__*/React.createElement("span", {
    className: "quick-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, user ? 'My Favorites' : 'Save Favorites'), /*#__PURE__*/React.createElement("small", null, user ? 'Your saved routes' : 'Log in to save routes')), /*#__PURE__*/React.createElement("span", {
    className: "quick-arrow"
  }, "↗"))), /*#__PURE__*/React.createElement("div", {
    className: "content-width home-content"
  }, /*#__PURE__*/React.createElement("section", {
    id: "routes",
    className: "routes-section",
    "aria-labelledby": "routes-title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "section-eyebrow"
  }, "GET THERE EASIER"), /*#__PURE__*/React.createElement("h2", {
    id: "routes-title"
  }, "Popular routes"), /*#__PURE__*/React.createElement("p", null, "Find a ride to some of Iloilo's most-traveled destinations.")), /*#__PURE__*/React.createElement("a", {
    className: "view-all",
    href: "#routes"
  }, "View all routes ", /*#__PURE__*/React.createElement("span", null, "→"))), /*#__PURE__*/React.createElement("div", {
    className: "route-grid"
  }, [{
    destination: 'Passi',
    type: 'Bus',
    duration: '2 hr 00 min',
    color: 'blue'
  }, {
    destination: 'Oton',
    type: 'Van',
    duration: '30 min',
    color: 'orange'
  }, {
    destination: 'Miagao',
    type: 'Bus',
    duration: '1 hr 30 min',
    color: 'blue'
  }].map(route => /*#__PURE__*/React.createElement("article", {
    className: "route-card",
    key: route.destination
  }, /*#__PURE__*/React.createElement("div", {
    className: `route-visual ${route.color}`
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 18.5V6.8C5 5.8 5.8 5 6.8 5h10.4c1 0 1.8.8 1.8 1.8v11.7M5 14h14M8 18.5v1m8-1v1M8.2 9h.1m7.4 0h.1",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 5l1-2m9 2-1-2",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "route-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "route-title-row"
  }, /*#__PURE__*/React.createElement("h3", null, "Iloilo City ", /*#__PURE__*/React.createElement("span", null, "→"), " ", route.destination), /*#__PURE__*/React.createElement("button", {
    className: `favorite-button${savedRoutes.includes(route.destination) ? ' saved' : ''}`,
    type: "button",
    onClick: () => toggleFavorite(route.destination),
    "aria-label": `${savedRoutes.includes(route.destination) ? 'Remove' : 'Save'} Iloilo City to ${route.destination} route`
  }, savedRoutes.includes(route.destination) ? '★' : '☆')), /*#__PURE__*/React.createElement("span", {
    className: `route-type ${route.color}`
  }, route.type), /*#__PURE__*/React.createElement("div", {
    className: "route-duration"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8.5",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 2",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  })), route.duration, " estimated"), /*#__PURE__*/React.createElement("div", {
    className: "route-from"
  }, /*#__PURE__*/React.createElement("span", null, "●"), " Iloilo City ", /*#__PURE__*/React.createElement("span", null, "→"), " ", route.destination)), /*#__PURE__*/React.createElement("button", {
    className: "route-view-button",
    type: "button",
    onClick: () => setToast(`Route details for ${route.destination} are coming soon.`)
  }, "View Details"))))), /*#__PURE__*/React.createElement("section", {
    className: "info-grid",
    "aria-label": "Travel information"
  }, /*#__PURE__*/React.createElement("article", {
    className: "info-panel",
    id: "schedules"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8.5",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3.5 2",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Next departures"), /*#__PURE__*/React.createElement("p", null, "Schedule previews"))), /*#__PURE__*/React.createElement("div", {
    className: "departure-row"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Iloilo City → Passi"), /*#__PURE__*/React.createElement("small", null, "Bus service")), /*#__PURE__*/React.createElement("time", null, "08:00 AM")), /*#__PURE__*/React.createElement("div", {
    className: "departure-row"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Iloilo City → Oton"), /*#__PURE__*/React.createElement("small", null, "Van service")), /*#__PURE__*/React.createElement("time", null, "08:30 AM")), /*#__PURE__*/React.createElement("a", {
    className: "panel-link",
    href: "#routes"
  }, "Browse routes ", /*#__PURE__*/React.createElement("span", null, "→"))), /*#__PURE__*/React.createElement("article", {
    className: "info-panel announcement-panel",
    id: "announcements"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 14V9a1 1 0 0 1 1-1h3l8-4v15l-8-4H5a1 1 0 0 1-1-1Zm4 1 1.5 5H13l-2-6m8-7a6 6 0 0 1 0 8",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Announcements"), /*#__PURE__*/React.createElement("p", null, "Updates for your journey"))), /*#__PURE__*/React.createElement("div", {
    className: "announcement-empty"
  }, /*#__PURE__*/React.createElement("span", {
    className: "announcement-dot"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Travel smart around Iloilo"), /*#__PURE__*/React.createElement("p", null, "Check back here for service updates and important travel notices."))), /*#__PURE__*/React.createElement("a", {
    className: "panel-link",
    href: "#about"
  }, "About SakayTime ", /*#__PURE__*/React.createElement("span", null, "→")))), /*#__PURE__*/React.createElement("section", {
    className: "about-strip",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-mark"
  }, "S"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Made for the way Iloilo moves."), /*#__PURE__*/React.createElement("p", null, "SakayTime brings routes, schedules, terminals, and travel updates together in one place.")), /*#__PURE__*/React.createElement("span", {
    className: "about-decoration",
    "aria-hidden": "true"
  }, "SakayTime · Iloilo · SakayTime · Iloilo ·")))), /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content-width footer-inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "footer-brand",
    href: "#home"
  }, "SakayTime"), /*#__PURE__*/React.createElement("span", null, "Ride smart. Travel on time."), /*#__PURE__*/React.createElement("span", null, "© ", new Date().getFullYear(), " SakayTime"))), /*#__PURE__*/React.createElement(AuthDialog, {
    mode: authMode,
    onClose: closeAuth,
    onModeChange: setAuthMode,
    onSuccess: handleAuthSuccess
  }), /*#__PURE__*/React.createElement("div", {
    className: `toast${toast ? ' show' : ''}`,
    role: "status",
    "aria-live": "polite"
  }, toast));
}
export default App;