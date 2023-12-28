import * as api from 'discord-api-types/v10'
import { DISCORD_API_ENDPOINT } from '.'
import { EnvApplicationBotToken } from '../env'
import { AuthorizationBotToken } from '@/src/headers'

export async function getChannel(channel: { id: string }, env: EnvApplicationBotToken) {
  const endpoint = `${DISCORD_API_ENDPOINT}/channels/${channel.id}`
  const response = await fetch(endpoint, { headers: AuthorizationBotToken(env) })
  if (!response.ok) throw new Error(`Get Channel error: ${await response.text()}`)
  return await response.json() as api.APIChannel
}

export async function editMessage(channel: { id: string }, message: { id: string }, env: EnvApplicationBotToken, body: api.RESTPatchAPIChannelMessageJSONBody | FormData) {
  const endpoint = `${DISCORD_API_ENDPOINT}/channels/${channel.id}/messages/${message.id}`
  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: AuthorizationBotToken(env),
    body: body instanceof FormData ? body : JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Edit Message error: ${await response.text()}`)
  return await response.json() as api.APIMessage
}
