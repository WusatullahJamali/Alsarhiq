import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ForgotForm } from '@/components/sections/ForgotForm'
import { AuthShell } from '@/components/sections/AuthShell'
import { PageNote } from '@/components/sections/PageNote'
import { Seo } from '@/components/Seo'
import { useLocalizedPath } from '@/hooks/useLang'

export default function ForgotPassword() {
  const { t } = useTranslation('auth')
  const to = useLocalizedPath()

  return (
    <>
      <Seo title={t('forgot.title')} description={t('forgot.meta')} noindex />
      <AuthShell
        title={t('forgot.title')}
        lead={t('forgot.lead')}
        footer={
          <Link to={to('login')} className="inline-flex min-h-11 items-center font-semibold text-brand hover:underline">
            {t('forgot.back')}
          </Link>
        }
      >
        <ForgotForm />
      </AuthShell>
      <PageNote ns="auth" k="forgot.info" />
    </>
  )
}
