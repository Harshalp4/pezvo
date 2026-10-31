/** Long-form legal / editorial text at a readable measure. */
export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-measure
        [&_h2]:mt-10 [&_h2]:text-[1.35rem] [&_h2]:font-bold
        [&_h3]:mt-7 [&_h3]:text-[1.0625rem] [&_h3]:font-bold
        [&_p]:mt-3.5 [&_p]:text-ink-muted
        [&_ul]:mt-3.5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-ink-muted [&_ul]:marker:text-blue-400
        [&_li]:mt-2
        [&_a]:font-medium [&_a]:text-blue-700 [&_a]:underline [&_a]:decoration-blue-200 [&_a]:underline-offset-4"
    >
      {children}
    </div>
  );
}
