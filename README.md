# REST React Query

`rest-react-query` is just a small collection of hooks that make it easy to integrate [React Query](https://github.com/tannerlinsley/react-query) into a REST API. Compatible with React Native.

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

## Query usage

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

## Mutation usage

For Mutations, you can import the following methods:

- `createMutation` (for POST request)
- `updateMutation` (for PATCH request)
- `deleteMutation` (for DELETE request)
- `replaceMutation` (for PUT request)

```ts
import { createMutation } from "rest-react-query";

export const createUserMutation = createMutation({
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
    /**
     * POST /users {
     *  name: "John Doe"
     * }
     */
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
      <h1>Hello there!</h1>
    </div>
  );
}
```

## Caching and Authentication

You can cache the mutation / query result using the `cacheResponse` property.

Example:

```ts
export const signInMutation = createMutation({
  path: "auth/sign-in",
  cacheResponse: {
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

## Auto invalidation feature

Mutations are automatically invalidating the queries with the same path, to disable this, pass a falsy `autoInvalidation` in the `RestClientProvider`.

## Mutation properties

### Methods createMutation, updateMutation, deleteMutation, replaceMutation

| Property        | Description                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------ |
| path            | A string that will be appended to the baseUrl.                                                   |
| invalidatePaths | A array of strings that will be used to invalidate the queries after a successful mutation call. |
| cacheResponse   | A object with the key that will be used to cache the response.                                   |
| options         | A object with the options from react-query.                                                      |

When calling the result of the build in your React Component, you can pass again theses properties, but its optional.

And when calling the mutation using `mutateAsync` or `mutate`, you can pass the following properties:

| Property    | Description                                            |
| ----------- | ------------------------------------------------------ |
| data        | A object with the data to be sent in the request body. |
| appendToUrl | A string that will be appended to the baseUrl.         |

## Query properties

### Method buildQuery

| Property        | Description                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------ |
| path            | A string that will be appended to the baseUrl.                                                   |
| invalidatePaths | A array of strings that will be used to invalidate the queries after a successful mutation call. |
| cacheResponse   | A object with the key that will be used to cache the response.                                   |
| options         | A object with the options from react-query.                                                      |
| appendToUrl     | A string that will be appended to the baseUrl.                                                   |
| params          | A object with the params that will be appended to the url.                                       |

When calling the result of buildQuery in your React Component, you can pass again theses properties, but its optional.

## Running the tests

> TODO: Implement tests

## Contributing

Feel free to submit a PR.

## Authors

- **[Caio Henrique](https://github.com/Coystark)**
- **[Marcel P Goes](https://github.com/glothos)**

See also the list of [contributors](https://github.com/quasardd/rest-react-query/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
