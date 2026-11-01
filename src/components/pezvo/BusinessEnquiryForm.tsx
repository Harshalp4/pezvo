"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Building2, MessageCircle, Package } from "lucide-react";
import BrandDrop from "./BrandDrop";
import { site, whatsappLink } from "@/lib/site";
import { businessEnquiryMessage, enquiryServices, enquiryTypes, normalizeEnquiryPhone, validateBusinessEnquiry, type BusinessEnquiry, type EnquiryErrors } from "@/lib/business-enquiry";
import "./business-enquiry.css";

function focusInView(element?: HTMLElement | null) {
  element?.focus({ preventScroll: true });
  element?.scrollIntoView({ block: "center", behavior: "auto" });
}

export default function BusinessEnquiryForm({ initialType = "Bulk order" }: { initialType?: BusinessEnquiry["type"] }) {
  const [values, setValues] = useState<BusinessEnquiry>({ type: initialType, name: "", phone: "", company: "", email: "", service: "", area: "", requirements: "" });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [ready, setReady] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const review = useRef<HTMLHeadingElement>(null);
  const edit = useRef(false);

  useEffect(() => {
    if (ready) focusInView(review.current);
    else if (edit.current) { focusInView(form.current?.querySelector<HTMLInputElement>("[name=name]")); edit.current = false; }
  }, [ready]);

  function update(field: keyof BusinessEnquiry, value: string) {
    setValues(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined, ...(field === "type" ? { company: undefined } : {}) }));
  }
  function validateField(field: keyof BusinessEnquiry) {
    setErrors(previous => ({ ...previous, [field]: validateBusinessEnquiry(values)[field] }));
  }
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateBusinessEnquiry(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) { focusInView(form.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)); return; }
    setReady(true);
  }
  function fieldProps(field: keyof BusinessEnquiry) {
    return { id: `business-${field}`, name: field, value: values[field], "aria-labelledby": `business-${field}-label`, "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? `business-${field}-error` : undefined, onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(field, event.target.value), onBlur: () => validateField(field) };
  }
  const error = (field: keyof BusinessEnquiry) => errors[field] ? <span id={`business-${field}-error`} className="pz-enquiry-error">{errors[field]}</span> : null;

  return <section id="business-enquiry" className="pz-enquiry" aria-labelledby="business-enquiry-title">
    <div className="pz-enquiry-heading"><BrandDrop /><p className="pz-eyebrow">BULK & COMMERCIAL ENQUIRIES</p></div>
    <h2 id="business-enquiry-title">More pieces.<br /><em>Same thoughtful care.</em></h2>
    <p className="pz-enquiry-intro">For your business, your community or a larger order. Tell us what you have in mind.</p>

    {ready ? <div className="pz-enquiry-review">
      <p className="pz-eyebrow">YOUR ENQUIRY / READY TO SHARE</p>
      <h3 ref={review} tabIndex={-1}>Let’s start a conversation.</h3>
      <p>Your details are ready below. Continue to WhatsApp, then tap send to share them with PEZVO.</p>
      <dl>
        <div><dt>Enquiry</dt><dd>{values.type}</dd></div>
        <div><dt>Your name</dt><dd>{values.name.trim()}</dd></div>
        <div><dt>Mobile</dt><dd>+91 {normalizeEnquiryPhone(values.phone)}</dd></div>
        {values.company.trim() && <div><dt>Organisation</dt><dd>{values.company.trim()}</dd></div>}
        {values.email.trim() && <div><dt>Email</dt><dd>{values.email.trim()}</dd></div>}
        <div><dt>Care needed</dt><dd>{values.service}</dd></div>
        <div><dt>Location</dt><dd>{values.area.trim()}</dd></div>
      </dl>
      <div className="pz-enquiry-brief"><span>YOUR REQUIREMENTS</span><p>{values.requirements.trim()}</p></div>
      <a className="pz-button pz-enquiry-submit" href={whatsappLink(businessEnquiryMessage(values))} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /> Continue to WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a>
      <p className="pz-enquiry-note">Opens a draft to {site.phoneDisplay}. Your enquiry has not been sent yet.</p>
      <button type="button" className="pz-enquiry-edit" onClick={() => { edit.current = true; setReady(false); }}><ArrowLeft size={15} aria-hidden="true" /> Edit your details</button>
    </div> : <form ref={form} onSubmit={prepare} noValidate>
      <fieldset className="pz-enquiry-types"><legend>I’m enquiring about</legend><div>{enquiryTypes.map((type, index) => <label key={type} className={values.type === type ? "is-selected" : ""}>
        <input type="radio" name="type" value={type} checked={values.type === type} onChange={() => update("type", type)} />
        {index === 0 ? <Package size={18} strokeWidth={1.4} aria-hidden="true" /> : <Building2 size={18} strokeWidth={1.4} aria-hidden="true" />}<span>{type}</span>
      </label>)}</div>{error("type")}</fieldset>
      <p className="pz-enquiry-required">All fields required unless marked optional.</p>
      <div className="pz-enquiry-fields">
        <label htmlFor="business-name"><span id="business-name-label">Your name</span><input {...fieldProps("name")} required maxLength={120} autoComplete="name" placeholder="Full name" />{error("name")}</label>
        <label htmlFor="business-phone"><span id="business-phone-label">Mobile number</span><input {...fieldProps("phone")} required type="tel" inputMode="tel" maxLength={18} autoComplete="tel" placeholder="+91 98765 43210" />{error("phone")}</label>
        <label htmlFor="business-company"><span id="business-company-label">Business / organisation {values.type === "Bulk order" && <small>(optional)</small>}</span><input {...fieldProps("company")} required={values.type === "Commercial care"} maxLength={160} autoComplete="organization" placeholder="Company, hotel or society" />{error("company")}</label>
        <label htmlFor="business-email"><span id="business-email-label">Email <small>(optional)</small></span><input {...fieldProps("email")} type="email" inputMode="email" maxLength={254} autoComplete="email" placeholder="you@company.com" />{error("email")}</label>
        <label htmlFor="business-service"><span id="business-service-label">Care you need</span><select {...fieldProps("service")} required><option value="" disabled>Select a service</option>{enquiryServices.map(service => <option key={service}>{service}</option>)}</select>{error("service")}</label>
        <label htmlFor="business-area"><span id="business-area-label">Area / city</span><input {...fieldProps("area")} required maxLength={160} autoComplete="address-level2" placeholder="e.g. Nerul, Navi Mumbai" />{error("area")}</label>
        <label htmlFor="business-requirements" className="pz-enquiry-wide"><span id="business-requirements-label">Tell us what needs care</span><textarea {...fieldProps("requirements")} required maxLength={1500} rows={4} placeholder="Items, approximate quantity and how often. For example: 100 staff uniforms, collected every week." />{error("requirements")}</label>
      </div>
      <button className="pz-button pz-enquiry-submit" type="submit">Prepare enquiry <ArrowUpRight size={18} aria-hidden="true" /></button>
      <p className="pz-enquiry-note">Next, review your details and send them to our team on WhatsApp. We’ll discuss your requirements and a tailored quote.</p>
      <p className="pz-enquiry-privacy">Your details are used to respond to this enquiry. <Link href="/privacy">Privacy policy</Link></p>
    </form>}
  </section>;
}
