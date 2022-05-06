# React Query RESTful

`react-query-restful` is just a small collection of hooks that make it easy to integrate [React Query](https://github.com/tannerlinsley/react-query) into a REST API.

For a better understanding of the library, it is recommended to understand how React Query works.

Compatible with React Native.

### Installing

Install with npm or yarn

npm:

```
npm i --save react-query-restful
```

yarn

```
yarn add react-query-restful
```

## Inicialization

```ts
import { RestClientProvider } from "react-query-restful";

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
import { buildQuery } from "react-query-restful";

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

The `buildMutation` method will return a few functions, the name will be based on the informed paths.

Example, the path `users` will generate the following functions:

- `createUserMutation` (for POST request)
- `updateUserMutation` (for PATCH request)
- `deleteUserMutation` (for DELETE request)
- `replaceUserMutation` (for PUT request)

All will share the same path & configuration.

```ts
import { buildMutation } from "react-query-restful";

export const {
  createUserMutation,
  updateUserMutation,
  deleteUserMutation,
  replaceUserMutation,
} = buildMutation({
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
export const { createSignInMutation } = createMutation({
  path: ["auth", "sign-in"], // Same as `baseUrl/auth/sign-in`
  cacheResponse: {
    key: "user",
  },
});
```

Assuming that the response contains the user data with the `accessToken` property, you can use the `getSimpleJwtAuth` function to set the `Authorization` header with the `Bearer` prefix. You must specify the `key` where it's stored in the cache, and the `path` until the token.

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

You can make your own custom authentication logic, example:

```ts
import { AsyncStorage } from "react-query-restful";

export const myOwnLogic = () => ({
  interceptors: {
    onRequest: async (config: any) => {
      const cachedToken = await AsyncStorage.getItem("token");

      if (cachedToken && config.headers) {
        const parsedToken = JSON.parse(cachedToken);

        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
  },
});
```

And then pass it to the provider:

```ts
const App = ({ children }) => {
  return (
    <RestClientProvider baseUrl="http://localhost:3000/api/" {...myOwnLogic()}>
      {children}
    </RestClientProvider>
  );
};
```

## Auto invalidation feature

Mutations are automatically invalidating the queries that shared the same path, to disable this, pass a falsy `autoInvalidation` in the `RestClientProvider`.

## Mutation properties

| Property        | Description                                                                                      | Required |
| --------------- | ------------------------------------------------------------------------------------------------ | -------- |
| path            | A string or a array of string that will be appended to the baseUrl.                              | true     |
| invalidatePaths | A array of strings that will be used to invalidate the queries after a successful mutation call. | false    |
| cacheResponse   | A object with the key that will be used to cache the response.                                   | false    |
| options         | A object with the options from react-query.                                                      | false    |

When calling the result of the build at component level, you can pass again theses properties, but all now will be optional.

And when calling the methods `mutateAsync` or `mutate` from mutation, you can pass the following properties:

| Property    | Description                                            | Required |
| ----------- | ------------------------------------------------------ | -------- |
| data        | A object with the data to be sent in the request body. | false    |
| appendToUrl | A string that will be appended to the baseUrl.         | false    |

## Query properties

| Property        | Description                                                                                      | Required |
| --------------- | ------------------------------------------------------------------------------------------------ | -------- |
| path            | A string or a array of string that will be appended to the baseUrl.                              | true     |
| invalidatePaths | A array of strings that will be used to invalidate the queries after a successful mutation call. | false    |
| cacheResponse   | A object with the key that will be used to cache the response.                                   | false    |
| options         | A object with the options from react-query.                                                      | false    |
| appendToUrl     | A string that will be appended to the baseUrl.                                                   | false    |
| params          | A object with the params that will be appended to the url.                                       | false    |

When calling the result of the build at component level, you can pass again theses properties, but all now will be optional.

## Provider properties

| Property         | Description                                                      | Required |
| ---------------- | ---------------------------------------------------------------- | -------- |
| baseUrl          | A string with the base url.                                      | true     |
| axiosConfig      | A object with the axios config.                                  | false    |
| clientConfig     | A object with the React-Query Client config.                     | false    |
| autoInvalidation | A boolean that will enable or disable auto invalidation.         | false    |
| interceptors     | A object with a few interceptors that will be attached to axios. | false    |

## Running the tests

```
yarn && yarn test
```

## Contributing

Feel free to submit a PR.

## Authors

- **[Caio Henrique](https://github.com/Coystark)**
- **[Marcel P Goes](https://github.com/glothos)**

See also the list of [contributors](https://github.com/quasardd/react-query-restful/graphs/contributors) who participated in this project.

Thanks to [Anurag Hazra](https://github.com/anuraghazra) for the TypeScript magic =).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
