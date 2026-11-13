import { FormEvent, useEffect, useRef, useState } from "react"

type MenuKey = "collections" | "visit" | "services" | "about"

const menus: Record<MenuKey, {
  label: string
  description: string
  links: string[]
}> = {
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
    description: "Find your place to read, study, research, or collaborate.",
    links: [
      "Vising the Library",
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
    description: "Meet the people and discover the purpose behind the library.",
    links: [
      "Our Mission",
      "Library Overview",
      "Library Staff",
      "News & Updates",
      "Grant and Funding",
      "Contact Us",
    ],
  },
}

const menuKeys = Object.keys(menus) as MenuKey[]

const resources = [
  ["book", "Library Catalog", "Find books, journals, and media."],
  ["database", "Databases", "Explore subject-specific sources."],
  ["collection", "Digital Collections", "Discover materials from anywhere."],
  ["compass", "Research Guides", "Start with expert-curated resources."],
  ["archive", "Archives", "Connect with original sources."],
  ["chat", "Research Support", "Move your research forward."],
]

const collectionCards = [
  {
    image: "/images/botanical-book.png",
    eyebrow: "Rare books & manuscripts",
    title: "The natural world, on paper",
    copy: "Botanical illustrations that reveal the close relationship between art and observation.",
  },
  {
    image: "/images/archive-map.png",
    eyebrow: "Maps & exploration",
    title: "Mapping a changing world",
    copy: "Trace the places, journeys, and imagined borders that have shaped our world.",
  },
  {
    image: "/images/film-reel.png",
    eyebrow: "Sound & moving image",
    title: "Voices beyond the page",
    copy: "Listen to the oral histories and creative work that keep lived experience in conversation.",
  },
]

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`chevron ${open ? "chevron--open" : ""}`}
      viewBox="0 0 16 16"
    >
      <path d="m3 6 5 5 5-5" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg aria-hidden="true" className="arrow" viewBox="0 0 20 20">
      <path d="M3 10h13M12 6l4 4-4 4" />
    </svg>
  )
}

function ResourceIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    book: (
      <path d="M3 5.5c3-1 5-.2 6 1v10c-1-1.2-3-2-6-1V5.5Zm12 0c-3-1-5-.2-6 1v10c1-1.2 3-2 6-1V5.5Z" />
    ),
    database: (
      <>
        <ellipse cx="9" cy="5" rx="5.5" ry="2.5" />
        <path d="M3.5 5v8c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V5M3.5 9c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5" />
      </>
    ),
    collection: <path d="M6 6V3h9v9h-3M3 6h9v9H3zM8 9h1m-3 3h3" />,
    compass: (
      <>
        <circle cx="9" cy="9" r="6" />
        <path d="m11.5 6.5-1.3 3.7-3.7 1.3 1.3-3.7 3.7-1.3Z" />
      </>
    ),
    archive: <path d="M3 5h12M4 5l1 10h8l1-10M2.5 2.5h13v3h-13zM7 9h4" />,
    chat: <path d="M3 3.5h12v8H8l-4 3v-3H3z" />,
  }
  return (
    <svg aria-hidden="true" className="resource-icon" viewBox="0 0 18 18">
      {paths[type]}
    </svg>
  )
}

