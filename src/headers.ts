import { EnvApplicationBotToken } from './env'

export const headersAuthorizationBotToken: (env: EnvApplicationBotToken) => HeadersInit = (env) => ({
  Authorization: `Bot ${env.DISCORD_APPLICATION_BOT_TOKEN}`,
})

export const headersContentTypeJSON: HeadersInit = {
  'Content-Type': 'application/json; charset=UTF-8',
}
