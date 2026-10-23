import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { FormMessage } from '@/components/ui/form-message'
import { Input } from '@/components/ui/input'
import { useSimpleForm } from '@/hooks/useSimpleForm'
import { isEmail } from '@/lib/validators'
import { requestPasswordReset } from '@/lib/auth'

export function ForgotForm() {
  const { t } = useTranslation('auth')
  const form = useSimpleForm({
    idPrefix: 'forgot',
    initial: { email: '' },
    validate: (v) => ({
      email: !v.email.trim() ? t('errors.emailRequired') : !isEmail(v.email) ? t('errors.emailInvalid') : undefined,
    }),
    submit: (v) => requestPasswordReset({ email: v.email.trim() }),
    resetOnSuccess: true,
  })
  const sending = form.status === 'sending'

  return (
    <form onSubmit={form.onSubmit} noValidate className="grid gap-4">
      <FormField id="forgot-email" label={t('fields.email')} error={form.errors.email} required>
        <Input
          id="forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={form.values.email}
          maxLength={120}
          onChange={(e) => form.setValue('email', e.target.value.replace(/\s/g, ''))}
          aria-invalid={!!form.errors.email}
          aria-describedby={form.errors.email ? 'forgot-email-error' : undefined}
        />
      </FormField>
      <Button type="submit" disabled={sending}>
        {sending ? t('sending') : t('forgot.submit')}
      </Button>
      <FormMessage tone="success">{form.status === 'success' ? t('forgot.success') : null}</FormMessage>
      <FormMessage tone="error">{form.status === 'error' ? t('errors.failed') : null}</FormMessage>
    </form>
  )
}
