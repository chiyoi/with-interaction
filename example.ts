import { IRequest, Router, error, json } from 'itty-router'
import { WithInteraction, bulkOverwriteGlobalApplicationCommands, withInteraction } from '@/src'
import * as discord from 'discord-api-types/v10'

export default {
  fetch: (request: Request, env: Env, ctx: ExecutionContext) => router()
    .handle(request, env, ctx)
    .catch(error),
}

function router() {
  const router = Router()
  router.all('/ping', () => new Response('Pong!'))
  router.post('/interactions', withInteraction, handleInteraction)
  router.post('/install_commands', installCommands)
  router.all('*', () => error(404, 'Endpoint not exist.'))
  return router
}

async function handleInteraction(request: IRequest & WithInteraction, env: Env, ctx: ExecutionContext) {
  const { interaction } = request
  if (interaction.type === discord.InteractionType.Ping) {
    const response: discord.APIInteractionResponse = {
      type: discord.InteractionResponseType.Pong
    }
    return json(response)
  }
  if (interaction.type === discord.InteractionType.ApplicationCommand) switch (interaction.data.name) {
  case 'echo': return echo(request, env)
  default:
    console.error(`Unknown interaction type ${interaction.type}`)
    return error(500)
  }
}

export async function installCommands(request: IRequest, env: Env) {
  return json(await bulkOverwriteGlobalApplicationCommands(env, [Echo]))
}

const Echo: discord.RESTPostAPIApplicationCommandsJSONBody = {
  name: 'echo',
  description: 'Echo input message.',
  type: discord.ApplicationCommandType.ChatInput,
  options: [
    {
      type: discord.ApplicationCommandOptionType.String,
      name: 'message',
      description: 'Message to echo.',
      required: true,
    }
  ]
}

function echo(request: IRequest & WithInteraction, env: Env) {
  const { interaction } = request
  if (interaction.type !== discord.InteractionType.ApplicationCommand || interaction.data.type !== discord.ApplicationCommandType.ChatInput) return error(500)
  if (interaction.data.options?.[0].type !== discord.ApplicationCommandOptionType.String || interaction.data.options?.[0].name !== 'message') return error(400, 'Malformed options.')
  const message = interaction.data.options[0].value
  const response: discord.APIInteractionResponse = {
    type: discord.InteractionResponseType.ChannelMessageWithSource,
    data: { content: message },
  }
  return json(response)
}

type Env = {
  DISCORD_APPLICATION_ID: string,
  DISCORD_APPLICATION_PUBLIC_KEY: string,
  DISCORD_APPLICATION_BOT_TOKEN: string,
}
