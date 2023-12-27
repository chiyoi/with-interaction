import * as api from 'discord-api-types/v10'
import { DISCORD_API_ENDPOINT } from '.'
import { EnvApplicationBotToken } from '../env'
import { headersAuthorizationBotToken } from '../headers'

export async function getChannel(channelID: string, env: EnvApplicationBotToken) {
  const endpoint = `${DISCORD_API_ENDPOINT}/channels/${channelID}`
  const response = await fetch(endpoint, {
    headers: headersAuthorizationBotToken(env),
  })
  if (!response.ok) throw new Error(`Get Channel error: ${await response.text()}`)
  return await response.json() as api.APIChannel
}
