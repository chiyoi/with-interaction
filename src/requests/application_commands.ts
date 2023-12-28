import * as api from 'discord-api-types/v10'
import { DISCORD_API_ENDPOINT } from '.'
import { EnvApplicationBotToken, EnvApplicationID } from '../env'
import * as headers from '../headers'

export async function bulkOverwriteGlobalApplicationCommands(env: EnvApplicationID & EnvApplicationBotToken, body: api.RESTPutAPIApplicationCommandsJSONBody,) {
  const endpoint = `${DISCORD_API_ENDPOINT}/applications/${env.DISCORD_APPLICATION_ID}/commands`
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      ...headers.AuthorizationBotToken(env),
      ...headers.ContentTypeJSON,
    },
    body: JSON.stringify(body)
  })
  if (response.status !== 200) throw new Error(`Bulk Overwrite Global Application Commands error: ${await response.text()}`)
  return await response.json() as api.APIApplicationCommand[]
}

export async function getOriginalInteractionResponse(interaction: { token: string }, env: EnvApplicationID & EnvApplicationBotToken) {
  const endpoint = `${DISCORD_API_ENDPOINT}/webhooks/${env.DISCORD_APPLICATION_ID}/${interaction.token}/messages/@original`
  const response = await fetch(endpoint, { headers: headers.AuthorizationBotToken(env) })
  if (!response.ok) throw new Error(`Get Original Interaction Response error: ${await response.text()}`)
  return await response.json() as api.APIMessage
}

export async function editOriginalInteractionResponse(interaction: { token: string }, env: EnvApplicationID & EnvApplicationBotToken, body: api.RESTPatchAPIWebhookWithTokenMessageJSONBody | FormData) {
  const endpoint = `${DISCORD_API_ENDPOINT}/webhooks/${env.DISCORD_APPLICATION_ID}/${interaction.token}/messages/@original`
  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      ...headers.AuthorizationBotToken(env),
      ...headers.ContentTypeJSON,
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Edit Original Interaction Response error: ${await response.text()}`)
  return await response.json() as api.RESTPatchAPIInteractionOriginalResponseResult
}

export async function deleteOriginalInteractionResponse(interaction: { token: string }, env: EnvApplicationID & EnvApplicationBotToken) {
  const endpoint = `${DISCORD_API_ENDPOINT}/webhooks/${env.DISCORD_APPLICATION_ID}/${interaction.token}/messages/@original`
  const response = await fetch(endpoint, { method: 'DELETE', headers: headers.AuthorizationBotToken(env) })
  if (response.status !== 204) throw new Error(`Delete Original Interaction Response error: ${await response.text()}`)
}
