# withInteraction
Discord interactions helpers compatible with itty-router and Cloudflare Workers.

## Docs
### Install
```sh
yarn add @neko03/with-interaction`
```

### withInteraction
```typescript
  router.post('/interactions', withInteraction, handleInteraction)
```

### Requests
A low-level wrapping for the [Discord API](https://discord.com/developers/docs).\
Currently implemented:
- [bulkOverwriteGlobalApplicationCommands](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands)

- [getOriginalInteractionResponse](https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response)
- [editOriginalInteractionResponse](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response)
- [deleteOriginalInteractionResponse](https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response)
* [getChannel](https://discord.com/developers/docs/resources/channel#get-channel)

## Development
- API Structures from `discord-api-types`
- Verify key utils from `discord-interactions`
