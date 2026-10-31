"use client";

import { useEffect, useState } from "react";
import { readCampaign } from "@/lib/attribution";
import { trackWebsiteEvent } from "./WebsiteAnalytics";
import Modal, { CloseButton } from "./ui/Modal";
import { VerifiedSeal } from "./motion/Motifs";
import { site, whatsappLink } from "@/lib/site";
import type { CallbackSeed } from "./CallbackProvider";

const SERVICES = ["Dry Clean", "Steam Press", "Shoe Cleaning", "Leather Care", "Home Linen", "Soft Toy Cleaning", "Carpet & Sofa", "Not sure"] as const;
const SLOTS = ["Morning", "Afternoon", "Evening"] as const;

export default function CallbackModal({ seed, onClose }: { seed: CallbackSeed; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string>(seed.service ?? "Dry Clean");
  const [pincode, setPincode] = useState(seed.pincode ?? "");
  const [slot, setSlot] = useState<string>(SLOTS[0]);
  const [notes, setNotes] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [utm, setUtm] = useState("");
  const [zones, setZones] = useState<string[]>([]);

  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUtm(readCampaign());
    // Populate the pincode datalist from live coverage.
    fetch("/api/zones")
      .then((r) => r.json())
      .then((d: { pincodes?: string[] }) => setZones(d.pincodes ?? []))
      .catch(() => setZones([]));
  }, []);

  const phoneOk = /^\d{10}$/.test(phone);
  const nameOk = name.trim().length > 0;
  const canSubmit = nameOk && phoneOk && !busy;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          pincode: pincode || undefined,
          service,
          preferredSlot: slot,
          notes: notes || undefined,
          source: seed.source || "site",
          utm: utm || undefined,
          hp,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.message || "Couldn’t send your request. Please call our team.");
      setDone(true);
      if (!hp) trackWebsiteEvent("generate_lead", { service });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn’t send your request. Please call our team.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    // Backdrop dismiss stays ON here, unlike the form above: the lead is
    // already submitted, so there is nothing left to lose and tapping away
    // from a confirmation is the natural gesture.
    return (
      <Modal onClose={onClose} labelledBy="cb-done">
        <CloseButton onClose={onClose} />
        <div className="px-7 pb-9 pt-12 text-center">
          <div className="mx-auto w-fit">
            <VerifiedSeal size={86} />
          </div>
          <h3 id="cb-done" className="mt-5 text-[1.4rem] font-bold">
            Done, {name.trim().split(" ")[0]}!
          </h3>
          <p className="mt-2 text-ink-muted">
            Our team will contact you during opening hours ({site.hours.display}) to confirm your pickup.
          </p>
          <div className="mt-7 grid gap-3">
            <a
              href={whatsappLink(`Hi PEZVO, I just requested a callback. My name is ${name.trim()}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white transition hover:shadow-glowGreen"
            >
              Prefer chat? Message us on WhatsApp
            </a>
            <button type="button" onClick={onClose} className="px-2 py-3 font-semibold text-blue-700">
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} labelledBy="cb-title" dismissOnBackdrop={false}>
      <CloseButton onClose={onClose} />
      <div className="px-7 pt-7">
        <p className="mb-2 font-mono text-micro uppercase text-blue-700">Request a callback</p>
        <h3 id="cb-title" className="text-[1.5rem] font-bold">
          {seed.outOfArea ? "Let’s check your pickup options." : "Let’s arrange your pickup."}
        </h3>
        <p className="mt-2 text-[0.9375rem] text-ink-muted">
          {seed.outOfArea
            ? "Leave your number and our team will confirm availability for your area."
            : "Tell us what needs care. Our team confirms availability, price and your pickup time."}
        </p>
      </div>

      <form onSubmit={submit} className="grid gap-4 px-7 pb-7 pt-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[0.8125rem] font-semibold text-ink-muted">Name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="min-h-12 w-full rounded-sm border border-line px-3.5 py-3 text-[0.9375rem] outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-50"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[0.8125rem] font-semibold text-ink-muted">Phone</span>
            <div className="flex overflow-hidden rounded-sm border border-line focus-within:border-blue-400 focus-within:ring-[3px] focus-within:ring-blue-50">
              <span className="grid place-items-center border-r border-line bg-surface-alt px-3.5 font-mono text-[0.9375rem] text-ink-muted">
                +91
              </span>
              <input
                required
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="98765 43210"
                aria-invalid={phone.length > 0 && !phoneOk}
                className="min-h-12 w-full px-3.5 py-3 text-[0.9375rem] outline-none"
              />
            </div>
            {phone.length > 0 && !phoneOk && (
              <span className="mt-1 block text-[0.8125rem] text-danger">Enter all 10 digits.</span>
            )}
          </label>
        </div>

        <fieldset>
          <legend className="mb-1.5 text-[0.8125rem] font-semibold text-ink-muted">What needs care?</legend>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(s)}
                aria-pressed={service === s}
                className={`rounded-pill px-4 py-2 text-[0.875rem] font-medium transition ${
                  service === s ? "bg-blue-700 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[0.8125rem] font-semibold text-ink-muted">Area / pincode</span>
            <input
              list="pezvo-zones"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]{6}"
              title="Enter a 6-digit pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="400706"
              autoComplete="postal-code"
              className="min-h-12 w-full rounded-sm border border-line px-3.5 py-3 font-mono text-[0.9375rem] outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-50"
            />
            <datalist id="pezvo-zones">
              {zones.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[0.8125rem] font-semibold text-ink-muted">Preferred time</span>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className="min-h-12 w-full rounded-sm border border-line bg-white px-3.5 py-3 text-[0.9375rem] outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-50"
            >
              {SLOTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-[0.8125rem] font-semibold text-ink-muted">Note (optional)</span>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything we should know?"
            className="min-h-12 w-full rounded-sm border border-line px-3.5 py-3 text-[0.9375rem] outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-50"
          />
        </label>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        {error && (
          <p role="alert" className="rounded-sm bg-[#FFF5F5] px-4 py-3 text-[0.875rem] text-[#8A2B2B]">
            {error}{" "}
            <a href={`tel:${site.phone}`} className="font-semibold underline">
              {site.phoneDisplay}
            </a>
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 font-semibold text-white shadow transition hover:-translate-y-px hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {busy ? "Sending…" : "Request callback"}
        </button>

        <p className="text-center font-mono text-[0.8125rem] text-ink-muted">
          Pickup and pricing are confirmed by our team.
        </p>
      </form>
    </Modal>
  );
}
