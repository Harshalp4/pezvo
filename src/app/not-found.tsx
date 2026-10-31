import Link from "next/link";
import OrderNow from "@/components/ui/OrderNow";

export default function NotFound() {
  return (
    <section className="section mt-[calc(-1*var(--header-h))] bg-fresh-wash pt-[calc(var(--header-h)+clamp(64px,10vw,120px))]">
      <div className="wrap">
        <p className="font-mono text-micro uppercase tracking-[.14em] text-blue-700">404</p>
        <h1 className="mt-3 text-[clamp(2.2rem,4.6vw,3.4rem)] font-extrabold leading-[1.06] -tracking-[.02em]">
          That page went out{" "}
          <span className="text-brand-gradient">for delivery.</span>
        </h1>
        <p className="mt-4 max-w-[52ch] text-[1.0625rem] text-ink-muted">
          It isn&rsquo;t coming back. Try the rate card, check your pincode, or just leave your number and
          we&rsquo;ll call.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <OrderNow source="404">Order Now →</OrderNow>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-xl border-[1.5px] border-blue-700 bg-white px-6 py-3.5 font-semibold text-ink transition hover:bg-blue-50"
          >
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
