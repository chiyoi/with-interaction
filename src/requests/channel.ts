import { APIChannel } from 'discord-api-types/v10'
import { EnvApplicationBotToken } from '../env'
import { DISCORD_API_ENDPOINT } from '.'

export async function getChannel(channelID: string, env: EnvApplicationBotToken) {
  const endpoint = `${DISCORD_API_ENDPOINT}/channels/${channelID}`
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bot ${env.DISCORD_APPLICATION_BOT_TOKEN}`,
    }
  })
  if (!response.ok) throw new Error(`Get Channel error: ${await response.text()}`)
  return await response.json() as APIChannel
}
