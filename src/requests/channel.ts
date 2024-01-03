import * as api from 'discord-api-types/v10'
import { DISCORD_API_ENDPOINT } from '.'
import { EnvApplicationBotToken } from '../env'
import { AuthorizationBotToken, ContentTypeFormData, ContentTypeJSON } from '@/src/headers'

export const getChannel = async (channel: { id: string }, env: EnvApplicationBotToken) => {
  const endpoint = `${DISCORD_API_ENDPOINT}/channels/${channel.id}`
  const response = await fetch(endpoint, { headers: AuthorizationBotToken(env) })
  if (!response.ok) throw new Error(`Get Channel error: ${await response.text()}`)
  return await response.json() as api.APIChannel
}

export const createMessage = async (channel: { id: string }, env: EnvApplicationBotToken, body: api.RESTPostAPIChannelMessageJSONBody | FormData) => {
  const endpoint = `${DISCORD_API_ENDPOINT}/channels/${channel.id}/messages`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...AuthorizationBotToken(env),
      ...(body instanceof FormData ? ContentTypeFormData : ContentTypeJSON),
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Create Message error: ${await response.text()}`)
  return await response.json() as api.APIMessage
}

export const editMessage = async (channel: { id: string }, message: { id: string }, env: EnvApplicationBotToken, body: api.RESTPatchAPIChannelMessageJSONBody | FormData) => {
  const endpoint = `${DISCORD_API_ENDPOINT}/channels/${channel.id}/messages/${message.id}`
  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      ...AuthorizationBotToken(env),
      ...(body instanceof FormData ? ContentTypeFormData : ContentTypeJSON),
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Edit Message error: ${await response.text()}`)
  return await response.json() as api.APIMessage
}

export const deleteMessage = async (channel: { id: string }, message: { id: string }, env: EnvApplicationBotToken) => {
  const endpoint = `${DISCORD_API_ENDPOINT}/channels/${channel.id}/messages/${message.id}`
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: AuthorizationBotToken(env),
  })
  if (response.status !== 204) throw new Error(`Delete Message error: ${await response.text()}`)
}
