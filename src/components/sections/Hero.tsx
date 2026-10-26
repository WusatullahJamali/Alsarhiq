import { Link } from 'react-router'
import { ArrowIcon } from '@/components/ui/arrow-icon'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import type { ScopeChip } from '@/components/sections/ScopeChips'
import { useLogos } from '@/hooks/useLang'

interface HeroProps {
  eyebrow: string
  domain: string
  homeTo: string
  logoAlt: string
  fullName: string
  taglineLead: string
  taglineAccent: string
  lead: string
  primary: { label: string; to: string }
  secondary: { label: string; to: string }
  scope: { label: string; chips: ScopeChip[] }
}

const rise = (n: number) => ({ ['--d' as string]: `${n * 110}ms` })

export function Hero({ eyebrow, domain, homeTo, logoAlt, fullName, taglineLead, taglineAccent, lead, primary, secondary, scope }: HeroProps) {
  const { lockup: logo } = useLogos()
  return (
    <section className="relative overflow-hidden border-b-[6px] border-gold bg-dark bg-grid text-dark-fg">
      <Container className="grid items-center gap-x-14 gap-y-8 py-9 sm:py-14 lg:min-h-[min(40rem,75svh)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          <div className="rise mb-5 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-gold" style={rise(0)}>
            <span>{eyebrow}</span>
            <Link to={homeTo} dir="ltr" className="hover:underline">{domain}</Link>
          </div>
          <h1 className="rise m-0 text-[clamp(2.4rem,6.2vw,4.25rem)] leading-[1.12] font-extrabold text-balance" style={rise(1)}>
            {taglineLead} <span className="text-gold">{taglineAccent}</span>
          </h1>
          <p className="rise mt-4 mb-0 max-w-[34em] text-lead sm:mt-6 leading-relaxed text-dark-soft" style={rise(2)}>
            {lead}
          </p>
          <div className="rise mt-6 flex flex-wrap gap-3 sm:mt-8 max-[520px]:*:flex-1 max-[520px]:*:basis-full" style={rise(3)}>
            <Link to={primary.to} className={buttonVariants({ variant: 'gold' })}>
              {primary.label}
              <ArrowIcon />
            </Link>
            <Link to={secondary.to} className={buttonVariants({ variant: 'outlineLight' })}>
              {secondary.label}
            </Link>
          </div>
        </div>

        <aside className="rise min-w-0 rounded-md border border-dark-line bg-white/5 p-5 min-[520px]:p-8" style={rise(4)}>
          <img src={logo} width={970} height={281} alt={logoAlt} fetchPriority="high" className="h-auto w-[min(100%,22rem)]" />
          <p className="mt-4 mb-0 text-xs leading-relaxed text-dark-muted">{fullName}</p>
          <p className="mt-7 mb-2 text-xs font-bold text-gold">{scope.label}</p>
          <ol className="m-0 grid list-none p-0">
            {scope.chips.map((chip, i) => (
              <li key={chip.label} className="group relative flex items-center gap-4 py-2.5 text-[1.05rem] font-semibold">
                <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-gold bg-dark text-sm font-extrabold text-gold transition-colors duration-200 group-hover:bg-gold group-hover:text-gold-ink">
                  {chip.number}
                </span>
                {i < scope.chips.length - 1 && (
                  <span aria-hidden="true" className="absolute start-[calc(1.125rem-0.5px)] top-[calc(50%+1.125rem)] h-[calc(100%-2.25rem)] w-px bg-gold/40" />
                )}
                {chip.label}
              </li>
            ))}
          </ol>
        </aside>
      </Container>
    </section>
  )
}
