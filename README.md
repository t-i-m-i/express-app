# Learning Express by mapping Fastify architecture onto it

The app's code is heavily commented, showing what each part does and how it relates to Fastify.

## How to run it

To test the API use the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension (requests are in `requests/api.http`) or the curl commands below.

```sh
bun dev
curl localhost:3333/health                                   # public, no auth
curl localhost:3333/v1/favourite-items                     # 401, auth gate blocks it
curl -H 'x-user-id: alice' localhost:3333/v1/favourite-items
curl -H 'x-user-id: alice' -H 'Content-Type: application/json' \
     -X POST -d '{"itemId":1}' localhost:3333/v1/favourite-items
curl -H 'x-user-id: alice' -H 'Content-Type: application/json' \
     -X DELETE -d '{"itemId":1}' localhost:3333/v1/favourite-items
curl -H 'x-user-id: alice' localhost:3333/v1/boom            # async throw → error handler
```
