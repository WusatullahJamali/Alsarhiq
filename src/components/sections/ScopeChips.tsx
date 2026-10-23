export interface ScopeChip {
  number: string
  label: string
}

/** The five stages a project goes through, as a plain numbered strip. */
export function ScopeChips({ label, chips }: { label: string; chips: ScopeChip[] }) {
  return (
    <ol aria-label={label} className="m-0 mb-10 grid list-none grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line p-0 min-[700px]:grid-cols-5">
      {chips.map((chip) => (
        <li key={chip.label} className="flex items-baseline gap-2 bg-paper px-4 py-3 text-sm font-semibold max-[420px]:col-span-2">
          <b className="font-extrabold text-gold-text">{chip.number}</b>
          <span>{chip.label}</span>
        </li>
      ))}
    </ol>
  )
}
