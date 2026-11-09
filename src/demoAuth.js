export const demoUsername = import.meta.env.VITE_DEMO_USERNAME || ''
export const demoPhone = import.meta.env.VITE_DEMO_PHONE || ''
export const demoLoginPassword = import.meta.env.VITE_DEMO_LOGIN_PASSWORD || ''
export const demoPaymentPassword = import.meta.env.VITE_DEMO_PAYMENT_PASSWORD || ''

export function isDemoLoginValid(identity, password) {
  const account = String(identity || '').trim()
  return Boolean(
    account
    && password
    && password === demoLoginPassword
    && [demoUsername, demoPhone].filter(Boolean).includes(account)
  )
}
