import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { LoginForm } from '@/components/sections/LoginForm'
import { AuthShell } from '@/components/sections/AuthShell'
import { Seo } from '@/components/Seo'
import { useLocalizedPath } from '@/hooks/useLang'

export default function Login() {
  const { t } = useTranslation('auth')
  const to = useLocalizedPath()

  return (
    <>
      <Seo title={t('login.title')} description={t('login.lead')} noindex />
      <AuthShell
        social
        title={t('login.title')}
        lead={t('login.lead')}
        footer={
          <p className="m-0">
            {t('login.noAccount')}{' '}
            <Link to={to('signup')} className="inline-flex min-h-11 min-w-11 items-center font-semibold text-brand hover:underline">
              {t('login.toSignup')}
            </Link>
          </p>
        }
      >
        <LoginForm />
      </AuthShell>
    </>
  )
}
