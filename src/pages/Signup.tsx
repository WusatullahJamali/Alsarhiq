import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { SignupForm } from '@/components/sections/SignupForm'
import { AuthShell } from '@/components/sections/AuthShell'
import { PageNote } from '@/components/sections/PageNote'
import { Seo } from '@/components/Seo'
import { useLocalizedPath } from '@/hooks/useLang'

export default function Signup() {
  const { t } = useTranslation('auth')
  const to = useLocalizedPath()

  return (
    <>
      <Seo title={t('signup.title')} description={t('signup.meta')} noindex />
      <AuthShell
        social
        title={t('signup.title')}
        lead={t('signup.lead')}
        footer={
          <p className="m-0">
            {t('signup.haveAccount')}{' '}
            <Link to={to('login')} className="inline-flex min-h-11 min-w-11 items-center font-semibold text-brand hover:underline">
              {t('signup.toLogin')}
            </Link>
          </p>
        }
      >
        <SignupForm />
      </AuthShell>
      <PageNote ns="auth" k="signup.info" />
    </>
  )
}
