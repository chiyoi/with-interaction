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
A low-level wrapping for the [Discord API](https://discord.com/developers/docs).

## Development
- API Structures from `discord-api-types`
- Verify key utils from `discord-interactions`
