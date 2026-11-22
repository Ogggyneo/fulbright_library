
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

// =====================================================
// COLLECTIONS PAGE IMPORT
// Your file is: src/page/CollectionPage.tsx
// =====================================================
import CollectionsPage from "./page/CollectionPage";

type MenuKey = "collections" | "visit" | "services" | "about";

const menus: Record<
  MenuKey,
  {
    label: string;
    description: string;
    links: string[];
  }
> = {
  collections: {
    label: "Collections",
    description:
      "Explore the materials that shape research, teaching, and new ideas.",
    links: [
      "Digital Collections",
      "Databases",
      "Research Guides",
    ],
  },

  visit: {
    label: "Visit",
    description:
      "Find your place to read, study, research, or collaborate.",
    links: [
      "Visiting the Library",
      "Locations & Hours",
      "Events & Workshops",
    ],
  },

  services: {
    label: "Services",
    description:
      "Expert guidance and practical support for every stage of research.",
    links: [
      "Borrow & Renew",
      "Research Support",
      "Ask a Librarian",
      "Research Consultations",
      "Citation Support",
      "Alumni access",
    ],
  },

  about: {
    label: "About",
    description:
      "Meet the people and discover the purpose behind the library.",
    links: [
      "Our Mission",
      "Library Overview",
      "Library Staff",
      "News & Updates",
      "Grant and Funding",
      "Contact Us",
    ],
  },
};

const menuKeys = Object.keys(menus) as MenuKey[];

const resources = [
  ["book", "Library Catalog", "Find books, journals, and media."],
  ["database", "Databases", "Explore subject-specific sources."],
  [
    "collection",
    "Digital Collections",
    "Discover materials from anywhere.",
  ],
  [
    "compass",
    "Research Guides",
    "Start with expert-curated resources.",
  ],
  ["archive", "Archives", "Connect with original sources."],
  ["chat", "Research Support", "Move your research forward."],
];

const collectionCards = [
  {
    image: "/images/botanical-book.png",
    eyebrow: "Rare books & manuscripts",
    title: "The natural world, on paper",
    copy:
      "Botanical illustrations that reveal the close relationship between art and observation.",
  },
  {
    image: "/images/archive-map.png",
    eyebrow: "Maps & exploration",
    title: "Mapping a changing world",
    copy:
      "Trace the places, journeys, and imagined borders that have shaped our world.",
  },
  {
    image: "/images/film-reel.png",
    eyebrow: "Sound & moving image",
    title: "Voices beyond the page",
    copy:
      "Listen to the oral histories and creative work that keep lived experience in conversation.",
  },
];

// =====================================================
// ICON COMPONENTS
// =====================================================

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`chevron ${open ? "chevron--open" : ""}`}
      viewBox="0 0 16 16"
    >
      <path d="m3 6 5 5 5-5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="arrow"
      viewBox="0 0 20 20"
    >
      <path d="M3 10h13M12 6l4 4-4 4" />
    </svg>
  );
}

