import { IRequest, RouteHandler, error } from 'itty-router'
import { APIInteraction } from 'discord-api-types/v10'
import { verifyKey } from 'discord-interactions'
import { EnvApplicationPublicKey } from './internal/env'

export const withInteraction: RouteHandler<IRequest & WithInteraction, [EnvApplicationPublicKey, ...any]> = async (request, env) => {
  const body = await request.text()
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')
  const valid = signature && timestamp && verifyKey(body, signature, timestamp, env.DISCORD_APPLICATION_PUBLIC_KEY)
  if (!valid) return error(401, 'Bad request signature.')
  request.interaction = JSON.parse(body)
}

export type WithInteraction = {
  interaction: APIInteraction,
}
