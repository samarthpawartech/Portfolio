import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  MessageCircle,
  Send,
  ExternalLink,
  User,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Search,
} from "lucide-react";
import { Reveal } from "./shared/Reveal";
import { MagneticButton } from "./shared/MagneticButton";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email Me",
    value: "samarthpawar9322@gmail.com",
    href: "mailto:samarthpawar9322@gmail.com",
    description: "Send me an email anytime",
    accent: "cyan",
  },
  {
    icon: Phone,
    title: "Call Me",
    value: "+91 9322007416",
    href: "tel:+919322007416",
    description: "Let's talk about your project",
    accent: "purple",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Pune, Maharashtra",
    href: "https://maps.app.goo.gl/1Umh82AhRDNcK6TW8",
    description: "India",
    accent: "pink",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    name: "GitHub",
    username: "samarthpawartech",
    href: "https://github.com/samarthpawartech",
    accent: "cyan",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    username: "Samarth Dhanaji Pawar",
    href: "https://www.linkedin.com/in/samarth-pawar-31083137b/",
    accent: "purple",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp",
    username: "+91 9322007416",
    href: "https://wa.me/919322007416",
    accent: "green",
  },
];

const ACCENT = {
  cyan: {
    text: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
  },
  purple: {
    text: "text-neon-purple",
    bg: "bg-neon-purple/10",
  },
  pink: {
    text: "text-neon-pink",
    bg: "bg-neon-pink/10",
  },
  green: {
    text: "text-neon-green",
    bg: "bg-neon-green/10",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9]{6,15}$/;

const COUNTRY_NAMES = new Intl.DisplayNames(["en"], {
  type: "region",
});

const COUNTRY_CODES = getCountries()
  .map((iso) => ({
    code: iso,
    country: COUNTRY_NAMES.of(iso) || iso,
    dial: `+${getCountryCallingCode(iso)}`,
    flag: iso
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(char.charCodeAt(0) + 127397),
      ),
  }))
  .sort((a, b) => a.country.localeCompare(b.country));

const DEFAULT_COUNTRY =
  COUNTRY_CODES.find((country) => country.code === "IN") || COUNTRY_CODES[0];

const DEFAULT_COUNTRY_CODE = DEFAULT_COUNTRY.dial;

