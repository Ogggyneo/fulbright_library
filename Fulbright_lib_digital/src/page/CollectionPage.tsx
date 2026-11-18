
import { useMemo, useState } from "react";
import "./CollectionsPage.css";

type Category =
  | "All"
  | "Books & Journals"
  | "Digital"
  | "Archives"
  | "Databases"
  | "Multimedia";

type Collection = {
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  image: string;
  link?: string;
};

const categories: Category[] = [
  "All",
  "Books & Journals",
  "Digital",
  "Archives",
  "Databases",
  "Multimedia",
];

const collections: Collection[] = [
  {
    title: "Library Catalog",
    category: "Books & Journals",
    description:
      "Discover print books, journals, and other materials available through the library.",
    image: "/images/botanical-book.png",
  },
  {
    title: "Digital Collections",
    category: "Digital",
    description:
      "Explore digital publications and resources for learning and research.",
    image: "/images/archive-map.png",
  },
  {
    title: "Archives & Special Collections",
    category: "Archives",
    description:
      "Explore archival sources and unique research materials.",
    image: "/images/library-reading-room.png",
  },
  {
    title: "Academic Search Complete",
    category: "Databases",
    description:
      "A multidisciplinary academic research database.",
    image: "/images/botanical-book.png",
  },
  {
    title: "JSTOR",
    category: "Databases",
    description:
      "Research across journals, books, and primary sources.",
    image: "/images/archive-map.png",
    link: "https://www.jstor.org/",
  },
  {
    title: "Kanopy",
    category: "Multimedia",
    description:
      "Discover educational films and documentaries.",
    image: "/images/film-reel.png",
    link: "https://www.kanopy.com/",
  },
  {
    title: "APA PsycARTICLES",
    category: "Databases",
    description:
      "Explore peer-reviewed research in psychology.",
    image: "/images/library-reading-room.png",
  },
  {
    title: "EconLit",
    category: "Databases",
    description:
      "Find scholarly literature in economics.",
    image: "/images/archive-map.png",
  },
];

export default function CollectionsPage({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const [category, setCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Collection | null>(
    null
  );

  const visible = useMemo(
    () =>
      collections.filter(
        (c) =>
          (category === "All" || c.category === category) &&
          `${c.title} ${c.description} ${c.category}`
            .toLowerCase()
            .includes(search.trim().toLowerCase())
      ),
    [category, search]
  );

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  const goToCategory = (cat: Category) => {
    setCategory(cat);
    document.getElementById("browse")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="collections-page">
      {/* HERO */}
      <section className="cp-hero">
        <div className="cp-wrap">
          <nav
            className="cp-breadcrumb"
            aria-label="Breadcrumb"
          >
            <button onClick={() => navigate("/")}>
              Home
            </button>
            <span>/</span>
            <span>Collections</span>
          </nav>

          <div className="cp-eyebrow">
            DISCOVER THE LIBRARY
          </div>

          <h1>
            Explore our
            <br />
            <em>collections.</em>
          </h1>

          <p>
            Discover books, journals, archives, digital
            resources, and research materials that open
            new ways to learn, question, and explore.
          </p>

          <a href="#browse" className="cp-primary">
            Browse collections <span>↗</span>
          </a>
        </div>
      </section>

      {/* DISCOVERY OPTIONS */}
      <section className="cp-wrap cp-section">
        <div className="cp-section-heading">
          <div>
            <span className="cp-eyebrow">
              WHERE TO BEGIN
            </span>
            <h2>Start your discovery.</h2>
          </div>
          <p>
            Whatever you're looking for, there's a
            place to start.
          </p>
        </div>

        <div className="cp-entry-grid">
          {[
            {
              num: "01",
              title: "Library Catalog",
              desc: "Find books, journals, and physical materials.",
              cat: "Books & Journals" as Category,
            },
            {
              num: "02",
              title: "Digital Collections",
              desc: "Discover resources available online.",
              cat: "Digital" as Category,
            },
            {
              num: "03",
              title: "Databases & Research",
              desc: "Explore academic databases and scholarly resources.",
              cat: "Databases" as Category,
            },
          ].map((item) => (
            <button
              className="cp-entry"
              key={item.title}
              onClick={() => goToCategory(item.cat)}
            >
              <span className="cp-number">
                {item.num}
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="cp-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="cp-feature">
        <div className="cp-wrap cp-feature-inner">
          <div>
            <span className="cp-eyebrow">
              CURATED DISCOVERY
            </span>
            <h2>
              Every collection
              <br />
              has a story.
            </h2>
            <p>
              From historical records to contemporary
              research, discover the ideas and materials
              that connect disciplines.
            </p>
            <a href="#browse" className="cp-text-link">
              Explore the collections ↗
            </a>
          </div>

          <img
            src="/images/library-reading-room.png"
            alt="Library reading room"
          />
        </div>
      </section>

      {/* BROWSE COLLECTIONS */}
      <section
        className="cp-wrap cp-section"
        id="browse"
      >
        <div className="cp-section-heading">
          <div>
            <span className="cp-eyebrow">
              EXPLORE MORE
            </span>
            <h2>Browse collections.</h2>
          </div>
          <p>
            Search and filter resources by subject
            or format.
          </p>
        </div>

        <div className="cp-tools">
          <label className="cp-search">
            <span aria-hidden="true">⌕</span>
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search collections..."
              aria-label="Search collections"
            />
          </label>

          <div
            className="cp-filters"
            aria-label="Collection categories"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={
                  category === cat ? "is-active" : ""
                }
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="cp-results">
          Showing {visible.length}{" "}
          {visible.length === 1
            ? "collection"
            : "collections"}

          {(search || category !== "All") && (
            <button onClick={clearFilters}>
              Clear filters ×
            </button>
          )}
        </div>

        {visible.length > 0 ? (
          <div className="cp-card-grid">
            {visible.map((c) => (
              <article
                className="cp-card"
                key={c.title}
              >
                <button
                  className="cp-card-action"
                  onClick={() => setSelected(c)}
                  aria-label={`View ${c.title}`}
                >
                  <div className="cp-image">
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                    />
                  </div>

                  <span className="cp-card-category">
                    {c.category}
                  </span>

                  <h3>
                    {c.title}
                    <span>↗</span>
                  </h3>

                  <p>{c.description}</p>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="cp-empty">
            <h3>No matching collections</h3>
            <p>
              Try another keyword or clear your
              filters.
            </p>
            <button onClick={clearFilters}>
              Show all collections
            </button>
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section className="cp-bottom">
        <div className="cp-wrap cp-bottom-inner">
          <div>
            <span className="cp-eyebrow">
              NEED A HAND?
            </span>
            <h2>
              Research starts with a question.
            </h2>
            <p>
              Our library team can help you find
              the right resources and get started.
            </p>
          </div>

          <a href="mailto:library@fulbright.edu.vn">
            Contact the library ↗
          </a>
        </div>
      </section>

      {/* COLLECTION DETAILS MODAL */}
      {selected && (
        <div
          className="cp-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <section
            className="cp-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <button
              className="cp-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>

            <span className="cp-eyebrow">
              {selected.category}
            </span>

            <h2>{selected.title}</h2>
            <p>{selected.description}</p>

            {selected.link ? (
              <a
                href={selected.link}
                target="_blank"
                rel="noreferrer"
              >
                Visit resource ↗
              </a>
            ) : (
              <p className="cp-note">
                This is a sample collection entry.
                Connect it to your library catalog
                or database URL when available.
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
