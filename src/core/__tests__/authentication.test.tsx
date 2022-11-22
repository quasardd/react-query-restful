import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildQuery } from "../queries";
import { buildMutation } from "../mutations";
import { wrapper } from "./utils";

const mock = new MockAdapter(axios);

mock.onPost("/auth/sign-in").reply(200, {
  data: { user: { id: 1, name: "John Smith", accessToken: "123" } },
});

mock
  .onGet(
    "/users/messages",
    undefined,
    expect.objectContaining({
      Authorization: "Bearer 123",
    })
  )
  .reply(200);

const getUsersQuery = buildQuery({ path: "users" });

const { createMutation } = buildMutation({
  path: ["auth", "sign-in"],
  cacheResponse: { key: "user" },
});

describe("authentication", () => {
  afterAll(async () => {
    mock.restore();
    await AsyncStorage.removeItem("user");
  });

  it("should authenticate yourself", async () => {
    const { result, waitForNextUpdate } = renderHook(() => createMutation(), {
      wrapper,
    });

    result.current.mutateAsync();

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
  });

  it("now should be able to fetch users/messages", async () => {
    const { result, waitFor } = renderHook(
      () => getUsersQuery({ appendToUrl: "/messages" }),
      { wrapper }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.status).toEqual("success");
  });
});
