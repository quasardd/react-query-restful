var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const { createVehicleMutation, updateVehicleMutation, replaceVehicleMutation, deleteVehicleMutation, } = buildMutation({
    path: "vehicles",
});
describe("useMutation", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mock.restore();
        yield AsyncStorage.removeItem("wheels");
    }));
    it("should fetch POST /vehicles", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => createVehicleMutation(), {
            wrapper,
        });
        result.current.mutateAsync();
        yield waitForNextUpdate();
        expect(result.current.isSuccess).toBe(true);
    }));
    it("should fetch POST /vehicles/wheels and cache the response", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => createVehicleMutation({ cacheResponse: { key: "wheels" } }), {
            wrapper,
        });
        result.current.mutateAsync({ appendToUrl: "wheels" });
        yield waitForNextUpdate();
        const cachedWheels = yield AsyncStorage.getItem("wheels");
        const parsedCachedWheels = JSON.parse(cachedWheels !== null && cachedWheels !== void 0 ? cachedWheels : "{}");
        expect(parsedCachedWheels).toEqual(vehiclesWheelsResponse);
    }));
    it("should fetch DELETE /vehicles/1", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => deleteVehicleMutation(), {
            wrapper,
        });
        result.current.mutateAsync({ appendToUrl: "1" });
        yield waitForNextUpdate();
        expect(result.current.isSuccess).toBe(true);
    }));
    it("should fetch PATCH /vehicles/2", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => updateVehicleMutation(), {
            wrapper,
        });
        result.current.mutateAsync({ appendToUrl: "2" });
        yield waitForNextUpdate();
        expect(result.current.isSuccess).toBe(true);
    }));
    it("should fetch PUT /vehicles/3", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => replaceVehicleMutation(), {
            wrapper,
        });
        result.current.mutateAsync({ appendToUrl: "3" });
        yield waitForNextUpdate();
        expect(result.current.isSuccess).toBe(true);
    }));
});
//# sourceMappingURL=use-mutation.test.js.map