export default function App() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null)
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")
  const [comingSoon, setComingSoon] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveMenu(null)
        setSearchOpen(false)
        setMobileOpen(false)
        setComingSoon(null)
      }
    }
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null)
        setSearchOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener("pointerdown", closeOutside)
    document.addEventListener("keydown", closeEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOutside)
      document.removeEventListener("keydown", closeEscape)
    }
  }, [])

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => searchRef.current?.focus(), 310)
  }, [searchOpen])

  useEffect(() => {
    if (comingSoon) window.setTimeout(() => dialogCloseRef.current?.focus(), 50)
  }, [comingSoon])

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    if (query.trim()) setResult(query.trim())
  }

  const toggleMenu = (key: MenuKey) => {
    setSearchOpen(false)
    setActiveMenu((current) => (current === key ? null : key))
  }

  return (
    <div
      className="site-shell"
      onClickCapture={(event) => {
        const link = (event.target as HTMLElement).closest("a")
        if (
          !link ||
          link.classList.contains("brand") ||
          link.classList.contains("skip-link")
        )
          return

        event.preventDefault()
        setComingSoon(link.textContent?.trim() || "This page")
        setActiveMenu(null)
        setSearchOpen(false)
        setMobileOpen(false)
      }}
    >
      <header className="site-header" ref={headerRef}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="top-strip">
          <div className="page-width top-strip__inner">
            <span>University Libraries</span>
            <div>
              <a href="#hours">Library Hours</a>
              <a href="#librarian">Ask a Librarian</a>
            </div>
          </div>
        </div>
        <div className="nav-shell">
          <div className="page-width nav-inner">
            <a
              className="brand"
              href="#"
              aria-label="University Digital Library home"
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
                <small>Fulbright University</small>
                <strong>Digital Library</strong>
              </span>
            </a>
            <nav className="desktop-nav" aria-label="Main navigation">
              {menuKeys.map((key) => (
                <button
                  aria-controls={`mega-${key}`}
                  aria-expanded={activeMenu === key}
                  className={activeMenu === key ? "active" : ""}
                  key={key}
                  onClick={() => toggleMenu(key)}
                  type="button"
                >
                  {menus[key].label}
                  <Chevron open={activeMenu === key} />
                </button>
              ))}
              <button
                aria-controls="search-panel"
                aria-expanded={searchOpen}
                aria-label="Open search"
                className={`nav-search ${searchOpen ? "active" : ""}`}
                onClick={() => {
                  setActiveMenu(null)
                  setSearchOpen((open) => !open)
                }}
                type="button"
              >
                <SearchIcon />
              </button>
            </nav>
            <button
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="hamburger"
              onClick={() => {
                setActiveMenu(null)
                setSearchOpen(false)
                setMobileOpen((open) => !open)
              }}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`mega-layer ${activeMenu ? "mega-layer--open" : ""}`}>
          {menuKeys.map((key) => (
            <section
              aria-hidden={activeMenu !== key}
              className={`mega-menu ${
                activeMenu === key ? "mega-menu--active" : ""
              }`}
              id={`mega-${key}`}
              key={key}
            >
              <div className="page-width mega-grid">
                <div className="mega-intro">
                  <p className="kicker">{menus[key].label}</p>
                  <h2>{menus[key].description}</h2>
                </div>
                <div className="mega-links">
                  {menus[key].links.map((link) => (
                    <a
                      href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
                      key={link}
                    >
                      {link} <Arrow />
                    </a>
                  ))}
                </div>
                <div className="mega-feature">
                  <img
                    alt=""
                    src={
                      key === "visit"
                        ? "/images/library-exterior.png"
                        : "/images/library-reading-room.png"
                    }
                  />
                  <p>Open doors. Open ideas.</p>
                  <a href="#discover">
                    Discover more <Arrow />
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section
          aria-hidden={!searchOpen}
          className={`search-panel ${searchOpen ? "search-panel--open" : ""}`}
          id="search-panel"
        >
          <div className="page-width panel-search-wrap">
            <p className="kicker">Search the library</p>
            <form className="large-search" onSubmit={submitSearch}>
              <SearchIcon />
              <label className="sr-only" htmlFor="panel-search">
                Search library
              </label>
              <input
                id="panel-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search books, articles, archives, and more"
                ref={searchRef}
                tabIndex={searchOpen ? 0 : -1}
                value={query}
              />
              <button tabIndex={searchOpen ? 0 : -1} type="submit">
                Search <Arrow />
              </button>
            </form>
          </div>
        </section>

        <section
          className={`mobile-drawer ${mobileOpen ? "mobile-drawer--open" : ""}`}
        >
          <form className="mobile-search" onSubmit={submitSearch}>
            <SearchIcon />
            <input
              aria-label="Search the library"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the library"
              tabIndex={mobileOpen ? 0 : -1}
              value={query}
            />
            <button tabIndex={mobileOpen ? 0 : -1}>Go</button>
          </form>
          {menuKeys.map((key) => (
            <div className="mobile-section" key={key}>
              <button
                aria-expanded={mobileSection === key}
                onClick={() =>
                  setMobileSection((current) => (current === key ? null : key))
                }
                tabIndex={mobileOpen ? 0 : -1}
                type="button"
              >
                {menus[key].label}
                <Chevron open={mobileSection === key} />
              </button>
              <div
                className={`mobile-links ${
                  mobileSection === key ? "mobile-links--open" : ""
                }`}
              >
                <div>
                  {menus[key].links.map((link) => (
                    <a
                      href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
                      key={link}
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

      <button
        aria-label="Close navigation"
        className={`page-overlay ${
          activeMenu || searchOpen || mobileOpen ? "page-overlay--visible" : ""
        }`}
        onClick={() => {
          setActiveMenu(null)
          setSearchOpen(false)
          setMobileOpen(false)
        }}
        tabIndex={-1}
        type="button"
      />

      {comingSoon && (
        <div
          aria-labelledby="coming-soon-title"
          aria-modal="true"
          className="coming-soon-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setComingSoon(null)
          }}
          role="dialog"
        >
          <div className="coming-soon-dialog">
            <button
              aria-label="Close coming soon dialog"
              className="dialog-close"
              onClick={() => setComingSoon(null)}
              ref={dialogCloseRef}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
            <p className="kicker">Digital Library</p>
            <h2 id="coming-soon-title">Coming soon.</h2>
            <p>
              The <strong>{comingSoon}</strong> page is being prepared. Please
              check back soon.
            </p>
            <button
              className="dialog-action"
              onClick={() => setComingSoon(null)}
              type="button"
            >
              Return to the library
            </button>
          </div>
        </div>
      )}

      <main id="main-content">
        <section className="page-width discovery">
          <p className="kicker">01 · Access every question</p>
          <h1>
            Knowledge . Explore
            <br />
            Possibility.
          </h1>
          <p className="intro">
            Explore books, archives, digital collections, research resources,
            and more.
          </p>
          <form className="large-search hero-search" onSubmit={submitSearch}>
            <SearchIcon />
            <label className="sr-only" htmlFor="hero-search">
              Search library collections
            </label>
            <input
              id="hero-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search books, articles, archives, and more"
              value={query}
            />
            <button type="submit">
              Search <Arrow />
            </button>
          </form>
          <div className="search-meta">
            <span>
              {result
                ? `Searching for “${result}”`
                : "One search. Many ways to discover."}
            </span>
            <a href="#advanced">Advanced search</a>
          </div>
          <div className="resource-grid">
            {resources.map(([icon, title, copy]) => (
              <a
                href={`#${title.toLowerCase().replaceAll(" ", "-")}`}
                key={title}
              >
                <ResourceIcon type={icon} />
                <div>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </div>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        <section className="page-width introduction">
          <p className="kicker section-rule">Featured introduction</p>
          <div className="introduction-grid">
            <figure>
              <img
                alt="The historic university reading hall"
                src="/images/library-reading-room.png"
              />
              <figcaption>
                The Reading Hall · A space to pause, question, and imagine.
              </figcaption>
            </figure>
            <div>
              <h2>
                An open door to a world
                <br />
                of ideas.
              </h2>
              <p>
                A library is more than what it holds. It is what it makes
                possible.
              </p>
              <p>
                At Alden, rare discoveries sit alongside new perspectives. Our
                collections, spaces, and people bring disciplines together—and
                help every curious mind find a way forward.
              </p>
              <a className="text-link" href="#about">
                Get to know your library <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="collections-band">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <p className="kicker">From the collections</p>
                <h2>Unexpected connections start here.</h2>
              </div>
              <a className="text-link" href="#all-collections">
                Explore all collections <Arrow />
              </a>
            </div>
            <div className="collection-grid">
              {collectionCards.map((card) => (
                <article key={card.title}>
                  <img alt="" src={card.image} />
                  <p className="kicker">{card.eyebrow}</p>
                  <h3>
                    <a href="#collection">
                      {card.title} <Arrow />
                    </a>
                  </h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-width study-section">
          <div>
            <p className="kicker">Make yourself at home</p>
            <h2>Room for your next idea.</h2>
            <p>
              Come to concentrate. Stay to connect. Find a space that works for
              the way you think.
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
                <a href="#study" key={title}>
                  <span>
                    <strong>{title}</strong>
                    <small>{copy}</small>
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
            <figcaption>Find your focus in the Garden Reading Room.</figcaption>
          </figure>
        </section>

        <section className="page-width events-section">
          <div className="section-heading">
            <div>
              <p className="kicker">At the library</p>
              <h2>Ideas come to life.</h2>
            </div>
            <a className="text-link" href="#events">
              All events & exhibitions <Arrow />
            </a>
          </div>
          <div className="events-grid">
            <article className="exhibition">
              <img
                alt="An artist book in the exhibition"
                src="/images/botanical-book.png"
              />
              <div>
                <p className="kicker">On view · Exhibition</p>
                <h3>The life of the printed page</h3>
                <p>
                  From the first impression to the artist&apos;s book, explore
                  the page as a place of possibility.
                </p>
                <a className="text-link" href="#exhibition">
                  Explore the exhibition <Arrow />
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
              ].map(([month, day, type, title, detail]) => (
                <a href="#event" key={day}>
                  <time>
                    <small>{month}</small>
                    <strong>{day}</strong>
                  </time>
                  <div>
                    <p className="kicker">{type}</p>
                    <h3>{title}</h3>
                    <span>{detail}</span>
                  </div>
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-cta">
          <div className="page-width footer-cta__inner">
            <div>
              <h2>A good question deserves a conversation.</h2>
              <p>
                From your first source to your final citation, our librarians
                are here to help.
              </p>
            </div>
            <div className="footer-cta__action">
              <a href="#librarian">
                Ask a Librarian <Arrow />
              </a>
              <span>Or schedule a research consultation</span>
            </div>
          </div>
        </div>
        <div className="footer-main">
          <div className="page-width">
            <div className="footer-grid">
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
                    <small>Federal University</small>
                    <strong>Digital Library</strong>
                  </span>
                </div>
                <p>Open minds. Shared knowledge. A world of possibility.</p>
                <small>© Federal University</small>
              </div>
              <div className="footer-column">
                <p>Explore</p>
                <a href="#collections">Collections</a>
                <a href="#visit">Visit the library</a>
                <a href="#research-services">Research services</a>
                <a href="#about">About Alden Library</a>
              </div>
              <div className="footer-column">
                <p>For our community</p>
                <a href="#students">Students</a>
                <a href="#faculty">Faculty & researchers</a>
                <a href="#alumni">Alumni & visitors</a>
                <a href="#support">Support the library</a>
              </div>
              <div className="footer-column">
                <p>Connect</p>
                <a href="#contact">Contact us</a>
                <a href="#librarian">Ask a Librarian</a>
                <a href="#hours">Library hours</a>
                <a href="#social">News & stories</a>
              </div>
            </div>
            <div className="footer-footnote">
              <span>© 2025 Federal University. All rights reserved.</span>
              <div>
                <a href="#privacy">Privacy</a>
                <a href="#accessibility">Accessibility</a>
                <a href="#terms">Terms of use</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
