/**
 * Auth service. There is no backend yet: each call waits briefly and succeeds.
 * Replace the bodies with real API calls (fetch to your server); the forms already handle loading, errors and success.
 */
export interface LoginInput {
  email: string
  password: string
  remember: boolean
}
export interface SignupInput {
  name: string
  email: string
  password: string
}
export interface ForgotInput {
  email: string
}

const pause = (ms = 700) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export async function login(input: LoginInput): Promise<void> {
  void input
  await pause()
}

export async function signup(input: SignupInput): Promise<void> {
  void input
  await pause()
}

export async function requestPasswordReset(input: ForgotInput): Promise<void> {
  void input
  await pause()
}
