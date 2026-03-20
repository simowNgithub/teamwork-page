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
  onOpen?: (src: string, alt: string) => void;
};

const imagePath = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

const functionStories = [
  {
    eyebrow: "SAP Web Client",
    title: "TeamWork 365 erweitert den SAP Business One Web Client zu einer Arbeitsoberfläche für Teams.",
    text: "Dashboard, Web-Client-Integration und Mandantenadministration bringen Prozesse, Links und Featuresteuerung in eine zentrale Oberfläche.",
    bullets: ["Direkte Integration in den SAP Web Client", "Featureadministration pro Mandant", "Schneller Überblick für Vertrieb, Service und Innendienst"],
    image: imagePath("tw365-dashboard.webp"),
    imageAlt: "Dashboard mit Kennzahlen in TeamWork 365",
  },
  {
    eyebrow: "Digitale Belege",
    title: "Digitale Belege laufen vom Versand bis zur Annahme in einem durchgängigen Prozess.",
    text: "TeamWork 365 unterstützt digitale Belege wie E-Angebot, E-Kundenauftrag, E-Rechnung, E-Lieferschein und E-Gutschrift mit Echtzeitdaten aus SAP Business One.",
    bullets: [
      "Belege direkt anzeigen, per E-Mail versenden und als Vorschau bereitstellen",
      "Externe Links zum Teilen und zur digitalen Annahme oder Unterschrift",
      "Alle Belegdaten in Echtzeit direkt aus SAP Business One laden",
      "Interne und externe Benachrichtigungen abhängig von SMTP- und Mandantenkonfiguration",
    ],
    image: imagePath("tw365-doc-overview.png"),
    imageAlt: "Angebotsansicht in TeamWork 365",
  },
  {
    eyebrow: "CRM, Adressen & Leads",
    title: "Geschäftspartner, Ansprechpartner, Adresspool und Leads bleiben in einem durchgängigen Sales-Prozess.",
    text: "Standard, Pro und Premium bauen funktional aufeinander auf: von Geschäftspartnern und Ansprechpartnern bis zur Lead-Bearbeitung und dem Adresspool für Sales-Teams.",
    bullets: ["Geschäftspartner und Ansprechpartner verwalten", "Adresspool und Lead-Bearbeitung in Premium", "E-Mail-Versand über konfigurierbaren SMTP"],
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
    description: "Der Einstieg in TeamWork 365 Standard für zentrale Oberfläche, CRM-Kontext und die SAP-nahe Zusammenarbeit im Browser.",
    points: ["Dashboard & SAP-Web-Client-Erweiterung", "Geschäftspartner & Ansprechpartner", "Mandantenweite Featuresteuerung"],
  },
  {
    name: "Pro",
    subtitle: "Für wachsende Teams mit beliebiger Useranzahl",
    price: "9,90 €",
    highlight: true,
    description: "TeamWork 365 Pro erweitert Standard um digitale Angebote, digitale Aufträge und mehr operative Vertriebsprozesse.",
    points: ["Alles aus Standard", "Digitale Angebote & digitale Aufträge", "Geschäftspartner und Ansprechpartner vertieft nutzen"],
  },
  {
    name: "Premium",
    subtitle: "Für Unternehmen mit Portal- und Ökosystem-Fokus",
    price: "19,90 €",
    highlight: false,
    description: "TeamWork 365 Premium ergänzt Pro um Adresspool, Lead-Bearbeitung und erweiterte Sales-Szenarien.",
    points: ["Alles aus Pro", "Adresspool & Lead-Bearbeitung", "Stärkerer Fokus auf Sales-Teams"],
  },
];

const integrations = ["SAP Business One", "Power Automate", "Zapier", "Typeform", "HubSpot", "Salesforce"];

const stats = [
  { label: "Cloud-Hosting", value: "Deutschland" },
  { label: "Kostenlos testen", value: "30 Tage" },
  { label: "Integrationsansatz", value: "API-first" },
];

