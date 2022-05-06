import { QueryClient } from "react-query";

/**
 * Just testing some match patterns from react-query
 */

describe("invalidation", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.mount();
  });

  // not working
  it.skip("should invalidate", async () => {
    const queryFn = jest.fn();

    await queryClient.fetchQuery([["users"], "vehicles", { page: 1 }], queryFn);

    await queryClient.refetchQueries({ queryKey: "users" });

    expect(queryFn).toHaveBeenCalledTimes(2);
  });

  // not working
  it.skip("should invalidate", async () => {
    const queryFn = jest.fn();

    await queryClient.fetchQuery(["users/vehicles", { page: 1 }], queryFn);

    await queryClient.refetchQueries({ queryKey: ["users", "vehicles"] });

    expect(queryFn).toHaveBeenCalledTimes(2);
  });

  it("should invalidate", async () => {
    const queryFn = jest.fn();

    // GET { path: 'users', appendToUrl: "vehicles"}
    await queryClient.fetchQuery(["users/vehicles", { page: 1 }], queryFn);

    // POST { path: 'users', appendToUrl: "vehicles"}
    await queryClient.refetchQueries({ queryKey: "users/vehicles" });

    expect(queryFn).toHaveBeenCalledTimes(2);
  });
});
