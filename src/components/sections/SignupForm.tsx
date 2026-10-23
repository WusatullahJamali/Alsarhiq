import { Link } from 'react-router'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { FormMessage } from '@/components/ui/form-message'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useLocalizedPath } from '@/hooks/useLang'
import { useSimpleForm } from '@/hooks/useSimpleForm'
import { cleanName, isEmail, isName, isStrongPassword, maxPasswordLength, minPasswordLength } from '@/lib/validators'
import { signup } from '@/lib/auth'

const linkClass = 'font-semibold text-brand underline underline-offset-4'

export function SignupForm() {
  const { t } = useTranslation('auth')
  const to = useLocalizedPath()
  const form = useSimpleForm({
    idPrefix: 'signup',
    initial: { name: '', email: '', password: '', confirm: '', terms: false },
    validate: (v) => ({
      name: !v.name.trim() ? t('errors.name') : !isName(v.name) ? t('errors.nameInvalid') : undefined,
      email: !v.email.trim() ? t('errors.emailRequired') : !isEmail(v.email) ? t('errors.emailInvalid') : undefined,
      password: !v.password
        ? t('errors.passwordRequired')
        : v.password.length < minPasswordLength
          ? t('errors.passwordShort', { min: minPasswordLength })
          : !isStrongPassword(v.password)
            ? t('errors.passwordWeak')
            : undefined,
      confirm: v.confirm === v.password ? undefined : t('errors.passwordMismatch'),
      terms: v.terms ? undefined : t('errors.terms'),
    }),
    submit: (v) => signup({ name: v.name.trim(), email: v.email.trim(), password: v.password }),
  })
  const sending = form.status === 'sending'

  return (
    <form onSubmit={form.onSubmit} noValidate className="grid gap-3">
      <FormField id="signup-name" label={t('fields.fullName')} error={form.errors.name} required>
        <Input
          id="signup-name"
          name="name"
          autoComplete="name"
          value={form.values.name}
          maxLength={60}
          onChange={(e) => form.setValue('name', cleanName(e.target.value))}
          aria-invalid={!!form.errors.name}
          aria-describedby={form.errors.name ? 'signup-name-error' : undefined}
        />
      </FormField>
      <FormField id="signup-email" label={t('fields.email')} error={form.errors.email} required>
        <Input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={form.values.email}
          maxLength={120}
          onChange={(e) => form.setValue('email', e.target.value.replace(/\s/g, ''))}
          aria-invalid={!!form.errors.email}
          aria-describedby={form.errors.email ? 'signup-email-error' : undefined}
        />
      </FormField>
      <div className="grid gap-3 min-[520px]:grid-cols-2">
        <FormField id="signup-password" label={t('fields.password')} error={form.errors.password} required>
          <PasswordInput
            id="signup-password"
            name="password"
            autoComplete="new-password"
            showLabel={t('fields.show')}
            hideLabel={t('fields.hide')}
            value={form.values.password}
            maxLength={maxPasswordLength}
            onChange={(e) => form.setValue('password', e.target.value.replace(/\s/g, ''))}
            aria-invalid={!!form.errors.password}
            aria-describedby={form.errors.password ? 'signup-password-error' : undefined}
          />
        </FormField>
        <FormField id="signup-confirm" label={t('fields.confirmPassword')} error={form.errors.confirm} required>
          <PasswordInput
            id="signup-confirm"
            name="confirm"
            autoComplete="new-password"
            showLabel={t('fields.show')}
            hideLabel={t('fields.hide')}
            value={form.values.confirm}
            maxLength={maxPasswordLength}
            onChange={(e) => form.setValue('confirm', e.target.value.replace(/\s/g, ''))}
            aria-invalid={!!form.errors.confirm}
            aria-describedby={form.errors.confirm ? 'signup-confirm-error' : undefined}
          />
        </FormField>
      </div>
      <div className="grid gap-1">
        <label className="flex cursor-pointer items-start gap-2.5 py-1.5 text-sm leading-relaxed">
          <input
            id="signup-terms"
            type="checkbox"
            checked={form.values.terms}
            onChange={(e) => form.setValue('terms', e.target.checked)}
            aria-invalid={!!form.errors.terms}
            aria-describedby={form.errors.terms ? 'signup-terms-error' : undefined}
            className="mt-0.5 size-5 shrink-0 accent-brand"
          />
          <span>
            <Trans
              t={t}
              i18nKey="signup.agree"
              components={{
                terms: <Link to={to('terms')} target="_blank" className={linkClass} />,
                privacy: <Link to={to('privacy')} target="_blank" className={linkClass} />,
              }}
            />
          </span>
        </label>
        {form.errors.terms && (
          <p id="signup-terms-error" role="alert" className="m-0 text-xs font-medium text-err-light">
            {form.errors.terms}
          </p>
        )}
      </div>
      <Button type="submit" disabled={sending}>
        {sending ? t('sending') : t('signup.submit')}
      </Button>
      <FormMessage tone="success">{form.status === 'success' ? t('signup.success') : null}</FormMessage>
      <FormMessage tone="error">{form.status === 'error' ? t('errors.failed') : null}</FormMessage>
    </form>
  )
}
