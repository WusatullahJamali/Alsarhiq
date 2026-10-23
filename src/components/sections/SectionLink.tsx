import { Link } from 'react-router'
import { ArrowIcon } from '@/components/ui/arrow-icon'
import { buttonVariants } from '@/components/ui/button'

/** "Learn more" link shown under a home preview section. */
export function SectionLink({ to, label }: { to: string; label: string }) {
  return (
    <div className="mt-6 sm:mt-8">
      <Link to={to} className={buttonVariants({ variant: 'outline' })}>
        {label}
        <ArrowIcon />
      </Link>
    </div>
  )
}