function CountryPicker({ countryIso, onChange, disabled, error }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);

  const selected =
    COUNTRY_CODES.find((country) => country.code === countryIso) ||
    DEFAULT_COUNTRY;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return COUNTRY_CODES;

    return COUNTRY_CODES.filter(
      (country) =>
        country.country.toLowerCase().includes(q) ||
        country.dial.includes(q) ||
        country.code.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;

    const handleOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((value) => !value)}
        className={`flex h-[66px] w-full items-center gap-2 rounded-xl border bg-transparent px-3.5 text-left outline-none transition-all ${
          error
            ? "border-red-400/60"
            : open
              ? "border-neon-cyan shadow-[0_0_18px_-8px_rgba(0,245,255,0.9)]"
              : "border-panel-line hover:border-white/20"
        } disabled:cursor-not-allowed disabled:opacity-60`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="w-7 flex-shrink-0 text-lg">{selected.flag}</span>

        <span className="w-12 flex-shrink-0 text-sm font-semibold text-ink">
          {selected.dial}
        </span>

        <span className="min-w-0 flex-1 truncate text-sm text-ink-dim">
          {selected.country}
        </span>

        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-ink-dim transition-transform ${
            open ? "rotate-180 text-neon-cyan" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 top-[70px] z-[999] overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
          role="listbox"
        >
          <div className="border-b border-white/10 bg-[#111] p-2">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 focus-within:border-neon-cyan">
              <Search className="h-4 w-4 flex-shrink-0 text-ink-dim" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search country or code..."
                className="h-10 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-dim"
                autoFocus
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto p-1.5">
            {filtered.length === 0 ? (
              <div className="px-3 py-5 text-center text-sm text-ink-dim">
                No country found
              </div>
            ) : (
              filtered.map((country) => {
                const active = country.code === selected.code;

                return (
                  <button
                    key={country.code}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(country.code, country.dial);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      active
                        ? "bg-neon-cyan/10 text-neon-cyan"
                        : "text-ink hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="w-7 flex-shrink-0 text-lg">
                      {country.flag}
                    </span>

                    <span className="min-w-0 flex-1 truncate text-sm">
                      {country.country}
                    </span>

                    <span className="w-12 flex-shrink-0 text-right text-xs font-semibold text-ink-dim">
                      {country.dial}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FloatingField({
  id,
  label,
  as = "input",
  value,
  onChange,
  onBlur,
  error,
  ...rest
}) {
  const Component = as;

  return (
    <div className="relative">
      <Component
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder=" "
        className={`peer glass w-full rounded-xl border bg-transparent px-4 pb-2.5 pt-6 text-ink outline-none transition-colors duration-200 placeholder:text-transparent focus:border-neon-cyan disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? "border-red-400/50" : "border-panel-line"
        } ${as === "textarea" ? "min-h-[128px] resize-none" : ""}`}
        {...rest}
      />

      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-ink-dim transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-neon-cyan"
      >
        {label}
      </label>

      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryIso: DEFAULT_COUNTRY.code,
    countryCode: DEFAULT_COUNTRY_CODE,
    phone: "",
    message: "",
  });

  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const cleanPhone = form.phone.replace(/\D/g, "");

  const errors = {
    name: touched.name && !form.name.trim() ? "Please enter your name" : "",

    email:
      touched.email && !EMAIL_RE.test(form.email.trim())
        ? "Enter a valid email address"
        : "",

    phone:
      touched.phone && !cleanPhone
        ? "Phone number is required"
        : touched.phone && !PHONE_RE.test(cleanPhone)
          ? "Enter a valid phone number (6-15 digits)"
          : "",

    message:
      touched.message && form.message.trim().length < 10
        ? "A few more words would help (10+ characters)"
        : "",
  };

  const isValid =
    form.name.trim().length > 0 &&
    EMAIL_RE.test(form.email.trim()) &&
    PHONE_RE.test(cleanPhone) &&
    cleanPhone.length <= 15 &&
    form.message.trim().length >= 10;

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleBlur = (field) => () => {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });

    if (!isValid || status === "submitting") {
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    /*
     * IMPORTANT:
     * The backend Contact entity expects `phone`.
     *
     * We send the selected country code + local digits as
     * a complete E.164-style number.
     *
     * Example:
     * countryCode = +91
     * phone       = 9322007416
     * backend     = +919322007416
     */
    const fullPhone = `${form.countryCode}${cleanPhone}`;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: fullPhone,
      subject: `Portfolio inquiry from ${form.name.trim()}`,
      message: form.message.trim(),
    };

    console.log("Sending contact payload:", payload);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          data?.message ||
            data?.error ||
            `Server error (${res.status}). Please try again.`,
        );
        return;
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        countryIso: DEFAULT_COUNTRY.code,
        countryCode: DEFAULT_COUNTRY_CODE,
        phone: "",
        message: "",
      });

      setTouched({});
    } catch (error) {
      console.error("Contact form request failed:", error);

      setStatus("error");
      setErrorMsg(
        "Couldn't reach the server — check your connection and try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FloatingField
        id="contact-name"
        label="Your Name"
        value={form.name}
        onChange={handleChange("name")}
        onBlur={handleBlur("name")}
        error={errors.name}
        disabled={status === "submitting"}
        maxLength={100}
        autoComplete="name"
      />

      <FloatingField
        id="contact-email"
        label="Your Email"
        type="email"
        value={form.email}
        onChange={handleChange("email")}
        onBlur={handleBlur("email")}
        error={errors.email}
        disabled={status === "submitting"}
        autoComplete="email"
        maxLength={255}
      />

      <div>
        <div className="grid grid-cols-[minmax(170px,1fr)_minmax(0,2fr)] gap-2 max-[520px]:grid-cols-1">
          <CountryPicker
            countryIso={form.countryIso}
            onChange={(countryIso, countryCode) =>
              setForm((current) => ({
                ...current,
                countryIso,
                countryCode,
              }))
            }
            disabled={status === "submitting"}
            error={errors.phone}
          />

          <div className="relative">
            <input
              id="contact-phone"
              type="tel"
              value={form.phone}
              onChange={(event) => {
                const digits = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 15);

                setForm((current) => ({
                  ...current,
                  phone: digits,
                }));
              }}
              onBlur={handleBlur("phone")}
              placeholder=" "
              disabled={status === "submitting"}
              maxLength={15}
              autoComplete="tel-national"
              inputMode="numeric"
              required
              aria-required="true"
              className={`peer glass h-[66px] w-full rounded-xl border bg-transparent px-4 pb-2.5 pt-6 text-ink outline-none transition-colors placeholder:text-transparent focus:border-neon-cyan ${
                errors.phone ? "border-red-400/60" : "border-panel-line"
              }`}
            />

            <label
              htmlFor="contact-phone"
              className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-ink-dim transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-neon-cyan"
            >
              Phone Number
            </label>
          </div>
        </div>

        <p className="mt-1.5 text-[11px] text-ink-dim">
          Required • Country code + phone number
        </p>

        {errors.phone && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <FloatingField
        id="contact-message"
        label="Your Message"
        as="textarea"
        value={form.message}
        onChange={handleChange("message")}
        onBlur={handleBlur("message")}
        error={errors.message}
        disabled={status === "submitting"}
        maxLength={2000}
      />

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <MagneticButton
          as="button"
          type="submit"
          variant="solid"
          disabled={status === "submitting"}
        >
          <Send className="h-4 w-4" />
          {status === "submitting" ? "Sending…" : "Send Message"}
        </MagneticButton>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 text-sm text-neon-green"
          >
            <CheckCircle2 className="h-4 w-4" />
            Thanks! Your message is in — I&apos;ll get back to you soon.
          </motion.p>
        )}

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 text-sm text-red-400"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {errorMsg}
          </motion.p>
        )}
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-neon-cyan">
              Contact
            </p>

            <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
              Get In Touch
            </h2>

            <p className="mt-4 text-base leading-7 text-ink-dim">
              Let&apos;s collaborate and create something amazing together! Feel
              free to reach out through any of these channels.
            </p>
          </div>
        </Reveal>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          {CONTACT_METHODS.map((method, index) => {
            const accent = ACCENT[method.accent];

            return (
              <Reveal key={method.title} delay={index * 0.1}>
                <motion.a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  data-cursor-hover
                  whileHover={{ y: -6 }}
                  className="glass group block h-full rounded-2xl p-6"
                >
                  <span
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} ${accent.text}`}
                  >
                    <method.icon className="h-6 w-6" />
                  </span>

                  <h3 className="font-display text-lg font-bold text-ink">
                    {method.title}
                  </h3>

                  <p className="mt-1 text-sm text-ink-dim">
                    {method.description}
                  </p>

                  <p
                    className={`mt-2.5 break-words text-sm font-semibold ${accent.text}`}
                  >
                    {method.value}
                  </p>
                </motion.a>
              </Reveal>
            );
          })}
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-5">
          <Reveal direction="left" className="lg:col-span-3">
            <div className="glass h-full rounded-3xl p-7 sm:p-8">
              <h3 className="mb-1 flex items-center gap-2 font-display text-xl font-bold text-ink">
                <User className="h-5 w-5 text-neon-cyan" />
                Send a Message
              </h3>

              <p className="mb-6 text-sm text-ink-dim">
                Fill this in and I&apos;ll get your message directly.
              </p>

              <ContactForm />
            </div>
          </Reveal>

          <Reveal direction="right" className="lg:col-span-2 lg:self-start">
            <div className="glass flex flex-col rounded-2xl p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold text-ink">
                Let&apos;s Connect
              </h3>

              <p className="mb-4 mt-1 text-sm text-ink-dim">
                Follow me on social media or send a message
              </p>

              <div className="space-y-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const accent = ACCENT[social.accent];

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="btn-focus-ring group flex items-center gap-3 rounded-xl border border-white/10 p-3 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
                    >
                      <span
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${accent.bg} ${accent.text}`}
                      >
                        <social.icon className="h-[18px] w-[18px]" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-5 text-ink">
                          {social.name}
                        </span>

                        <span className="block truncate text-xs leading-4 text-ink-dim">
                          {social.username}
                        </span>
                      </span>

                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-ink-dim opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  );
                })}
              </div>

              <div className="pt-7 text-center">
                <p className="mb-3 text-xs text-ink-dim sm:text-sm">
                  Open to Work | Freelance &amp; Full-Time Opportunities
                </p>

                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-4 py-2 text-sm font-semibold text-void shadow-[0_0_24px_-6px_rgba(0,245,255,0.6)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-void opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-void" />
                  </span>
                  Currently Available
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
