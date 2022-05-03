# REST React Query

`rest-react-query` is just a small collection of hooks that make it easy to integrate React Query into a REST API.

### Installing

Install with npm or yarn

npm:

```
npm i --save rest-react-query
```

yarn

```
yarn add rest-react-query
```

## Inicialization

```ts
import { RestClientProvider } from "rest-react-query";

export default function App() {
  return (
    <RestClientProvider baseUrl="http://localhost:3000/api/">
      <Example />
    </RestClientProvider>
  );
}
```

## Query Usage

```ts
import { buildQuery } from "rest-react-query";

export const getUsersQuery = buildQuery({ path: "users" });

function Example() {
  // GET http://localhost:3000/api/users
  const { isLoading, error, data } = getUsersQuery();

  // OR GET http://localhost:3000/api/users/1/vehicles?page=1
  /* const { isLoading, error, data } = getUsersQuery({
    appendToUrl: "1/vehicles",
    params: {
      page: 1,
    },
    options: {
      // Options from react-query
      retry: 2,
    },
  }); */

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```

## Mutation Usage

```ts
import { createMutation, updateMutation } from "rest-react-query";

export const createUserMutation = createMutation({
  path: "users",
});

export const updateUserMutation = updateMutation({
  path: "users",
});

function Example() {
  const createUser = createUserMutation();

  /* OR
  const createUser = createUserMutation({
    invalidatePaths: ["products"],
    options: {
      // Options from react-query
      retry: 2,
    },
  }); */

  async function handleSubmit() {
    // POST /users
    await createUser.mutateAsync({
      data: {
        name: "John Doe",
      },
    });

    /**
     * POST /users/1/vehicles {
     *  plate: "XXXXX"
     * }
     */
    await createUser.mutateAsync({
      appendToUrl: "1/vehicles",
      data: {
        plate: "XXXXX",
      },
    });
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```

## Caching and Authencation

You can cache the mutation / query result using the `saveResponse` property.

Example:

```ts
export const signInMutation = createMutation({
  path: "auth/sign-in",
  saveResponse: {
    key: "user",
  },
});
```

Assuming that the response contains the user data with the `accessToken` property, you can use the `getSimpleJwtAuth` function to set the `Authorization` header with the `Bearer` prefix.

```ts
const App = ({ children }) => {
  return (
    <RestClientProvider
      baseUrl="http://localhost:3000/api/"
      {...getSimpleJwtAuth({ key: "user", path: "data.user.accessToken" })}
    >
      {children}
    </RestClientProvider>
  );
};
```

## Mutation

> TODO: List of Mutation props

## Query

> TODO: List of Query props

## Running the tests

> TODO: Implement tests

## Contributing

Feel free to submit a PR.

## Authors

- **[Caio Henrique](https://github.com/Coystark)**
- **[Marcel P Goes](https://github.com/glothos)**

See also the list of [contributors](https://github.com/quasardd/react-query-rest-boilerplate/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
