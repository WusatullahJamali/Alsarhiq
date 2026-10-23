import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { FormMessage } from '@/components/ui/form-message'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useLocalizedPath } from '@/hooks/useLang'
import { useSimpleForm } from '@/hooks/useSimpleForm'
import { isEmail, maxPasswordLength } from '@/lib/validators'
import { login } from '@/lib/auth'

export function LoginForm() {
  const { t } = useTranslation('auth')
  const to = useLocalizedPath()
  const form = useSimpleForm({
    idPrefix: 'login',
    initial: { email: '', password: '', remember: false },
    validate: (v) => ({
      email: !v.email.trim() ? t('errors.emailRequired') : !isEmail(v.email) ? t('errors.emailInvalid') : undefined,
      password: v.password ? undefined : t('errors.passwordRequired'),
    }),
    submit: (v) => login(v),
  })
  const sending = form.status === 'sending'

  return (
    <form onSubmit={form.onSubmit} noValidate className="grid gap-3">
      <FormField id="login-email" label={t('fields.email')} error={form.errors.email} required>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={form.values.email}
          maxLength={120}
          onChange={(e) => form.setValue('email', e.target.value.replace(/\s/g, ''))}
          aria-invalid={!!form.errors.email}
          aria-describedby={form.errors.email ? 'login-email-error' : undefined}
        />
      </FormField>
      <FormField id="login-password" label={t('fields.password')} error={form.errors.password} required>
        <PasswordInput
          id="login-password"
          name="password"
          autoComplete="current-password"
          showLabel={t('fields.show')}
          hideLabel={t('fields.hide')}
          value={form.values.password}
          maxLength={maxPasswordLength}
          onChange={(e) => form.setValue('password', e.target.value)}
          aria-invalid={!!form.errors.password}
          aria-describedby={form.errors.password ? 'login-password-error' : undefined}
        />
      </FormField>
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={form.values.remember}
            onChange={(e) => form.setValue('remember', e.target.checked)}
            className="size-5 accent-brand"
          />
          {t('login.remember')}
        </label>
        <Link to={to('forgot-password')} className="inline-flex min-h-11 items-center text-sm font-semibold text-brand hover:underline">
          {t('login.forgot')}
        </Link>
      </div>
      <Button type="submit" disabled={sending}>
        {sending ? t('sending') : t('login.submit')}
      </Button>
      <FormMessage tone="success">{form.status === 'success' ? t('login.success') : null}</FormMessage>
      <FormMessage tone="error">{form.status === 'error' ? t('errors.failed') : null}</FormMessage>
    </form>
  )
}