const digitalDocumentSteps = [
  {
    title: "1. Angebot öffnen und reagieren",
    text: "Im externen Angebot kann der Empfänger das Angebot beauftragen, bearbeiten oder ablehnen. Der Verlauf-Button zeigt, dass sämtliche Interaktionen später nachvollziehbar bleiben.",
    image: imagePath("tw365-doc-overview.png"),
    imageAlt: "Digitales Angebot mit Reaktionsmöglichkeiten in TeamWork 365",
  },
  {
    title: "2. Beauftragen, bearbeiten oder ablehnen",
    text: "Bei der Interaktion öffnet sich ein Popup. Name und E-Mail sind Pflichtfelder, zusätzlich kann eine Bemerkung hinterlegt werden. Außerdem werden rechtliche Bestimmungen angezeigt und müssen bestätigt werden.",
    image: imagePath("tw365-doc-order-popup.png"),
    imageAlt: "Beauftragen-Popup mit Pflichtfeldern in TeamWork 365",
  },
  {
    title: "3. Mengen und Alternativartikel anpassen",
    text: "Im externen Angebot können Mengen bestimmter Artikel geändert oder Alternativartikel gewählt werden. Das ursprüngliche Angebot in SAP bleibt dabei unverändert, daher ändern sich Zwischen- und Gesamtsummen nicht.",
    image: imagePath("tw365-doc-edit-quantity.png"),
    imageAlt: "Mengenanpassung im digitalen Angebot",
  },
  {
    title: "4. Änderungsverlauf nachvollziehen",
    text: "Im Änderungsverlauf wird dokumentiert, wann der Link geöffnet wurde, welche Mengen geändert wurden, ob das Angebot angenommen oder abgelehnt wurde und welche Kommentare der Kunde hinterlassen hat.",
    image: imagePath("tw365-doc-overview.png"),
    imageAlt: "Übersicht des digitalen Angebots mit Verlauf",
  },
  {
    title: "5. Weiterführen zum Kundenauftrag",
    text: "Über den Button „Weiterführen zum Kundenauftrag“ wird direkt ein Entwurf in SAP Business One erzeugt. Positionen, Mengen, Preise und Frachtkosten werden übernommen. Optional können geänderte Mengen und Alternativartikel mitgeführt werden.",
    image: imagePath("tw365-doc-customer-order.png"),
    imageAlt: "Kundenauftrag in SAP Business One auf Basis des Angebots",
  },
];

const initialFormState: FormState = {
  name: "",
  company: "",
  email: "",
  users: "",
  requestType: "Demozugang",
  message: "",
};

function MediaFrame({ image, imageAlt, className = "", children, onOpen }: MediaFrameProps) {
  return (
    <figure
      className={`media-frame ${className}`.trim()}
      onClick={() => onOpen?.(image, imageAlt)}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onKeyDown={
        onOpen
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen(image, imageAlt);
              }
            }
          : undefined
      }
    >
      <img src={image} alt={imageAlt} />
      {children}
    </figure>
  );
}

