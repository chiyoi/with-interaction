import { IRequest, error } from 'itty-router'
import { APIInteraction } from 'discord-api-types/v10'
import { verifyKey } from 'discord-interactions'
import { EnvApplicationPublicKey } from './env'

export async function withInteraction(request: IRequest & WithInteraction, env: EnvApplicationPublicKey, ctx: ExecutionContext) {
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
