import { APIApplicationCommand } from 'discord-api-types/v10'
import { EnvApplicationBotToken, EnvApplicationID } from './env'
import { DISCORD_API_ENDPOINT } from '.'

export async function bulkOverwriteGlobalApplicationCommands(commands: Partial<APIApplicationCommand>[], env: EnvApplicationID & EnvApplicationBotToken) {
  const endpoint = `${DISCORD_API_ENDPOINT}/applications/${env.DISCORD_APPLICATION_ID}/commands`
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Bot ${env.DISCORD_APPLICATION_BOT_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(commands)
  })
  if (response.status !== 200) throw new Error(`Bulk Overwrite Global Application Commands error: ${await response.text()}`)
  return await response.json() as APIApplicationCommand[]
}
