import { FormEvent, ReactNode, useEffect, useState } from "react";

type RequestType = "Demozugang" | "Präsentation";

type FormState = {
  name: string;
  company: string;
  email: string;
  users: string;
  requestType: RequestType;
  message: string;
};

type MediaFrameProps = {
  image: string;
  imageAlt: string;
  className?: string;
  children?: ReactNode;
};

const imagePath = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

const showcaseImages = [
  {
    title: "Zentrale Startseite",
    image: imagePath("tw365-header.webp"),
    imageAlt: "Startseite von TeamWork 365",
    size: "large",
  },
  {
    title: "Dashboard",
    image: imagePath("tw365-dashboard.webp"),
    imageAlt: "Dashboard in TeamWork 365",
    size: "small",
  },
  {
    title: "Angebote",
    image: imagePath("tw365-sales.webp"),
    imageAlt: "Angebotsansicht in TeamWork 365",
    size: "small",
  },
];

const functionStories = [
  {
    eyebrow: "Übersicht",
    title: "Alle relevanten Informationen auf einen Blick.",
    text: "Das Dashboard bündelt Kennzahlen, Links, Aufgaben und Kundenkontext in einer Oberfläche, mit der Teams direkt arbeitsfähig sind.",
    bullets: ["Schneller Einstieg in den Tagesstart", "Transparenter Überblick für Vertrieb und Service", "Weniger Wechsel zwischen Tools und Listen"],
    image: imagePath("tw365-dashboard.webp"),
    imageAlt: "Dashboard mit Kennzahlen in TeamWork 365",
  },
  {
    eyebrow: "Lead bis Angebot",
    title: "Vom ersten Kontakt bis zum konkreten Angebot.",
    text: "Leads, Adresspool und Angebotsprozesse bleiben in einem digitalen Fluss, sodass Marketing und Vertrieb sauber zusammenarbeiten können.",
    bullets: ["Leads und Kontakte zentral verwalten", "Angebote direkt im Browser vorbereiten", "Saubere Übergabe in operative SAP-Prozesse"],
    image: imagePath("tw365-sales.webp"),
    imageAlt: "Angebotsansicht in TeamWork 365",
  },
  {
    eyebrow: "Service & Techniker",
    title: "Kundenkontext auch außerhalb des klassischen ERP-Zugangs.",
    text: "Techniker und Service-Teams sehen Aktivitäten, Status und Notizen dort, wo sie im Alltag wirklich gebraucht werden.",
    bullets: ["CRM-Aktivitäten nachvollziehbar dokumentieren", "Wichtige Kundendaten schneller erreichen", "Bessere Abstimmung zwischen Innen- und Außendienst"],
    image: imagePath("tw365-techniker.webp"),
    imageAlt: "Technikeransicht in TeamWork 365",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    subtitle: "Für kleine Teams bis 3 User",
    price: "6,90 €",
    highlight: false,
    description: "Der Einstieg für kleine Teams mit CRM-Zugriff, Kundenkontext und digitalen Angeboten.",
    points: ["Dashboard & Linkzentrale", "Geschäftspartner & Ansprechpartner", "CRM-Aktivitäten"],
  },
  {
    name: "Pro",
    subtitle: "Für wachsende Teams mit beliebiger Useranzahl",
    price: "9,90 €",
    highlight: true,
    description: "Das Standardpaket für Vertrieb, Techniker und Marketing mit API-Zugang und erweitertem Prozessfokus.",
    points: ["Alles aus Starter", "API inklusive", "Auftragsansicht & digitale Prozesse"],
  },
  {
    name: "Premium",
    subtitle: "Für Unternehmen mit Portal- und Ökosystem-Fokus",
    price: "19,90 €",
    highlight: false,
    description: "Für digitale Kundenerlebnisse, externe Szenarien und anspruchsvollere Integrationslandschaften.",
    points: ["Alles aus Pro", "Adresspool & Leads", "Externe Portal-Szenarien"],
  },
];

