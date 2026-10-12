import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Plane,
  Hotel,
  House,
  TrainFront,
  Bus,
  CarFront,
  Compass,
  Search,
  MapPin,
  CalendarDays,
  Users,
  ArrowLeftRight,
  ArrowRight,
  Minus,
  Plus,
  ChevronDown,
  ChevronRight,
  Check,
  Ticket,
  Trash2,
  X,
  Menu,
  ShieldCheck,
  WalletCards,
  Map,
  Sun,
  Heart,
  Star,
  SlidersHorizontal,
} from "lucide-react";
import "./style.css";
const TYPES = [
  ["flights", "Flights", Plane],
  ["hotels", "Hotels", Hotel],
  ["stays", "Unique stays", House],
  ["trains", "Trains", TrainFront],
  ["buses", "Buses", Bus],
  ["cars", "Car hire", CarFront],
  ["guides", "Experiences", Compass],
];
const CFG = {
  flights: ["From", "To", "Departure", "Compare routes and fare options."],
  hotels: [
    "Destination",
    "Area or landmark",
    "Check-in",
    "Find a stay that feels right.",
  ],
  stays: [
    "Destination",
    "Area or landmark",
    "Check-in",
    "Find a place with a little more character.",
  ],
  trains: [
    "From station",
    "To station",
    "Travel date",
    "Compare comfortable ways to get there.",
  ],
  buses: ["From", "To", "Travel date", "Choose your seat and hit the road."],
  cars: [
    "Pick-up location",
    "Drop-off location",
    "Pick-up date",
    "Get the keys and take the long way.",
  ],
  guides: [
    "Destination",
    "Neighbourhood",
    "Experience date",
    "Make space for a local story.",
  ],
};
const DB = {
  flights: [
    [
      "Northstar Air",
      "Direct · 2h 10m · Economy",
      "08:20",
      "10:30",
      6480,
      4.8,
      "NA",
      "Best match",
      "photo-1436491865332-7a61a109cc05",
    ],
    [
      "Indigo Coast",
      "Direct · 2h 20m · Economy",
      "11:45",
      "14:05",
      7190,
      4.6,
      "IC",
      "Popular",
      "photo-1503220317375-aaad61436b1b",
    ],
    [
      "Cloudline Air",
      "1 stop · 4h 35m · Economy",
      "16:10",
      "20:45",
      5810,
      4.4,
      "CL",
      "Lowest fare",
      "photo-1483450388369-9ed95738483c",
    ],
  ],
  hotels: [
    [
      "The Fig & Fern",
      "Boutique hotel · Breakfast included",
      "4.92",
      "Walkable district",
      5890,
      4.9,
      "FF",
      "Guest favourite",
      "photo-1566073771259-6a8506099945",
    ],
    [
      "The Lumen House",
      "Design hotel · Rooftop pool",
      "4.78",
      "City centre",
      7460,
      4.8,
      "LH",
      "Great location",
      "photo-1542314831-068cd1dbfeeb",
    ],
    [
      "Harbour & Hill",
      "Quiet stay · Free cancellation",
      "4.63",
      "Near the waterfront",
      4320,
      4.6,
      "HH",
      "Flexible stay",
      "photo-1571896349842-33c89424de2d",
    ],
  ],
  stays: [
    [
      "Cedar House",
      "Entire home · Garden · 2 bedrooms",
      "4.95",
      "Quiet neighbourhood",
      8240,
      4.9,
      "CH",
      "Guest favourite",
      "photo-1449158743715-0a90ebb6d2d8",
    ],
    [
      "Little Blue Cabin",
      "Cabin · Mountain view · 1 bedroom",
      "4.88",
      "45 min from the city",
      6930,
      4.8,
      "BC",
      "A little different",
      "photo-1449158743715-0a90ebb6d2d8",
    ],
    [
      "Mango Courtyard",
      "Homestay · Local breakfast",
      "4.72",
      "Old town",
      3840,
      4.7,
      "MC",
      "Warm welcome",
      "photo-1613490493576-7fde63acd811",
    ],
  ],
  trains: [
    [
      "Coastal Express",
      "AC chair car · 1 change",
      "06:15",
      "12:40",
      1460,
      4.7,
      "CE",
      "Scenic route",
      "photo-1474487548417-781cb71495f3",
    ],
    [
      "Citylink Intercity",
      "Executive class · Direct",
      "09:00",
      "14:25",
      2180,
      4.8,
      "CI",
      "Fastest",
      "photo-1474487548417-781cb71495f3",
    ],
    [
      "Evening Star",
      "Sleeper · Direct",
      "21:30",
      "06:10",
      980,
      4.5,
      "ES",
      "Overnight",
      "photo-1474487548417-781cb71495f3",
    ],
  ],
  buses: [
    [
      "Greenline Travels",
      "AC sleeper · 2+1 · Water onboard",
      "20:15",
      "05:45",
      890,
      4.7,
      "GL",
      "Top rated",
      "photo-1544620347-c4fd4a3d5957",
    ],
    [
      "Roadbird Coaches",
      "Volvo AC · Recliner seats",
      "22:00",
      "06:30",
      740,
      4.5,
      "RB",
      "Popular",
      "photo-1544620347-c4fd4a3d5957",
    ],
    [
      "Sunrise Bus Co.",
      "AC sleeper · Live tracking",
      "19:00",
      "04:50",
      1020,
      4.6,
      "SB",
      "Flexible",
      "photo-1544620347-c4fd4a3d5957",
    ],
  ],
  cars: [
    [
      "Compact · Swift or similar",
      "Manual · 5 seats · Unlimited km",
      "8:00 AM",
      "Central pickup",
      2100,
      4.7,
      "C",
      "Great value",
      "photo-1503376780353-7e6692767b70",
    ],
    [
      "Comfort · City or similar",
      "Automatic · 5 seats · 250 km/day",
      "8:00 AM",
      "Airport pickup",
      3250,
      4.8,
      "C+",
      "Popular",
      "photo-1503376780353-7e6692767b70",
    ],
    [
      "SUV · Trail or similar",
      "Automatic · 7 seats · Unlimited km",
      "9:00 AM",
      "Free cancellation",
      4890,
      4.8,
      "SUV",
      "Room to roam",
      "photo-1503376780353-7e6692767b70",
    ],
  ],
  guides: [
    [
      "Old City food walk",
      "Local guide · 3 hours · Small group",
      "10:00",
      "Meet at Clocktower Square",
      1250,
      4.9,
      "FW",
      "Local favourite",
      "photo-1555396273-367ea4eb4db5",
    ],
    [
      "Sunrise ridge hike",
      "Guided · 5 hours · Easy pace",
      "05:30",
      "Hotel pickup included",
      1890,
      4.8,
      "H",
      "Small group",
      "photo-1551632811-561732d1e306",
    ],
    [
      "Make your own pottery",
      "Workshop · 2 hours · All materials",
      "15:00",
      "Riverside Arts Quarter",
      980,
      4.7,
      "P",
      "Hands-on",
      "photo-1565193566173-7a0ee3dbe261",
    ],
  ],
};
const today = () => new Date().toISOString().slice(0, 10),
  tomorrow = () => {
    let d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  },
  money = (n) => "₹" + Number(n).toLocaleString("en-IN");