function App() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);

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

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  useEffect(() => {
    if (activeDetailIndex === null) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleArrowNavigation = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActiveDetailIndex((current) => (current === null ? 0 : (current + 1) % digitalDocumentSteps.length));
      }

      if (event.key === "ArrowLeft") {
        setActiveDetailIndex((current) =>
          current === null ? 0 : (current - 1 + digitalDocumentSteps.length) % digitalDocumentSteps.length,
        );
      }
    };

    window.addEventListener("keydown", handleArrowNavigation);

    return () => {
      window.removeEventListener("keydown", handleArrowNavigation);
      document.body.style.overflow = "";
    };
  }, [activeDetailIndex]);

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
            <a href="#funktionen">Funktionen</a>
            <a href="#pricing">Pricing</a>
            <a href="#anfrage">Demo anfragen</a>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">CRM-Erweiterung für den SAP Business One Web Client</p>
            <h1>CRM, Belege und Leads in einer Oberfläche.</h1>
            <p className="lead">
              Besucher sehen auf einen Blick, wie TeamWork 365 Geschäftspartner, Ansprechpartner, digitale Angebote, Aufträge, Adresspool und Lead-Bearbeitung in einem durchgängigen Flow zusammenführt.
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
            <MediaFrame
              image={imagePath("tw365-header.webp")}
              imageAlt="Startseite von TeamWork 365"
              className="hero-main-shot"
              onOpen={(src, alt) => setActiveImage({ src, alt })}
            />
          </aside>
        </div>
      </header>

      <main>
        <section className="section section-stories" id="funktionen" data-reveal="up">
          <div className="section-heading narrow">
            <p className="eyebrow">Funktionsumfang</p>
            <h2>Die wichtigsten Funktionen auf einen Blick.</h2>
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

                <MediaFrame image={story.image} imageAlt={story.imageAlt} className="story-frame" onOpen={(src, alt) => setActiveImage({ src, alt })} />
              </article>
            ))}
          </div>

          <div className="digital-documents-panel" data-reveal="up">
            <div className="section-heading narrow">
              <p className="eyebrow">Digitale Belege im Detail</p>
              <h2>Der Ablauf von Angebot bis Kundenauftrag.</h2>
              <p>
                Basierend auf der bereitgestellten PDF „Digitales Angebot - Beauftragen, Bearbeiten, Ablehnen“ zeigt dieser Bereich die wichtigsten Prozessschritte der digitalen Belegbearbeitung.
              </p>
            </div>

            <div className="digital-documents-grid">
              {digitalDocumentSteps.map((step, index) => (
                <article
                  className="digital-doc-card"
                  key={step.title}
                  data-reveal="up"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveDetailIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveDetailIndex(index);
                    }
                  }}
                >
                  <MediaFrame image={step.image} imageAlt={step.imageAlt} className="digital-doc-frame" />
                  <div className="digital-doc-copy">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-integrations" data-reveal="up">
          <div className="section-heading narrow">
            <p className="eyebrow">Integrationen</p>
            <h2>Nahtlos mit SAP und bestehenden Tools verbunden.</h2>
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
            <h2>Drei Stufen. Klar aufgebaut.</h2>
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
              <h2>TeamWork 365 live erleben.</h2>
              <p>
                Besucher können direkt einen Demozugang oder eine Präsentation anfragen, um digitale Belege, Geschäftspartnerverwaltung, Lead-Bearbeitung und die SAP-Web-Client-Integration live zu erleben.
              </p>

              <MediaFrame
                image={imagePath("tw365-techniker.webp")}
                imageAlt="TeamWork 365 in der Serviceansicht"
                className="contact-shot"
                onOpen={(src, alt) => setActiveImage({ src, alt })}
              >
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

      {activeImage ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={() => setActiveImage(null)}
        >
          <button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Bild schließen">
            ×
          </button>
          <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <img src={activeImage.src} alt={activeImage.alt} />
          </div>
        </div>
      ) : null}

      {activeDetailIndex !== null ? (
        <div
          className="detail-slider-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={digitalDocumentSteps[activeDetailIndex].title}
          onClick={() => setActiveDetailIndex(null)}
        >
          <button className="lightbox-close" type="button" onClick={() => setActiveDetailIndex(null)} aria-label="Detailansicht schließen">
            ×
          </button>
          <div className="detail-slider" onClick={(event) => event.stopPropagation()}>
            <button
              className="slider-arrow slider-arrow-left"
              type="button"
              onClick={() => setActiveDetailIndex((activeDetailIndex - 1 + digitalDocumentSteps.length) % digitalDocumentSteps.length)}
              aria-label="Vorheriges Bild"
            >
              ‹
            </button>

            <div className="detail-slider-content">
              <MediaFrame
                image={digitalDocumentSteps[activeDetailIndex].image}
                imageAlt={digitalDocumentSteps[activeDetailIndex].imageAlt}
                className="detail-slider-frame"
              />
              <div className="detail-slider-copy">
                <p className="eyebrow">Digitale Belege</p>
                <h3>{digitalDocumentSteps[activeDetailIndex].title}</h3>
                <p>{digitalDocumentSteps[activeDetailIndex].text}</p>
                <div className="detail-slider-pagination">
                  {digitalDocumentSteps.map((step, index) => (
                    <button
                      key={step.title}
                      type="button"
                      className={`slideshow-dot ${index === activeDetailIndex ? "is-active" : ""}`}
                      onClick={() => setActiveDetailIndex(index)}
                      aria-label={`Schritt ${index + 1}: ${step.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              className="slider-arrow slider-arrow-right"
              type="button"
              onClick={() => setActiveDetailIndex((activeDetailIndex + 1) % digitalDocumentSteps.length)}
              aria-label="Nächstes Bild"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
