export const requiredEnvVar = (name: string) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Env var is required: ${name}`)
  }

  return value
}
