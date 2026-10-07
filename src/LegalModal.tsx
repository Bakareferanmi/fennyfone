import React, { useEffect, useRef, useState } from 'react';
import { X, Cookie } from 'lucide-react';
import {
  PRIVACY_POLICY, REFUND_TERMS, COOKIE_CATEGORIES, LAST_UPDATED, SUPPORT_WHATSAPP_URL
} from './legal';
import type { LegalPage } from './legal';

// ---------- Cookie consent storage ----------
const CONSENT_KEY = 'fennyfone-cookie-consent-v1';

export type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

/** Returns the saved choice, or null if the visitor has not decided yet. */
export function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(choices: { analytics: boolean; marketing: boolean }): Consent {
  const consent: Consent = {
    necessary: true,
    analytics: !!choices.analytics,
    marketing: !!choices.marketing,
    savedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    /* storage blocked: the choice still applies for this visit */
  }
  return consent;
}

// ---------- First-visit banner ----------
export function CookieBanner({ onAcceptAll, onReject, onCustomize, onOpenPrivacy }) {
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[55] rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/50 p-4 sm:p-5 animate-fadeIn"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-white">We use cookies</h2>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Essential cookies keep the store working. Optional ones run only if you say yes.
            Read our{' '}
            <button type="button" onClick={onOpenPrivacy} className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">
              Privacy Policy
            </button>.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onAcceptAll}
          className="col-span-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={onReject}
          className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
        >
          Reject non-essential
        </button>
        <button
          type="button"
          onClick={onCustomize}
          className="py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-xs transition-colors"
        >
          Customize
        </button>
      </div>
    </div>
  );
}

// ---------- Modal for Privacy, Refund and Cookie Settings ----------
function TextPage({ page }: { page: LegalPage }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-300 leading-relaxed">{page.intro}</p>
      {page.sections.map(section => (
        <section key={section.heading}>
          <h3 className="text-sm font-bold text-white">{section.heading}</h3>
          {section.body?.map((paragraph, i) => (
            <p key={i} className="mt-2 text-sm text-slate-400 leading-relaxed">{paragraph}</p>
          ))}
          {section.list && (
            <ul className="mt-2 space-y-1.5 text-sm text-slate-400 leading-relaxed list-disc pl-5 marker:text-cyan-500">
              {section.list.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

function Toggle({ checked, disabled, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${
        checked ? 'bg-cyan-500' : 'bg-slate-700'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
  );
}

function CookieSettings({ consent, onSave, onOpenPrivacy }) {
  const [analytics, setAnalytics] = useState(consent ? consent.analytics : false);
  const [marketing, setMarketing] = useState(consent ? consent.marketing : false);
  const values = { necessary: true, analytics, marketing };
  const setters = { analytics: setAnalytics, marketing: setMarketing };

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-300 leading-relaxed">
        We keep a small amount of information on your device to make the store work and, only with your permission,
        to understand how it is used. Choose what you are comfortable with. You can change this at any time.
      </p>

      <div className="space-y-3">
        {COOKIE_CATEGORIES.map(cat => (
          <div key={cat.key} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">
                {cat.title}
                {cat.always && <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-cyan-400">Always on</span>}
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">{cat.text}</p>
            </div>
            <Toggle
              label={`${cat.title} cookies`}
              checked={values[cat.key]}
              disabled={cat.always}
              onChange={cat.always ? () => {} : setters[cat.key]}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <button
          type="button"
          onClick={() => onSave({ analytics: true, marketing: true })}
          className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => onSave({ analytics, marketing })}
          className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm transition-colors"
        >
          Save my choices
        </button>
        <button
          type="button"
          onClick={() => onSave({ analytics: false, marketing: false })}
          className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-colors"
        >
          Reject non-essential
        </button>
      </div>

      <p className="text-xs text-slate-500">
        More detail in our{' '}
        <button type="button" onClick={onOpenPrivacy} className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">
          Privacy Policy
        </button>.
      </p>
    </div>
  );
}

export function LegalModal({ page, consent, onClose, onOpenPage, onSaveConsent }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { closeRef.current?.focus(); }, [page]);

  const titles = { privacy: PRIVACY_POLICY.title, refund: REFUND_TERMS.title, cookies: 'Cookie Settings' };
  const title = titles[page];

  return (
    <div
      className="fixed inset-0 z-[65] flex items-end sm:items-center justify-center sm:p-4 bg-slate-950/85 animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl max-h-[88vh] flex flex-col bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-slate-800">
          <div className="min-w-0">
            <h2 id="legal-title" className="text-lg font-bold text-white truncate">{title}</h2>
            {page !== 'cookies' && <p className="text-xs text-slate-500">Last updated {LAST_UPDATED}</p>}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 sm:px-7 py-6">
          {page === 'privacy' && <TextPage page={PRIVACY_POLICY} />}
          {page === 'refund' && <TextPage page={REFUND_TERMS} />}
          {page === 'cookies' && (
            <CookieSettings
              consent={consent}
              onSave={onSaveConsent}
              onOpenPrivacy={() => onOpenPage('privacy')}
            />
          )}

          {page !== 'cookies' && (
            <a
              href={SUPPORT_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Questions? Chat with WhatsApp live support
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
