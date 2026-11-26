import { useCallback, useEffect, useState } from 'react';
import AuthDialog from './components/auth/AuthDialog';
import { getCurrentUser } from './components/auth/authApi';

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

		getCurrentUser(session.token)
			.then(({ user: currentUser }) => {
				const refreshedSession = { ...session, user: currentUser };
				sessionStorage.setItem(SESSION_KEY, JSON.stringify(refreshedSession));
				setUser(currentUser);
			})
			.catch(() => sessionStorage.removeItem(SESSION_KEY));
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
		setToast(destination
			? `Route search for “${destination}” is coming soon.`
			: 'Enter a destination to start planning your trip.');
	}

	function toggleFavorite(route) {
		if (!user) {
			setAuthMode('login');
			setToast('Log in to save your favorite routes.');
			return;
		}

		setSavedRoutes((current) => current.includes(route)
			? current.filter((savedRoute) => savedRoute !== route)
			: [...current, route]);
		setToast(savedRoutes.includes(route) ? 'Route removed from favorites.' : 'Route saved to favorites.');
	}

	return (
		<>
			<header className="site-header">
				<div className="header-inner">
					<a className="brand" href="#home" aria-label="SakayTime home">
						<span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M7 23V9c0-1.7 1.3-3 3-3h12c1.7 0 3 1.3 3 3v14M7 17h18M11 23v2m10-2v2M11 11h.1m9.8 0h.1M10 6l1-2m10 2-1-2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="m10 17 2-4h8l2 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg></span>
						<span>Sakay<span className="brand-accent">Time</span></span>
					</a>
					<nav className="nav" aria-label="Main navigation">
						<a className="active" href="#home">Home</a><a href="#routes">Routes</a><a href="#announcements">Announcements</a><a href="#about">About</a>
					</nav>
					<div className="nav-actions">
						{user ? (
							<div className="auth-actions"><span className="account-avatar" aria-hidden="true">{user.full_name?.charAt(0)?.toUpperCase()}</span><span className="account-name" title={user.full_name}>{user.full_name}</span><button className="link-button" type="button" onClick={handleLogout}>Log out</button></div>
						) : (
							<div className="auth-actions"><button className="login-button" type="button" onClick={() => setAuthMode('login')}>Login</button><button className="button register-button" type="button" onClick={() => setAuthMode('signup')}>Register</button></div>
						)}
					</div>
				</div>
			</header>

			<main id="home">
				<section className="hero-banner" aria-labelledby="hero-title">
					<div className="hero-shade" />
					<div className="hero-inner">
						<p className="hero-kicker"><span className="hero-kicker-dot" /> AKLAN &amp; PROVINCE</p>
						<h1 id="hero-title">SakayTime</h1>
						<h2>Ride Smart. Travel On Time.</h2>
						<p className="hero-description">Check schedules, view routes, and plan your trip with ease across Aklan Province.</p>
						<form className="hero-search" onSubmit={handleTripSearch} role="search">
							<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
							<input name="destination" type="search" placeholder="Search routes, towns, or terminals..." aria-label="Search routes, towns, or terminals" />
							<button className="button" type="submit">Search</button>
						</form>
					</div>
					<div className="hero-photo-credit">Explore Aklan with SakayTime</div>
				</section>

				<section className="quick-actions content-width" aria-label="Quick links">
					<a className="quick-card" href="#routes"><span className="quick-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M5 18.5V6.8C5 5.8 5.8 5 6.8 5h10.4c1 0 1.8.8 1.8 1.8v11.7M5 14h14M8 18.5v1m8-1v1M8.2 9h.1m7.4 0h.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 5l1-2m9 2-1-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span><span><strong>View Routes</strong><small>Explore destinations</small></span><span className="quick-arrow">↗</span></a>
					<a className="quick-card" href="#schedules"><span className="quick-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 4v4m8-4v4M4 10h16M8 14h3m-3 3h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span><span><strong>Check Schedules</strong><small>Plan your departure</small></span><span className="quick-arrow">↗</span></a>
					<a className="quick-card" href="#announcements"><span className="quick-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 14V9a1 1 0 0 1 1-1h3l8-4v15l-8-4H5a1 1 0 0 1-1-1Zm4 1 1.5 5H13l-2-6m8-7a6 6 0 0 1 0 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span><strong>Latest Announcements</strong><small>Travel updates</small></span><span className="quick-arrow">↗</span></a>
					<button className="quick-card quick-card-button" type="button" onClick={() => user ? document.querySelector('#routes')?.scrollIntoView({ behavior: 'smooth' }) : setAuthMode('login')}><span className="quick-icon"><svg viewBox="0 0 24 24" fill="none"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg></span><span><strong>{user ? 'My Favorites' : 'Save Favorites'}</strong><small>{user ? 'Your saved routes' : 'Log in to save routes'}</small></span><span className="quick-arrow">↗</span></button>
				</section>

				<div className="content-width home-content">
					<section id="routes" className="routes-section" aria-labelledby="routes-title">
						<div className="section-heading"><div><p className="section-eyebrow">GET THERE EASIER</p><h2 id="routes-title">Popular routes</h2><p>Find a ride to some of Aklan's most-traveled destinations.</p></div><a className="view-all" href="#routes">View all routes <span>→</span></a></div>
						<div className="route-grid">
							{[
								{ origin: 'Caticlan Jetty Port', destination: 'Tabon', type: 'Bus', duration: '45 min', color: 'blue' },
								{ origin: 'Kalibo Terminal', destination: 'Caticlan Jetty Port', type: 'Bus', duration: '1 hr 30 min', color: 'orange' },
								{ origin: 'Nabas Highway Stop', destination: 'Malay Proper', type: 'Van', duration: '30 min', color: 'blue' }
							].map((route) => (
								<article className="route-card" key={route.destination}>
									<div className={`route-visual ${route.color}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 18.5V6.8C5 5.8 5.8 5 6.8 5h10.4c1 0 1.8.8 1.8 1.8v11.7M5 14h14M8 18.5v1m8-1v1M8.2 9h.1m7.4 0h.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M7 5l1-2m9 2-1-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg></div>
									<div className="route-info"><div className="route-title-row"><h3>{route.origin} <span>→</span> {route.destination}</h3><button className={`favorite-button${savedRoutes.includes(route.destination) ? ' saved' : ''}`} type="button" onClick={() => toggleFavorite(route.destination)} aria-label={`${savedRoutes.includes(route.destination) ? 'Remove' : 'Save'} ${route.origin} to ${route.destination} route`}>{savedRoutes.includes(route.destination) ? '★' : '☆'}</button></div><span className={`route-type ${route.color}`}>{route.type}</span><div className="route-duration"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>{route.duration} estimated</div><div className="route-from"><span>●</span> {route.origin} <span>→</span> {route.destination}</div></div>
									<button className="route-view-button" type="button" onClick={() => setToast(`Route details for ${route.destination} are coming soon.`)}>View Details</button>
								</article>
							))}
						</div>
					</section>

					<section className="info-grid" aria-label="Travel information">
						<article className="info-panel" id="schedules"><div className="panel-heading"><span className="panel-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span><div><h2>Next departures</h2><p>Schedule previews</p></div></div><div className="departure-row"><span><strong>Kalibo Terminal → Caticlan Jetty Port</strong><small>Bus service</small></span><time>08:00 AM</time></div><div className="departure-row"><span><strong>Caticlan Jetty Port → Tabon</strong><small>Bus service</small></span><time>08:30 AM</time></div><a className="panel-link" href="#routes">Browse routes <span>→</span></a></article>
						<article className="info-panel announcement-panel" id="announcements"><div className="panel-heading"><span className="panel-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 14V9a1 1 0 0 1 1-1h3l8-4v15l-8-4H5a1 1 0 0 1-1-1Zm4 1 1.5 5H13l-2-6m8-7a6 6 0 0 1 0 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><div><h2>Announcements</h2><p>Updates for your journey</p></div></div><div className="announcement-empty"><span className="announcement-dot"/><div><strong>Travel smart around Aklan</strong><p>Check back here for service updates and important travel notices.</p></div></div><a className="panel-link" href="#about">About SakayTime <span>→</span></a></article>
					</section>
					<section className="about-strip" id="about"><div className="about-mark">S</div><div><h2>Made for the way Aklan moves.</h2><p>SakayTime brings routes, schedules, terminals, and travel updates together in one place.</p></div><span className="about-decoration" aria-hidden="true">SakayTime · Aklan · SakayTime · Aklan ·</span></section>
				</div>
			</main>
			<footer className="site-footer"><div className="content-width footer-inner"><a className="footer-brand" href="#home">SakayTime</a><span>Ride smart. Travel on time.</span><span>© {new Date().getFullYear()} SakayTime</span></div></footer>

			<AuthDialog mode={authMode} onClose={closeAuth} onModeChange={setAuthMode} onSuccess={handleAuthSuccess} />
			<div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast}</div>
		</>
	);
}

export default App;