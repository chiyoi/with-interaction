import { APIApplicationCommand } from 'discord-api-types/v10'

export const ENDPOINT = 'https://discord.com/api/v10'

export async function installGlobalCommands(commands: Partial<APIApplicationCommand>[], env: EnvInstallGlobalCommands) {
  const endpoint = `${ENDPOINT}/applications/${env.DISCORD_APPLICATION_TOKEN}/commands`
  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Bot ${env.DISCORD_APPLICATION_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(commands)
  })
}

interface EnvInstallGlobalCommands {
  DISCORD_APPLICATION_ID: string,
  DISCORD_APPLICATION_TOKEN: string,
}

export async function deleteGlobalCommand(commandID: string, env: EnvDeleteGlobalCommands) {
  const endpoint = `${ENDPOINT}/applications/${env.DISCORD_APPLICATION_ID}/commands/${commandID}`
  return fetch(endpoint, {
    method: 'DELETE',
    headers: {
      Authorization: `Bot ${env.DISCORD_APPLICATION_TOKEN}`,
    }
  })
}

interface EnvDeleteGlobalCommands {
  DISCORD_APPLICATION_ID: string,
  DISCORD_APPLICATION_TOKEN: string,
}
