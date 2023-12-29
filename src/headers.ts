import { EnvApplicationBotToken } from './env'

export const AuthorizationBotToken: (env: EnvApplicationBotToken) => HeadersInit = (env) => ({
  Authorization: `Bot ${env.DISCORD_APPLICATION_BOT_TOKEN}`,
})

export const ContentTypeFormData: HeadersInit = {
  'Content-Type': 'multipart/form-data; charset=UTF-8',
}

export const ContentTypeJSON: HeadersInit = {
  'Content-Type': 'application/json; charset=UTF-8',
}
