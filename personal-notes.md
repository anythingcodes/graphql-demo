# Personal Notes
## GraphQL Live Coding Demo at Facebook Cambridge, 1/12/17

Robert Zhu & Laney Kuenzel

GraphQL = a data query lang
- github.com/robzhu/graphql-demo

## API Location

http://api.graphql.tk/authors

Use http://graph.graphql.tk/ for IDE / test query executer that's bundled with GraphQL if you use Express GraphQL plugin.
- Start with a route and, from there, you can explore other objects
- With Express server, have the boolean option to run `graphiql` or not using the express-graphql middleware: https://github.com/graphql/express-graphql
- Introspection query pulls down entire schema of an endpoint: http://graphql.org/learn/introspection/
- To load up authors for moment and then, after user interaction, how can we load up books? Node interface specifies that it has unique ID and use that instead of href
  - e.g. `node("1234")` is an endpoint, user would have to call that function to trigger response
- Pagination: can add `books(first: 10, after: 38)` or use Connections per the Relay spec -- FB's recommended approach
  - Another example: `books(page: 8)`
- Still uses HTTP
- Arguments show up in the schema explorer as well
- Authentication: Do auth outside of context of GraphQL, do auth in business logic. Use `basic-auth` repo for example.
- **Mutations** are how you make changes. See http://dev.graphql.tk/ for example or GraphQL-API repo.
  - Can execute a query right after mutation is performed. Mutation defined in schema.js.
- API should handle collisions, e.g. if you tried to input a book with the same ID
- Can do reads with arguments, not only writes
- Falcor by Netflix is often compared to GraphQL - uses paths, JSON, and is more compact
- If resource unavailable, what to do (500 error for example)? View error handling examples. Can return a special code in the `errors` array.
- Entities layer fulfills/enforces the business logic
  - See the chart at http://graphql.org/learn/thinking-in-graphs/#business-logic-layer
- Subscribing to a query? Not yet in the spec but will have GraphQL Subscriptions (updating comments on a post, live video interactions, etc.) eventually. They have internal pub-sub system and are working with MeteorJS people. Check blog posts for GraphQL subscriptions.
  - Search for Laney's talks on YouTube

GraphQL Hackathon, Feb 10, 5-11pm at Facebook Cambridge