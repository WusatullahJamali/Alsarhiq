import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'

/** Router errorElement: a failed lazy chunk (offline, stale dev server, new deploy) gets a reload button instead of the raw router error page. */
export function RouteError() {
  const { t } = useTranslation()

  return (
    <main className="grid min-h-svh place-content-center justify-items-start gap-4 p-6">
      <Heading as="h1" size="h1">
        {t('routeError.title')}
      </Heading>
      <p className="m-0 max-w-[36em] text-muted-foreground">{t('routeError.text')}</p>
      <Button onClick={() => window.location.reload()}>{t('routeError.reload')}</Button>
    </main>
  )
}
