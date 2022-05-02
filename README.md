# React Query REST Boilerplate

`react-query-rest-boilerplate` é apenas uma pequena coleção de funções que facilita a integração do React Query a uma REST API.

### Installing

Install with npm or yarn

npm:

```
npm i --save react-query-rest-boilerplate
```

yarn

```
yarn add react-query-rest-boilerplate
```

## Usage

```ts
import {
  BoilerplateQueryProvider,
  getSimpleJwtAuth,
  buildQuery,
} from "react-query-boilerplate";

export default function App() {
  return (
    <BoilerplateQueryProvider
      baseUrl="http://localhost:3000/api/"
      {...getSimpleJwtAuth("user", "data.user.accessToken")}
    >
      <Example />
    </BoilerplateQueryProvider>
  );
}

export const getUsersQuery = buildQuery({ path: "users" });

export const createUserMutation = createMutation({
  path: "users",
});

export const updateUserMutation = updateMutation({
  path: "users",
});

function Example() {
  // GET http://localhost:3000/api/users
  const { isLoading, error, data } = getUsersQuery();

  // GET http://localhost:3000/api/users/1/vehicles?page=1
  const { isLoading, error, data } = getUsersQuery({
    appendToUrl: "1/vehicles",
    params: {
      page: 1,
    },
    options: {
      // Options from react-query
      retry: 2,
    },
  });

  const createUser = createUserMutation({
    invalidatePaths: ["products"],
    options: {
      // Options from react-query
      retry: 2,
    },
  });

  const updateUser = updateUserMutation();

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  function handleSubmit() {
    // POST /users
    await createUser.mutateAsync({
      data: {
        name: "John Doe",
      },
    });

    /**
     * PATCH /users/1/vehicles {
     *  name: "John Doe"
     * }
     */
    await updateUser.mutateAsync({
      appendToUrl: "1/vehicles",
      data: {
        name: "John Doe",
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

## Authentication

> TODO: Explain authentication

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
