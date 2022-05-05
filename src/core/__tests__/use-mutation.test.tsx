import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
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

const {
  createVehicleMutation,
  updateVehicleMutation,
  replaceVehicleMutation,
  deleteVehicleMutation,
} = buildMutation({
  path: "vehicles",
});

describe("useMutation", () => {
  afterAll(async () => {
    mock.restore();
    await AsyncStorage.removeItem("wheels");
  });

  it("should fetch POST /vehicles", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => createVehicleMutation(),
      {
        wrapper,
      }
    );

    result.current.mutateAsync({});

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
  });

  it("should fetch POST /vehicles/wheels and cache the response", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => createVehicleMutation({ cacheResponse: { key: "wheels" } }),
      {
        wrapper,
      }
    );

    result.current.mutateAsync({ appendToUrl: "wheels" });

    await waitForNextUpdate();

    const cachedWheels = await AsyncStorage.getItem("wheels");
    const parsedCachedWheels = JSON.parse(cachedWheels ?? "{}");

    expect(parsedCachedWheels).toEqual(vehiclesWheelsResponse);
  });

  it("should fetch DELETE /vehicles/1", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => deleteVehicleMutation(),
      {
        wrapper,
      }
    );

    result.current.mutateAsync({ appendToUrl: "1" });

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
  });

  it("should fetch PATCH /vehicles/2", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => updateVehicleMutation(),
      {
        wrapper,
      }
    );

    result.current.mutateAsync({ appendToUrl: "2" });

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
  });

  it("should fetch PUT /vehicles/3", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => replaceVehicleMutation(),
      {
        wrapper,
      }
    );

    result.current.mutateAsync({ appendToUrl: "3" });

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
  });
});