function ResourceIcon({ type }: { type: string }) {
  const paths: Record<string, ReactNode> = {
    book: (
      <path d="M3 5.5c3-1 5-.2 6 1v10c-1-1.2-3-2-6-1V5.5Zm12 0c-3-1-5-.2-6 1v10c1-1.2 3-2 6-1V5.5Z" />
    ),

    database: (
      <>
        <ellipse cx="9" cy="5" rx="5.5" ry="2.5" />
        <path d="M3.5 5v8c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V5M3.5 9c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5" />
      </>
    ),

    collection: (
      <path d="M6 6V3h9v9h-3M3 6h9v9H3zM8 9h1m-3 3h3" />
    ),

    compass: (
      <>
        <circle cx="9" cy="9" r="6" />
        <path d="m11.5 6.5-1.3 3.7-3.7 1.3 1.3-3.7 3.7-1.3Z" />
      </>
    ),

    archive: (
      <path d="M3 5h12M4 5l1 10h8l1-10M2.5 2.5h13v3h-13zM7 9h4" />
    ),

    chat: (
      <path d="M3 3.5h12v8H8l-4 3v-3H3z" />
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="resource-icon"
      viewBox="0 0 18 18"
    >
      {paths[type]}
    </svg>
  );
}

// =====================================================
// MAIN APPLICATION
// =====================================================

export default function App() {
  const [activeMenu, setActiveMenu] =
    useState<MenuKey | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileSection, setMobileSection] =
    useState<MenuKey | null>(null);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const [comingSoon, setComingSoon] =
    useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  // =====================================================
  // PAGE ROUTING
  //
  // "/"            = Homepage
  // "/collections" = Digital Collections page
  // =====================================================

  const [pathname, setPathname] = useState(
    window.location.pathname
  );

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname);
      setActiveMenu(null);
      setMobileOpen(false);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // =====================================================
  // NAVIGATION FUNCTION
  // =====================================================

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }

    setPathname(path);

    // Close menus after navigating
    setActiveMenu(null);
    setSearchOpen(false);
    setMobileOpen(false);
    setMobileSection(null);
    setComingSoon(null);

    window.scrollTo(0, 0);
  };

  // =====================================================
  // DROPDOWN FUNCTION
  //
  // Click Collections -> opens dropdown
  // Click again -> closes dropdown
  // Other menu buttons behave the same way
  // =====================================================

  const toggleMenu = (key: MenuKey) => {
    setSearchOpen(false);

    setActiveMenu((current) =>
      current === key ? null : key
    );
  };

  // =====================================================
  // HANDLE DROPDOWN LINKS
  //
  // Digital Collections -> /collections
  // Other links -> existing Coming Soon behavior
  // =====================================================

  const getMenuLink = (key: MenuKey, link: string) => {
    if (
      key === "collections" &&
      link === "Digital Collections"
    ) {
      return "/collections";
    }

    return `#${link.toLowerCase().replaceAll(" ", "-")}`;
  };

  // =====================================================
  // CLOSE MENUS WHEN CLICKING OUTSIDE OR PRESSING ESCAPE
  // =====================================================

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        !headerRef.current?.contains(event.target as Node)
      ) {
        setActiveMenu(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setSearchOpen(false);
        setMobileOpen(false);
        setComingSoon(null);
      }
    };

    document.addEventListener(
      "pointerdown",
      closeOutside
    );

    document.addEventListener(
      "keydown",
      closeEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeOutside
      );

      document.removeEventListener(
        "keydown",
        closeEscape
      );
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => {
        searchRef.current?.focus();
      }, 310);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (comingSoon) {
      window.setTimeout(() => {
        dialogCloseRef.current?.focus();
      }, 50);
    }
  }, [comingSoon]);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();

    if (query.trim()) {
      setResult(query.trim());
    }
  };

  return (
    <div
      className="site-shell"

      // =================================================
      // LINK HANDLING
      //
      // IMPORTANT:
      // Allow real links such as /collections.
      // Do NOT show Coming Soon for Digital Collections.
      // =================================================

      onClickCapture={(event) => {
        const link = (
          event.target as HTMLElement
        ).closest("a");

        if (!link) return;

        if (link.classList.contains("skip-link")) {
          return;
        }

        const href = link.getAttribute("href");

        // Homepage logo and internal page navigation
        if (
          link.classList.contains("brand") ||
          href === "/" ||
          href === "/collections"
        ) {
          event.preventDefault();

          navigate(
            href === "/collections"
              ? "/collections"
              : "/"
          );

          return;
        }

        // Allow working anchor links
        if (
          href?.startsWith("#") &&
          href.length > 1 &&
          document.getElementById(href.slice(1))
        ) {
          return;
        }

        // Allow external URLs, mailto links, etc.
        if (!href?.startsWith("#")) {
          return;
        }

        // Show Coming Soon only for placeholder links
        if (href !== "#main-content") {
          event.preventDefault();

          setComingSoon(
            link.textContent?.trim() || "This page"
          );

          setActiveMenu(null);
          setSearchOpen(false);
          setMobileOpen(false);
        }
      }}
    >
      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <header
        className="site-header"
        ref={headerRef}
      >
        <a
          className="skip-link"
          href="#main-content"
        >
          Skip to main content
        </a>

        {/* TOP STRIP */}

        <div className="top-strip">
          <div className="page-width top-strip__inner">
            <span>University Libraries</span>

            <div>
              <a href="#hours">
                Library Hours
              </a>

              <a href="#librarian">
                Ask a Librarian
              </a>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* MAIN NAVIGATION */}
        {/* ========================================= */}

        <div className="nav-shell">
          <div className="page-width nav-inner">

            {/* LOGO -> HOMEPAGE */}

            <a
              className="brand"
              href="/"
              aria-label="Fulbright Digital Library home"
            >
              <span
                className="brand-seal brand-seal--header"
                aria-hidden="true"
              >
                <img
                  alt=""
                  className="header-brand-logo"
                  height="71"
                  src="/images/fulbright-seal.svg"
                  width="72"
                />
              </span>

              <span className="brand-copy">
                <small>
                  Fulbright University
                </small>

                <strong>
                  Digital Library
                </strong>
              </span>
            </a>

            {/* ===================================== */}
            {/* DESKTOP NAVIGATION */}
            {/* ===================================== */}

            <nav
              className="desktop-nav"
              aria-label="Main navigation"
            >
              {menuKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-controls={`mega-${key}`}
                  aria-expanded={activeMenu === key}
                  className={
                    activeMenu === key ||
                    (
                      key === "collections" &&
                      pathname === "/collections"
                    )
                      ? "active"
                      : ""
                  }

                  // =================================
                  // IMPORTANT CHANGE #1
                  //
                  // Collections opens its dropdown.
                  // It does NOT navigate directly.
                  // =================================

                  onClick={() => toggleMenu(key)}
                >
                  {menus[key].label}

                  <Chevron
                    open={activeMenu === key}
                  />
                </button>
              ))}

              {/* SEARCH BUTTON */}

              <button
                type="button"
                aria-controls="search-panel"
                aria-expanded={searchOpen}
                aria-label="Open search"
                className={`nav-search ${
                  searchOpen ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu(null);

                  setSearchOpen(
                    (open) => !open
                  );
                }}
              >
                <SearchIcon />
              </button>
            </nav>

            {/* MOBILE HAMBURGER */}

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
              className="hamburger"
              onClick={() => {
                setActiveMenu(null);
                setSearchOpen(false);

                setMobileOpen(
                  (open) => !open
                );
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* ========================================= */}
        {/* DESKTOP MEGA DROPDOWN */}
        {/* ========================================= */}

        <div
          className={`mega-layer ${
            activeMenu
              ? "mega-layer--open"
              : ""
          }`}
        >
          {menuKeys.map((key) => (
            <section
              key={key}
              id={`mega-${key}`}
              aria-hidden={activeMenu !== key}
              className={`mega-menu ${
                activeMenu === key
                  ? "mega-menu--active"
                  : ""
              }`}
            >
              <div className="page-width mega-grid">

                {/* DROPDOWN INTRODUCTION */}

                <div className="mega-intro">
                  <p className="kicker">
                    {menus[key].label}
                  </p>

                  <h2>
                    {menus[key].description}
                  </h2>
                </div>

                {/* ================================= */}
                {/* IMPORTANT CHANGE #2 */}
                {/* DIGITAL COLLECTIONS LINK */}
                {/* ================================= */}

                <div className="mega-links">
                  {menus[key].links.map((link) => (
                    <a
                      key={link}
                      href={getMenuLink(key, link)}
                      tabIndex={
                        activeMenu === key ? 0 : -1
                      }
                      onClick={(event) => {
                        if (
                          key === "collections" &&
                          link === "Digital Collections"
                        ) {
                          event.preventDefault();

                          navigate("/collections");
                        }
                      }}
                    >
                      {link}
                      <Arrow />
                    </a>
                  ))}
                </div>

                {/* DROPDOWN FEATURED IMAGE */}

                <div className="mega-feature">
                  <img
                    alt=""
                    src={
                      key === "visit"
                        ? "/images/library-exterior.png"
                        : "/images/library-reading-room.png"
                    }
                  />

                  <p>
                    Open doors. Open ideas.
                  </p>

                  <a
                    href="#discover"
                    tabIndex={
                      activeMenu === key ? 0 : -1
                    }
                  >
                    Discover more
                    <Arrow />
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ========================================= */}
        {/* SEARCH PANEL */}
        {/* ========================================= */}

        <section
          id="search-panel"
          aria-hidden={!searchOpen}
          className={`search-panel ${
            searchOpen
              ? "search-panel--open"
              : ""
          }`}
        >
          <div className="page-width panel-search-wrap">
            <p className="kicker">
              Search the library
            </p>

            <form
              className="large-search"
              onSubmit={submitSearch}
            >
              <SearchIcon />

              <label
                className="sr-only"
                htmlFor="panel-search"
              >
                Search library
              </label>

              <input
                id="panel-search"
                ref={searchRef}
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search books, articles, archives, and more"
                tabIndex={searchOpen ? 0 : -1}
              />

              <button
                type="submit"
                tabIndex={searchOpen ? 0 : -1}
              >
                Search
                <Arrow />
              </button>
            </form>
          </div>
        </section>

        {/* ========================================= */}
        {/* MOBILE MENU */}
        {/* ========================================= */}

        <section
          className={`mobile-drawer ${
            mobileOpen
              ? "mobile-drawer--open"
              : ""
          }`}
        >
          <form
            className="mobile-search"
            onSubmit={submitSearch}
          >
            <SearchIcon />

            <input
              aria-label="Search the library"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search the library"
              tabIndex={mobileOpen ? 0 : -1}
            />

            <button
              type="submit"
              tabIndex={mobileOpen ? 0 : -1}
            >
              Go
            </button>
          </form>

          {menuKeys.map((key) => (
            <div
              className="mobile-section"
              key={key}
            >
              <button
                type="button"
                aria-expanded={
                  mobileSection === key
                }
                tabIndex={
                  mobileOpen ? 0 : -1
                }
                onClick={() => {
                  setMobileSection(
                    (current) =>
                      current === key
                        ? null
                        : key
                  );
                }}
              >
                {menus[key].label}

                <Chevron
                  open={mobileSection === key}
                />
              </button>

              <div
                className={`mobile-links ${
                  mobileSection === key
                    ? "mobile-links--open"
                    : ""
                }`}
              >
                <div>

                  {/* ============================== */}
                  {/* IMPORTANT CHANGE #3 */}
                  {/* MOBILE DIGITAL COLLECTIONS */}
                  {/* ============================== */}

                  {menus[key].links.map((link) => (
                    <a
                      key={link}
                      href={getMenuLink(key, link)}
                      tabIndex={
                        mobileOpen &&
                        mobileSection === key
                          ? 0
                          : -1
                      }
                      onClick={(event) => {
                        if (
                          key === "collections" &&
                          link === "Digital Collections"
                        ) {
                          event.preventDefault();

                          navigate("/collections");
                        }
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </header>

      {/* ============================================= */}
      {/* PAGE OVERLAY */}
      {/* ============================================= */}

      <button
        type="button"
        aria-label="Close navigation"
        className={`page-overlay ${
          activeMenu ||
          searchOpen ||
          mobileOpen
            ? "page-overlay--visible"
            : ""
        }`}
        onClick={() => {
          setActiveMenu(null);
          setSearchOpen(false);
          setMobileOpen(false);
        }}
        tabIndex={-1}
      />

      {/* ============================================= */}
      {/* COMING SOON DIALOG */}
      {/* ============================================= */}

      {comingSoon && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-title"
          className="coming-soon-backdrop"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setComingSoon(null);
            }
          }}
        >
          <div className="coming-soon-dialog">
            <button
              type="button"
              aria-label="Close coming soon dialog"
              className="dialog-close"
              ref={dialogCloseRef}
              onClick={() =>
                setComingSoon(null)
              }
            >
              <span aria-hidden="true">
                ×
              </span>
            </button>

            <p className="kicker">
              Digital Library
            </p>

            <h2 id="coming-soon-title">
              Coming soon.
            </h2>

            <p>
              The{" "}
              <strong>
                {comingSoon}
              </strong>{" "}
              page is being prepared.
              Please check back soon.
            </p>

            <button
              type="button"
              className="dialog-action"
              onClick={() =>
                setComingSoon(null)
              }
            >
              Return to the library
            </button>
          </div>
        </div>
      )}

      {/* ============================================= */}
      {/* PAGE ROUTING */}
      {/* ============================================= */}

      {pathname === "/collections" ? (

        // =============================================
        // DIGITAL COLLECTIONS PAGE
        //
        // Render src/page/CollectionPage.tsx
        // =============================================

        <main id="main-content">
          <CollectionsPage navigate={navigate} />
        </main>

      ) : (

        // =============================================
        // ORIGINAL HOMEPAGE
        // =============================================

        <main id="main-content">

          {/* HERO SECTION */}

          <section className="page-width discovery">
            <p className="kicker">
              01 · Access every question
            </p>

            <h1>
              Knowledge . Explore
              <br />
              Possibility.
            </h1>

            <p className="intro">
              Explore books, archives, digital
              collections, research resources,
              and more.
            </p>

            <form
              className="large-search hero-search"
              onSubmit={submitSearch}
            >
              <SearchIcon />

              <label
                className="sr-only"
                htmlFor="hero-search"
              >
                Search library collections
              </label>

              <input
                id="hero-search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search books, articles, archives, and more"
              />

              <button type="submit">
                Search
                <Arrow />
              </button>
            </form>

            <div className="search-meta">
              <span>
                {result
                  ? `Searching for “${result}”`
                  : "One search. Many ways to discover."}
              </span>

              <a href="#advanced">
                Advanced search
              </a>
            </div>

            {/* QUICK RESOURCES */}

            <div className="resource-grid">
              {resources.map(
                ([icon, title, copy]) => (
                  <a
                    key={title}
                    href={
                      title === "Digital Collections"
                        ? "/collections"
                        : `#${title
                            .toLowerCase()
                            .replaceAll(" ", "-")}`
                    }
                  >
                    <ResourceIcon type={icon} />

                    <div>
                      <strong>{title}</strong>
                      <span>{copy}</span>
                    </div>

                    <Arrow />
                  </a>
                )
              )}
            </div>
          </section>

          {/* ========================================= */}
          {/* FEATURED INTRODUCTION */}
          {/* ========================================= */}

          <section className="page-width introduction">
            <p className="kicker section-rule">
              Featured introduction
            </p>

            <div className="introduction-grid">
              <figure>
                <img
                  alt="The historic university reading hall"
                  src="/images/library-reading-room.png"
                />

                <figcaption>
                  The Reading Hall · A space to pause,
                  question, and imagine.
                </figcaption>
              </figure>

              <div>
                <h2>
                  An open door to a world
                  <br />
                  of ideas.
                </h2>

                <p>
                  A library is more than what it
                  holds. It is what it makes possible.
                </p>

                <p>
                  At Alden, rare discoveries sit
                  alongside new perspectives.
                  Our collections, spaces, and people
                  bring disciplines together—and help
                  every curious mind find a way forward.
                </p>

                <a
                  className="text-link"
                  href="#about"
                >
                  Get to know your library
                  <Arrow />
                </a>
              </div>
            </div>
          </section>

          {/* ========================================= */}
          {/* COLLECTIONS SECTION */}
          {/* ========================================= */}

          <section className="collections-band">
            <div className="page-width">

              <div className="section-heading">
                <div>
                  <p className="kicker">
                    From the collections
                  </p>

                  <h2>
                    Unexpected connections start here.
                  </h2>
                </div>

                <a
                  className="text-link"
                  href="/collections"
                >
                  Explore all collections
                  <Arrow />
                </a>
              </div>

              <div className="collection-grid">
                {collectionCards.map((card) => (
                  <article key={card.title}>
                    <img
                      alt=""
                      src={card.image}
                    />

                    <p className="kicker">
                      {card.eyebrow}
                    </p>

                    <h3>
                      <a href="/collections">
                        {card.title}
                        <Arrow />
                      </a>
                    </h3>

                    <p>
                      {card.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================= */}
          {/* STUDY SECTION */}
          {/* ========================================= */}

          <section className="page-width study-section">
            <div>
              <p className="kicker">
                Make yourself at home
              </p>

              <h2>
                Room for your next idea.
              </h2>

              <p>
                Come to concentrate. Stay to connect.
                Find a space that works for the way
                you think.
              </p>

              <div className="study-links">
                {[
                  [
                    "Find your study space",
                    "Quiet corners, shared tables, and rooms for collaboration.",
                  ],
                  [
                    "Plan your visit",
                    "Directions, access information, and what to expect.",
                  ],
                  [
                    "Hours & locations",
                    "Find the right place—and the right time—to begin.",
                  ],
                ].map(([title, copy]) => (
                  <a
                    href="#study"
                    key={title}
                  >
                    <span>
                      <strong>
                        {title}
                      </strong>

                      <small>
                        {copy}
                      </small>
                    </span>

                    <Arrow />
                  </a>
                ))}
              </div>
            </div>

            <figure>
              <img
                alt="A quiet library study room"
                src="/images/study-room.png"
              />

              <figcaption>
                Find your focus in the Garden
                Reading Room.
              </figcaption>
            </figure>
          </section>

          {/* ========================================= */}
          {/* EVENTS SECTION */}
          {/* ========================================= */}

          <section className="page-width events-section">

            <div className="section-heading">
              <div>
                <p className="kicker">
                  At the library
                </p>

                <h2>
                  Ideas come to life.
                </h2>
              </div>

              <a
                className="text-link"
                href="#events"
              >
                All events & exhibitions
                <Arrow />
              </a>
            </div>

            <div className="events-grid">

              <article className="exhibition">
                <img
                  alt="An artist book in the exhibition"
                  src="/images/botanical-book.png"
                />

                <div>
                  <p className="kicker">
                    On view · Exhibition
                  </p>

                  <h3>
                    The life of the printed page
                  </h3>

                  <p>
                    From the first impression to
                    the artist&apos;s book, explore
                    the page as a place of possibility.
                  </p>

                  <a
                    className="text-link"
                    href="#exhibition"
                  >
                    Explore the exhibition
                    <Arrow />
                  </a>
                </div>
              </article>

              <div className="event-list">
                {[
                  [
                    "OCT",
                    "21",
                    "Workshop",
                    "Begin with the archive",
                    "2:00–3:30 pm · Special Collections Classroom",
                  ],
                  [
                    "OCT",
                    "28",
                    "Conversation",
                    "Who gets to tell the story?",
                    "5:00–6:00 pm · Alden Library Forum",
                  ],
                  [
                    "NOV",
                    "05",
                    "Research skills",
                    "A clearer path through your sources",
                    "12:00–1:00 pm · Online",
                  ],
                ].map(
                  ([
                    month,
                    day,
                    type,
                    title,
                    detail,
                  ]) => (
                    <a
                      href="#event"
                      key={day}
                    >
                      <time>
                        <small>
                          {month}
                        </small>

                        <strong>
                          {day}
                        </strong>
                      </time>

                      <div>
                        <p className="kicker">
                          {type}
                        </p>

                        <h3>
                          {title}
                        </h3>

                        <span>
                          {detail}
                        </span>
                      </div>

                      <Arrow />
                    </a>
                  )
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ============================================= */}
      {/* FOOTER */}
      {/* ============================================= */}

      <footer className="site-footer">

        {/* FOOTER CTA */}

        <div className="footer-cta">
          <div className="page-width footer-cta__inner">

            <div>
              <h2>
                A good question deserves
                a conversation.
              </h2>

              <p>
                From your first source to your final
                citation, our librarians are here
                to help.
              </p>
            </div>

            <div className="footer-cta__action">
              <a href="#librarian">
                Ask a Librarian
                <Arrow />
              </a>

              <span>
                Or schedule a research consultation
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER LINKS */}

        <div className="footer-main">
          <div className="page-width">

            <div className="footer-grid">

              {/* IDENTITY */}

              <div className="footer-identity">
                <div className="brand brand--footer">
                  <img
                    alt=""
                    className="footer-brand-logo"
                    height="71"
                    src="/images/fulbright-seal.svg"
                    width="72"
                  />

                  <span className="brand-copy">
                    <small>
                      Fulbright University
                    </small>

                    <strong>
                      Digital Library
                    </strong>
                  </span>
                </div>

                <p>
                  Open minds. Shared knowledge.
                  A world of possibility.
                </p>

                <small>
                  © Fulbright University
                </small>
              </div>

              {/* EXPLORE */}

              <div className="footer-column">
                <p>
                  Explore
                </p>

                <a href="/collections">
                  Collections
                </a>

                <a href="#visit">
                  Visit the library
                </a>

                <a href="#research-services">
                  Research services
                </a>

                <a href="#about">
                  About the Library
                </a>
              </div>

              {/* COMMUNITY */}

              <div className="footer-column">
                <p>
                  For our community
                </p>

                <a href="#students">
                  Students
                </a>

                <a href="#faculty">
                  Faculty & researchers
                </a>

                <a href="#alumni">
                  Alumni & visitors
                </a>

                <a href="#support">
                  Support the library
                </a>
              </div>

              {/* CONNECT */}

              <div className="footer-column">
                <p>
                  Connect
                </p>

                <a href="#contact">
                  Contact us
                </a>

                <a href="#librarian">
                  Ask a Librarian
                </a>

                <a href="#hours">
                  Library hours
                </a>

                <a href="#social">
                  News & stories
                </a>
              </div>
            </div>

            {/* FOOTER BOTTOM */}

            <div className="footer-footnote">
              <span>
                © 2025 Fulbright University.
                All rights reserved.
              </span>

              <div>
                <a href="#privacy">
                  Privacy
                </a>

                <a href="#accessibility">
                  Accessibility
                </a>

                <a href="#terms">
                  Terms of use
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
