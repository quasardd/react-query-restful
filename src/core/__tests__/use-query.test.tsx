import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildQuery } from "../queries";
import { wrapper } from "./utils";

const mock = new MockAdapter(axios);

mock.onGet("/users").reply(200, [{ id: 1, name: "John Smith" }]);
mock.onGet("/users/2").reply(200, { id: 2, name: "John Smith" });
mock.onGet("/users", { params: { page: 1 } }).reply(200);
mock.onGet("/users/vehicles").reply(200);
mock.onGet("/users/vehicles", { params: { page: 1 } }).reply(200);

const getReadUserQuery = buildQuery({ path: ["users", "[id]"] });
const getListUsersQuery = buildQuery({ path: ["users"] });

describe("useQuery", () => {
  afterAll(async () => {
    mock.restore();
    await AsyncStorage.removeItem("testKey");
  });

  it("should fetch GET /users", async () => {
    const { result, waitFor } = renderHook(() => getListUsersQuery(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual([{ id: 1, name: "John Smith" }]);
  });

  it("should fetch GET /users/2", async () => {
    const { result, waitFor } = renderHook(
      () => getReadUserQuery({ query: { id: 2 } }),
      { wrapper }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({ id: 2, name: "John Smith" });
  });

  it("should fetch GET /users with ?page=1", async () => {
    const { result, waitFor } = renderHook(
      () => getListUsersQuery({ params: { page: 1 } }),
      { wrapper }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toEqual(true);
  });

  it("should fetch GET /users/vehicles", async () => {
    const { result, waitFor } = renderHook(
      () => getListUsersQuery({ appendToUrl: "/vehicles" }),
      { wrapper }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toEqual(true);
  });

  it("should fetch GET /users/vehicles with ?page=1", async () => {
    const { result, waitFor } = renderHook(
      () =>
        getListUsersQuery({ appendToUrl: "/vehicles", params: { page: 1 } }),
      { wrapper }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toEqual(true);
  });

  it("should fetch GET /users and cache the response", async () => {
    const { result, waitFor } = renderHook(
      () =>
        getListUsersQuery({
          cacheResponse: { key: "testKey" },
        }),
      { wrapper }
    );

    await waitFor(() => result.current.isSuccess);

    const cachedResponse = await AsyncStorage.getItem("testKey");
    const parsedCachedResponse = JSON.parse(cachedResponse ?? "{}");

    expect(parsedCachedResponse).toEqual([{ id: 1, name: "John Smith" }]);
  });
});
