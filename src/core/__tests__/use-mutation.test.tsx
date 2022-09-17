import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook } from "@testing-library/react-hooks";
import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { buildMutation } from "../mutations";
import { wrapper } from "./utils";

const mock = new MockAdapter(axios);

const vehiclesWheelsResponse = [
  {
    id: 0,
    vehicle: "Vehicle name",
  },
];

mock.onPost("/vehicles").reply(200);
mock.onPost("/vehicles/wheels").reply(200, vehiclesWheelsResponse);
mock.onDelete("/vehicles/1").reply(200);
mock.onPatch("/vehicles/2").reply(200);
mock.onPut("/vehicles/3").reply(200);

const { createMutation } = buildMutation({
  path: "vehicles",
});

const { updateMutation, replaceMutation, deleteMutation } = buildMutation({
  path: ["vehicles", "[id]"],
});

const customCreateSignature = jest
  .fn()
  .mockImplementation((_: AxiosInstance, data: any) => data);
const customUpdateSignature = jest
  .fn()
  .mockImplementation((_: AxiosInstance, data: any) => data);
const customReplaceSignature = jest
  .fn()
  .mockImplementation((_: AxiosInstance, data: any) => data);
const customDeleteSignature = jest
  .fn()
  .mockImplementation((_: AxiosInstance, data: any) => data);

const {
  createMutation: customCreate,
  updateMutation: customUpdate,
  replaceMutation: customReplace,
  deleteMutation: customDelete,
} = buildMutation({
  path: "vehicles",
  overrides: {
    mutationFnOverrides: {
      create: customCreateSignature,
      update: customUpdateSignature,
      replace: customReplaceSignature,
      delete: customDeleteSignature,
    },
  },
});

describe("useMutation", () => {
  afterAll(async () => {
    mock.restore();
    await AsyncStorage.removeItem("wheels");
  });

  it("should fetch POST /vehicles", async () => {
    const { result, waitForNextUpdate } = renderHook(() => createMutation(), {
      wrapper,
    });

    result.current.mutateAsync();

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
  });

  it("should fetch POST /vehicles/wheels and cache the response", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () =>
        createMutation({
          appendToUrl: "/wheels",
          cacheResponse: { key: "wheels" },
        }),
      {
        wrapper,
      }
    );

    result.current.mutateAsync();

    await waitForNextUpdate();

    const cachedWheels = await AsyncStorage.getItem("wheels");
    const parsedCachedWheels = JSON.parse(cachedWheels ?? "{}");

    expect(parsedCachedWheels).toEqual(vehiclesWheelsResponse);
  });

  it("should fetch DELETE /vehicles/1", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => deleteMutation({ query: { id: 1 } }),
      {
        wrapper,
      }
    );

    result.current.mutateAsync();

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
  });

  it("should fetch PATCH /vehicles/2", async () => {
    const { result, waitForNextUpdate } = renderHook(() => updateMutation(), {
      wrapper,
    });

    result.current.mutateAsync({
      query: {
        id: 2,
      },
    });

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
  });

  it("should fetch PUT /vehicles/3", async () => {
    const { result, waitForNextUpdate } = renderHook(() => replaceMutation(), {
      wrapper,
    });

    result.current.mutateAsync({ query: { id: 3 } });

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
  });

  it("should use overriden create function when provided", async () => {
    const payload = {
      name: "Vehicle name",
    };
    const { result, waitForNextUpdate } = renderHook(
      () =>
        customCreate({
          options: {
            onSuccess: (data) => {
              expect(data).toBe(payload);
            },
          },
        }),
      {
        wrapper,
      }
    );
    result.current.mutateAsync({ data: payload });
    await waitForNextUpdate();
    expect(customCreateSignature).toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(true);
  });
  it("should use overriden update function when provided", async () => {
    const payload = {
      name: "Vehicle name",
    };
    const { result, waitForNextUpdate } = renderHook(
      () =>
        customUpdate({
          options: {
            onSuccess: (data) => {
              expect(data).toBe(payload);
            },
          },
        }),
      {
        wrapper,
      }
    );
    result.current.mutateAsync({ data: payload });
    await waitForNextUpdate();
    expect(customUpdateSignature).toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(true);
  });

  it("should use overriden replace function when provided", async () => {
    const payload = {
      name: "Vehicle name",
    };
    const { result, waitForNextUpdate } = renderHook(
      () =>
        customReplace({
          options: {
            onSuccess: (data) => {
              expect(data).toBe(payload);
            },
          },
        }),
      {
        wrapper,
      }
    );
    result.current.mutateAsync({ data: payload });
    await waitForNextUpdate();
    expect(customReplaceSignature).toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(true);
  });

  it("should use overriden delete function when provided", async () => {
    const payload = {
      name: "Vehicle name",
    };
    const { result, waitForNextUpdate } = renderHook(
      () =>
        customDelete({
          options: {
            onSuccess: (data) => {
              expect(data).toBe(payload);
            },
          },
        }),
      {
        wrapper,
      }
    );
    result.current.mutateAsync({ data: payload });
    await waitForNextUpdate();
    expect(customDeleteSignature).toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(true);
  });
});