const hex = (b) =>
  Array.from(new Uint8Array(b))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
const unhex = (s) =>
  new Uint8Array((s.match(/.{2}/g) || []).map((x) => parseInt(x, 16)));
async function passwordHash(password, salt) {
  const k = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  return hex(
    await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
      k,
      256,
    ),
  );
}
function App() {
  const [authView, AuthView] = useState(""),
    [authName, AuthName] = useState(""),
    [authEmail, AuthEmail] = useState(""),
    [authPassword, AuthPassword] = useState(""),
    [authConfirm, AuthConfirm] = useState(""),
    [authError, AuthError] = useState(""),
    [user, User] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("roamwise-session") || "null");
      } catch {
        return null;
      }
    }),
    [type, setType] = useState("flights"),
    [from, F] = useState("New Delhi"),
    [to, To] = useState("Mumbai"),
    [date, D] = useState(tomorrow()),
    [returnDate, RD] = useState(""),
    [round, R] = useState(false),
    [guests, G] = useState(1),
    [query, Q] = useState(null),
    [sort, Sort] = useState("Recommended"),
    [maxPrice, MP] = useState(12000),
    [selected, Sel] = useState(null),
    [traveler, Tr] = useState({ name: "", email: "" }),
    [bookings, B] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("roamwise-bookings") || "[]");
      } catch {
        return [];
      }
    }),
    [showBookings, SB] = useState(false),
    [toast, Toast] = useState(""),
    [menu, M] = useState(false);
  useEffect(
    () => localStorage.setItem("roamwise-bookings", JSON.stringify(bookings)),
    [bookings],
  );
  const cfg = CFG[type],
    results = useMemo(() => {
      if (!query) return [];
      return DB[query.type]
        .map((x, i) => ({
          id: i,
          title: x[0],
          detail: x[1],
          a: x[2],
          b: x[3],
          price:
            x[4] +
            (query.guests - 1) *
              (query.type === "hotels" || query.type === "stays" ? 750 : 400),
          score: x[5],
          mark: x[6],
          tag: x[7],
          img: x[8],
        }))
        .filter((x) => x.price <= maxPrice)
        .sort((a, b) =>
          sort === "Lowest price"
            ? a.price - b.price
            : sort === "Top rated"
              ? b.score - a.score
              : 0,
        );
    }, [query, sort, maxPrice]);
  const notify = (s) => {
      Toast(s);
      setTimeout(() => Toast(""), 3000);
    },
    search = (e) => {
      e.preventDefault();
      if (!from.trim() || !to.trim())
        return notify("Add a starting point and destination.");
      if (type === "flights" && round && returnDate < date)
        return notify("Return date must be after departure.");
      Q({ type, from: from.trim(), to: to.trim(), date, returnDate, guests });
      SB(false);
      Sel(null);
      setTimeout(
        () =>
          document
            .querySelector("#results")
            ?.scrollIntoView({ behavior: "smooth" }),
        20,
      );
    },
    save = () => {
      if (!traveler.name.trim() || !traveler.email.includes("@"))
        return notify("Enter your name and a valid email.");
      B((b) => [
        {
          id: Date.now(),
          type: TYPES.find((t) => t[0] === query.type)[1],
          from: query.from,
          to: query.to,
          date: query.date,
          guests: query.guests,
          title: selected.title,
          price: selected.price,
          name: traveler.name,
        },
        ...b,
      ]);
      Q(null);
      Sel(null);
      SB(true);
      Tr({ name: "", email: "" });
      notify("Sample reservation saved on this device.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    cancel = (id) => {
      B((b) => b.filter((x) => x.id !== id));
      notify("Reservation removed.");
    },
    logout = () => {
      User(null);
      localStorage.removeItem("roamwise-session");
      notify("Signed out.");
    },
    authenticate = async (e) => {
      e.preventDefault();
      AuthError("");
      const email = authEmail.trim().toLowerCase();
      try {
        const list = JSON.parse(localStorage.getItem("roamwise-users") || "[]");
        let profile;
        if (authView === "register") {
          if (authPassword.length < 8)
            return AuthError("Use at least 8 characters for your password.");
          if (authPassword !== authConfirm)
            return AuthError("Those passwords do not match.");
          if (list.some((a) => a.email === email))
            return AuthError(
              "That email already has an account. Please sign in.",
            );
          const salt = crypto.getRandomValues(new Uint8Array(16));
          const acct = {
            name: authName.trim(),
            email,
            salt: hex(salt),
            passwordHash: await passwordHash(authPassword, salt),
          };
          localStorage.setItem(
            "roamwise-users",
            JSON.stringify([...list, acct]),
          );
          profile = { name: acct.name, email };
        } else {
          const acct = list.find((a) => a.email === email);
          if (!acct)
            return AuthError(
              "No account found for that email. Create one to get started.",
            );
          if (
            (await passwordHash(authPassword, unhex(acct.salt))) !==
            acct.passwordHash
          )
            return AuthError("Email and password do not match.");
          profile = { name: acct.name, email };
        }
        User(profile);
        localStorage.setItem("roamwise-session", JSON.stringify(profile));
        AuthView("");
        AuthPassword("");
        AuthConfirm("");
        notify("You’re signed in.");
      } catch {
        AuthError(
          "Secure browser storage is unavailable. Open the app via localhost and try again.",
        );
      }
    },
    openAuth = () => {
      AuthError("");
      AuthView("login");
    };
  return (
    <>
      <header className="top">
        <div className="top-inner">
          <a className="brand" href="#top">
            <span className="brand-symbol">
              <Compass />
            </span>
            <span>
              roamwise<small>TRAVEL, YOUR WAY</small>
            </span>
          </a>
          <nav className={menu ? "nav open" : "nav"}>
            {TYPES.map(([id, name, Icon]) => (
              <button
                key={id}
                className={type === id ? "nav-item active" : "nav-item"}
                onClick={() => {
                  setType(id);
                  M(false);
                  document
                    .querySelector("#top")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Icon />
                {name}
              </button>
            ))}
          </nav>
          <div className="header-right">
            <button
              className={showBookings ? "saved-button active" : "saved-button"}
              onClick={() => {
                SB(!showBookings);
                Q(null);
                Sel(null);
              }}
            >
              <Ticket /> My trips{" "}
              {bookings.length > 0 && <b>{bookings.length}</b>}
            </button>
            <button
              className="account-btn"
              onClick={() => (user ? logout() : openAuth())}
            >
              {user ? `Sign out, ${user.name.split(" ")[0]}` : "Sign in"}{" "}
              <ChevronDown />
            </button>
          </div>
          <button className="menu-btn" onClick={() => M(!menu)}>
            <Menu />
          </button>
        </div>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-photo" />
          <div className="hero-text">
            <div className="overline">
              <span /> GOOD PLANS. GREAT STORIES.
            </div>
            <h1>
              Make room for
              <br />
              <i>somewhere new.</i>
            </h1>
            <p>Flights, stays, and little detours that make the trip.</p>
          </div>
          <div className="search-card">
            <div className="search-tabs">
              {TYPES.map(([id, name, Icon]) => (
                <button
                  key={id}
                  onClick={() => setType(id)}
                  className={type === id ? "search-tab chosen" : "search-tab"}
                >
                  <Icon />
                  {name}
                </button>
              ))}
            </div>
            <form onSubmit={search}>
              <div className="search-note">
                {cfg[3]}
                <button
                  type="button"
                  className="traveler-pill"
                  onClick={() => G(Math.min(12, guests + 1))}
                >
                  <Users />
                  {guests} {guests === 1 ? "traveller" : "travellers"} <Plus />
                </button>
              </div>
              <div className="form-grid">
                <label className="input-block">
                  <span>{cfg[0].toUpperCase()}</span>
                  <div className="input-with-icon">
                    <MapPin />
                    <input
                      required
                      value={from}
                      onChange={(e) => F(e.target.value)}
                      placeholder={cfg[0]}
                    />
                  </div>
                  <small>
                    {type === "flights"
                      ? "Airport or city"
                      : "City, area, or station"}
                  </small>
                </label>
                {["flights", "trains", "buses"].includes(type) && (
                  <button
                    type="button"
                    className="swap"
                    onClick={() => {
                      F(to);
                      To(from);
                    }}
                    aria-label="Swap places"
                  >
                    <ArrowLeftRight />
                  </button>
                )}
                <label className="input-block">
                  <span>{cfg[1].toUpperCase()}</span>
                  <div className="input-with-icon">
                    <MapPin />
                    <input
                      required
                      value={to}
                      onChange={(e) => To(e.target.value)}
                      placeholder={cfg[1]}
                    />
                  </div>
                  <small>
                    {type === "hotels" || type === "stays"
                      ? "Optional neighbourhood"
                      : "City, area, or station"}
                  </small>
                </label>
                <label className="input-block date-block">
                  <span>{cfg[2].toUpperCase()}</span>
                  <div className="input-with-icon">
                    <CalendarDays />
                    <input
                      type="date"
                      min={today()}
                      value={date}
                      onChange={(e) => D(e.target.value)}
                      required
                    />
                  </div>
                  <small>
                    {date &&
                      new Date(date + "T12:00:00").toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      })}
                  </small>
                </label>
                {type === "flights" && round ? (
                  <label className="input-block date-block">
                    <span>RETURN</span>
                    <div className="input-with-icon">
                      <CalendarDays />
                      <input
                        type="date"
                        min={date}
                        value={returnDate}
                        onChange={(e) => RD(e.target.value)}
                        required
                      />
                    </div>
                    <small>Choose your return date</small>
                  </label>
                ) : (
                  <button
                    type="button"
                    className="round-toggle"
                    onClick={() => R(!round)}
                  >
                    <span className={round ? "toggle on" : "toggle"} />
                    {type === "flights" ? "Round trip" : "Add return journey"}
                  </button>
                )}
                <div className="guest-control">
                  <span>TRAVELLERS</span>
                  <div>
                    <button
                      type="button"
                      onClick={() => G(Math.max(1, guests - 1))}
                    >
                      <Minus />
                    </button>
                    <b>{guests}</b>
                    <button
                      type="button"
                      onClick={() => G(Math.min(12, guests + 1))}
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-bottom">
                <span>
                  <ShieldCheck /> Sample listings · No payment collected
                </span>
                <button className="search-button">
                  <Search /> Find options <ArrowRight />
                </button>
              </div>
            </form>
          </div>
          <div className="trust-row">
            <span>
              <ShieldCheck /> Thoughtful picks, transparent prices
            </span>
            <span>
              <WalletCards /> No hidden booking fees
            </span>
            <span>
              <Map /> The good bits, all in one place
            </span>
          </div>
        </section>
        {showBookings && (
          <section className="results-section" id="results">
            <div className="results-heading">
              <div>
                <span className="eyebrow">YOUR ROAMWISE</span>
                <h2>Trips you’ve saved</h2>
                <p>Sample reservations are stored on this device.</p>
              </div>
              <button className="text-button" onClick={() => SB(false)}>
                <X /> Close
              </button>
            </div>
            {bookings.length === 0 ? (
              <div className="empty">
                <span>
                  <Ticket />
                </span>
                <h3>No trips yet</h3>
                <p>When you save a sample option, it’ll be here.</p>
                <button onClick={() => SB(false)}>
                  Find a trip <ArrowRight />
                </button>
              </div>
            ) : (
              <div className="booking-list">
                {bookings.map((b) => (
                  <article className="saved-trip" key={b.id}>
                    <span className="saved-icon">
                      <Ticket />
                    </span>
                    <div className="saved-info">
                      <small>
                        {b.type} · {b.date}
                      </small>
                      <h3>{b.title}</h3>
                      <p>
                        {b.from} <ArrowRight /> {b.to} · {b.guests} travellers
                      </p>
                      <p>Saved for {b.name}</p>
                    </div>
                    <b className="saved-price">{money(b.price)}</b>
                    <button
                      className="remove"
                      onClick={() => cancel(b.id)}
                      title="Remove reservation"
                    >
                      <Trash2 />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
        {query && !showBookings && (
          <section className="results-section" id="results">
            <div className="results-heading">
              <div>
                <span className="eyebrow">YOUR NEXT GOOD IDEA</span>
                <h2>
                  {TYPES.find((t) => t[0] === query.type)[1]} · {query.from} to{" "}
                  {query.to}
                </h2>
                <p>
                  {query.date &&
                    new Date(query.date + "T12:00:00").toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}{" "}
                  · {query.guests} travellers · sample prices
                </p>
              </div>
              <button
                className="edit-search"
                onClick={() =>
                  document
                    .querySelector("#top")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Edit search <ChevronDown />
              </button>
            </div>
            <div className="result-tools">
              <span>
                <b>{results.length}</b> options to explore
              </span>
              <div>
                <label>
                  <SlidersHorizontal /> Max price{" "}
                  <select
                    value={maxPrice}
                    onChange={(e) => MP(+e.target.value)}
                  >
                    <option value="12000">Any price</option>
                    <option value="6000">₹6,000</option>
                    <option value="3000">₹3,000</option>
                    <option value="1500">₹1,500</option>
                  </select>
                </label>
                <label>
                  Sort by{" "}
                  <select value={sort} onChange={(e) => Sort(e.target.value)}>
                    <option>Recommended</option>
                    <option>Lowest price</option>
                    <option>Top rated</option>
                  </select>
                </label>
              </div>
            </div>
            {results.length === 0 ? (
              <div className="empty">
                <span>
                  <SlidersHorizontal />
                </span>
                <h3>No options in that range</h3>
                <p>Try a higher maximum price to see more choices.</p>
                <button onClick={() => MP(12000)}>
                  Show all prices <ArrowRight />
                </button>
              </div>
            ) : (
              <div className="result-list">
                {results.map((item) => (
                  <article className="result-card" key={item.id}>
                    <div
                      className="result-image"
                      style={{
                        backgroundImage: `linear-gradient(0deg,#091d34a8,transparent 60%),url(https://images.unsplash.com/${item.img}?auto=format&fit=crop&w=700&q=80)`,
                      }}
                    >
                      <span>{item.tag}</span>
                    </div>
                    <div className="result-main">
                      <div className="result-title">
                        <span className="provider-mark">{item.mark}</span>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.detail}</p>
                        </div>
                      </div>
                      <div className="result-times">
                        <b>{item.a}</b>
                        <span />
                        <b>{item.b}</b>
                      </div>
                      <div className="result-foot">
                        <span>
                          <Star fill="currentColor" />
                          {item.score} <i>·</i>{" "}
                          {query.type === "flights"
                            ? "Smooth journey"
                            : "Loved by travellers"}
                        </span>
                        <span>
                          <ShieldCheck /> Details shown
                        </span>
                      </div>
                    </div>
                    <div className="result-price">
                      <small>
                        PER{" "}
                        {["hotels", "stays"].includes(query.type)
                          ? "NIGHT"
                          : "PERSON"}
                      </small>
                      <b>{money(item.price)}</b>
                      <span>sample total</span>
                      <button onClick={() => Sel(item)}>
                        Review option <ArrowRight />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
            <p className="sample-note">
              <ShieldCheck /> Sample inventory for this demo. No live
              availability or payment is connected.
            </p>
          </section>
        )}
        {selected && (
          <div
            className="modal-backdrop"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) Sel(null);
            }}
          >
            <section className="booking-modal">
              <button className="modal-close" onClick={() => Sel(null)}>
                <X />
              </button>
              <span className="eyebrow">ONE LAST DETAIL</span>
              <h2>Review your option</h2>
              <div className="modal-summary">
                <div>
                  <span>{TYPES.find((t) => t[0] === query.type)[1]}</span>
                  <b>{selected.title}</b>
                  <small>
                    {query.from} → {query.to} · {query.date}
                  </small>
                </div>
                <strong>{money(selected.price)}</strong>
              </div>
              <div className="included">
                <span>
                  <Check /> Sample reservation
                </span>
                <span>
                  <Check /> No payment required
                </span>
                <span>
                  <Check /> Saved on this device
                </span>
              </div>
              <label className="modal-field">
                Your name
                <input
                  value={traveler.name}
                  onChange={(e) => Tr({ ...traveler, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  autoComplete="name"
                />
              </label>
              <label className="modal-field">
                Email address
                <input
                  type="email"
                  value={traveler.email}
                  onChange={(e) => Tr({ ...traveler, email: e.target.value })}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
              <button className="confirm-button" onClick={save}>
                Save sample reservation <ArrowRight />
              </button>
              <p className="modal-disclaimer">
                Demo only: no ticket, room, vehicle or payment is issued.
              </p>
            </section>
          </div>
        )}
        <section className="inspiration">
          <div className="inspiration-copy">
            <span className="eyebrow">TAKE THE SCENIC ROUTE</span>
            <h2>
              Leave space for
              <br />
              <i>the unexpected.</i>
            </h2>
            <p>A little inspiration for wherever you’re headed next.</p>
            <button
              onClick={() => {
                setType("guides");
                F("Jaipur");
                To("Old City");
                document
                  .querySelector("#top")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore experiences <ArrowRight />
            </button>
          </div>
          <div className="inspiration-pic" />
          <div className="inspiration-sticker">
            <Heart fill="currentColor" />
            <span>
              Go where
              <br />
              you feel good.
            </span>
          </div>
        </section>
        <section className="features">
          <div>
            <span>
              <Compass />
            </span>
            <b>Made for meandering</b>
            <p>Plans that leave room for the best detours.</p>
          </div>
          <div>
            <span>
              <ShieldCheck />
            </span>
            <b>Clear from the start</b>
            <p>Know what’s included before you choose.</p>
          </div>
          <div>
            <span>
              <Sun />
            </span>
            <b>Travel at your pace</b>
            <p>Find a trip that fits the way you like to go.</p>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#top">
          <span className="brand-symbol">
            <Compass />
          </span>
          <span>
            roamwise<small>TRAVEL, YOUR WAY</small>
          </span>
        </a>
        <p>Somewhere new is closer than you think.</p>
        <small>© 2026 Roamwise · An independent travel planning demo</small>
      </footer>
      {authView && (
        <div className="auth-overlay">
          <section className="auth-page">
            <div className="auth-art">
              <span className="auth-overline">YOUR NEXT CHAPTER</span>
              <h2>
                Keep the good trips <i>close.</i>
              </h2>
              <p>
                Save your plans, keep reservations together, and pick up where
                you left off.
              </p>
              <span className="auth-motto">
                <Heart /> A little more room for somewhere new.
              </span>
            </div>
            <div className="auth-panel">
              <button className="auth-close" onClick={() => AuthView("")}>
                <X />
              </button>
              <div className="auth-form-wrap">
                <span className="eyebrow">
                  {authView === "register"
                    ? "START YOUR ROAMWISE ACCOUNT"
                    : "WELCOME BACK"}
                </span>
                <h2>
                  {authView === "register" ? "Create your account" : "Sign in"}
                </h2>
                <p className="auth-intro">
                  {authView === "register"
                    ? "Save trips and reservations in one place."
                    : "Sign in to see your saved trips and reservations."}
                </p>
                <form className="auth-form" onSubmit={authenticate}>
                  {authView === "register" && (
                    <label>
                      Your name
                      <input
                        required
                        minLength="2"
                        autoComplete="name"
                        value={authName}
                        onChange={(e) => AuthName(e.target.value)}
                        placeholder="Alex Morgan"
                      />
                    </label>
                  )}
                  <label>
                    Email address
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={authEmail}
                      onChange={(e) => AuthEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </label>
                  <label>
                    Password
                    <input
                      required
                      type="password"
                      minLength="8"
                      autoComplete={
                        authView === "register"
                          ? "new-password"
                          : "current-password"
                      }
                      value={authPassword}
                      onChange={(e) => AuthPassword(e.target.value)}
                      placeholder={
                        authView === "register"
                          ? "At least 8 characters"
                          : "Your password"
                      }
                    />
                  </label>
                  {authView === "register" && (
                    <label>
                      Confirm password
                      <input
                        required
                        type="password"
                        autoComplete="new-password"
                        value={authConfirm}
                        onChange={(e) => AuthConfirm(e.target.value)}
                        placeholder="Type it again"
                      />
                    </label>
                  )}
                  {authError && <div className="auth-error">{authError}</div>}
                  <button className="auth-submit">
                    {authView === "register" ? "Create account" : "Sign in"}{" "}
                    <ArrowRight />
                  </button>
                </form>
                <p className="auth-switch">
                  {authView === "register"
                    ? "Already have an account?"
                    : "New to Roamwise?"}{" "}
                  <button
                    onClick={() => {
                      AuthError("");
                      AuthView(authView === "register" ? "login" : "register");
                    }}
                  >
                    {authView === "register" ? "Sign in" : "Create an account"}
                  </button>
                </p>
                <div className="auth-local-note">
                  <ShieldCheck /> Passwords are hashed before being saved on
                  this device.
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {toast && (
        <div className="toast">
          <Check />
          {toast}
          <button onClick={() => Toast("")}>
            <X />
          </button>
        </div>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