const integrations = ["SAP Business One", "Power Automate", "Zapier", "Typeform", "HubSpot", "Salesforce"];

const stats = [
  { label: "Cloud-Hosting", value: "Deutschland" },
  { label: "Kostenlos testen", value: "30 Tage" },
  { label: "Integrationsansatz", value: "API-first" },
];

const initialFormState: FormState = {
  name: "",
  company: "",
  email: "",
  users: "",
  requestType: "Demozugang",
  message: "",
};

function MediaFrame({ image, imageAlt, className = "", children }: MediaFrameProps) {
  return (
    <figure className={`media-frame ${className}`.trim()}>
      <img src={image} alt={imageAlt} />
      {children}
    </figure>
  );
}

function App() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `${formState.requestType} für TeamWork 365`;
    const body = [
      `Name: ${formState.name}`,
      `Unternehmen: ${formState.company}`,
      `E-Mail: ${formState.email}`,
      `Gewünschte Nutzerzahl: ${formState.users || "nicht angegeben"}`,
      `Anfragetyp: ${formState.requestType}`,
      "",
      "Nachricht:",
      formState.message || "Keine weitere Nachricht angegeben.",
    ].join("\n");

    window.location.href = `mailto:info@teamwork365.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("success");
    setFormState(initialFormState);
  };

  return (
    <div className="page-shell">
      <header className="hero" id="top">
        <nav className="topbar">
          <a className="brand" href="#top">
            <span className="brand-mark">TW</span>
            <span>
              TeamWork <strong>365</strong>
            </span>
          </a>

          <div className="nav-links">
            <a href="#produkt">Produkt</a>
            <a href="#funktionen">Funktionen</a>
            <a href="#pricing">Pricing</a>
            <a href="#anfrage">Demo anfragen</a>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">CRM-Erweiterung für den SAP Business One Web Client</p>
            <h1>TeamWork 365 zeigt sich als Produkt, nicht nur als Text.</h1>
            <p className="lead">
              Die Seite führt Besucher in einer ruhigen Reihenfolge durch Oberfläche, Funktionen, Preise und die direkte Anfrage für einen Demozugang oder eine Präsentation.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#anfrage">
                Demozugang anfragen
              </a>
              <a className="button button-secondary" href="#pricing">
                Preise ansehen
              </a>
            </div>

            <div className="hero-stats">
              {stats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <aside className="hero-stage">
            <MediaFrame image={imagePath("tw365-header.webp")} imageAlt="Startseite von TeamWork 365" className="hero-main-shot">
              <figcaption className="shot-badge">Live in der Anwendung</figcaption>
            </MediaFrame>
          </aside>
        </div>
      </header>

      <main>
        <section className="section section-showcase" id="produkt" data-reveal="up">
          <div className="section-heading section-heading-wide">
            <div>
              <p className="eyebrow">Produkteindruck</p>
              <h2>Ein flüssiger Einstieg über echte Oberflächen statt über lange Erklärblöcke.</h2>
            </div>
            <p>
              Besucher bekommen zuerst ein Gefühl für die Anwendung. Erst danach folgen Funktionen, Preisstufen und die Kontaktaufnahme.
            </p>
          </div>

          <div className="showcase-grid">
            {showcaseImages.map((item) => (
              <article className={`showcase-card showcase-card-${item.size}`} key={item.title} data-reveal="up">
                <MediaFrame image={item.image} imageAlt={item.imageAlt} className="showcase-frame" />
                <div className="showcase-label">
                  <span>{item.title}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-stories" id="funktionen" data-reveal="up">
          <div className="section-heading narrow">
            <p className="eyebrow">Funktionsumfang</p>
            <h2>Die wichtigsten Einsatzbereiche werden als Bild-Story erzählt.</h2>
          </div>

          <div className="function-grid">
            {functionStories.map((story) => (
              <article className="function-card" key={story.title} data-reveal="up">
                <div className="story-copy">
                  <p className="eyebrow">{story.eyebrow}</p>
                  <h3>{story.title}</h3>
                  <p>{story.text}</p>
                  <ul className="story-points">
                    {story.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>

                <MediaFrame image={story.image} imageAlt={story.imageAlt} className="story-frame" />
              </article>
            ))}
          </div>
        </section>

        <section className="section section-integrations" data-reveal="up">
          <div className="section-heading narrow">
            <p className="eyebrow">Integrationen</p>
            <h2>TeamWork 365 fügt sich in bestehende Prozesse und Tools ein.</h2>
          </div>

          <div className="integration-band">
            {integrations.map((integration) => (
              <span key={integration}>{integration}</span>
            ))}
          </div>
        </section>

        <section className="section section-pricing" id="pricing" data-reveal="up">
          <div className="section-heading narrow">
            <p className="eyebrow">Pricing</p>
            <h2>Klare Pakete, direkt vergleichbar und ohne visuelles Durcheinander.</h2>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <article className={`pricing-card ${plan.highlight ? "highlight" : ""}`} key={plan.name} data-reveal="up">
                <div className="pricing-top">
                  {plan.highlight ? <span className="pill">Am beliebtesten</span> : <span className="pill pill-placeholder">Am beliebtesten</span>}
                  <h3>{plan.name}</h3>
                  <p className="plan-subtitle">{plan.subtitle}</p>
                </div>

                <div className="plan-price-row">
                  <strong>{plan.price}</strong>
                  <span>pro Benutzer / Monat</span>
                </div>

                <p>{plan.description}</p>

                <ul className="pricing-points">
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-contact" id="anfrage" data-reveal="up">
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Demo oder Präsentation</p>
              <h2>Interesse direkt in eine konkrete Anfrage verwandeln.</h2>
              <p>
                Das Formular bleibt bewusst leichtgewichtig. Besucher können schnell einen Demozugang oder eine Präsentation anfordern, ohne durch zu viele Felder ausgebremst zu werden.
              </p>

              <MediaFrame image={imagePath("tw365-techniker.webp")} imageAlt="TeamWork 365 in der Serviceansicht" className="contact-shot">
                <figcaption className="contact-caption">Aktuell wird die Anfrage per lokalem Mailprogramm an `info@teamwork365.de` vorbereitet.</figcaption>
              </MediaFrame>
            </div>

            <form className="request-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                  placeholder="Max Mustermann"
                />
              </label>

              <label>
                Unternehmen
                <input
                  required
                  type="text"
                  value={formState.company}
                  onChange={(event) => setFormState({ ...formState, company: event.target.value })}
                  placeholder="Musterfirma GmbH"
                />
              </label>

              <label>
                E-Mail
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                  placeholder="name@unternehmen.de"
                />
              </label>

              <label>
                Gewünschte Nutzerzahl
                <input
                  type="text"
                  value={formState.users}
                  onChange={(event) => setFormState({ ...formState, users: event.target.value })}
                  placeholder="z. B. 15"
                />
              </label>

              <label>
                Anfrage
                <select
                  value={formState.requestType}
                  onChange={(event) =>
                    setFormState({
                      ...formState,
                      requestType: event.target.value as RequestType,
                    })
                  }
                >
                  <option value="Demozugang">Demozugang</option>
                  <option value="Präsentation">Präsentation</option>
                </select>
              </label>

              <label>
                Nachricht
                <textarea
                  rows={5}
                  value={formState.message}
                  onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                  placeholder="Welche Teams sollen TeamWork 365 nutzen und was möchten Sie sehen?"
                />
              </label>

              <button className="button button-primary" type="submit">
                Anfrage vorbereiten
              </button>

              {status === "success" ? <p className="success-message">Die Anfrage wurde in deinem Mailprogramm vorbereitet.</p> : null}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
