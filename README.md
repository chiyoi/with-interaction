# withInteraction
Discord interactions utils compatible with itty-router and Cloudflare Workers.

## Docs
### Install
`yarn add @neko03/with-interaction`

### withInteraction
```ts
  router.post('/interactions', withInteraction, handleInteraction)
```

### Requests
Low-level wrappings for the [Discord API](https://discord.com/developers/docs).\
Currently implemented:
- [bulkOverwriteGlobalApplicationCommands](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands)
- [getChannel](https://discord.com/developers/docs/resources/channel#get-channel)


## Development
- API Structures from `discord-api-types`
- Verify key utils from `discord-interactions`
