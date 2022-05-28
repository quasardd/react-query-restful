var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildQuery } from "../queries";
import { wrapper } from "./utils";
const mock = new MockAdapter(axios);
mock.onGet("/users").reply(200, [{ id: 1, name: "John Smith" }]);
mock.onGet("/users", { params: { page: 1 } }).reply(200);
mock.onGet("/users/vehicles").reply(200);
mock.onGet("/users/vehicles", { params: { page: 1 } }).reply(200);
const getUsersQuery = buildQuery({ path: "users" });
describe("useQuery", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mock.restore();
        yield AsyncStorage.removeItem("testKey");
    }));
    it("should fetch GET /users", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitFor } = renderHook(() => getUsersQuery(), { wrapper });
        yield waitFor(() => result.current.isSuccess);
        expect(result.current.data).toEqual([{ id: 1, name: "John Smith" }]);
    }));
    it("should fetch GET /users with ?page=1", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitFor } = renderHook(() => getUsersQuery({ params: { page: 1 } }), { wrapper });
        yield waitFor(() => result.current.isSuccess);
        expect(result.current.isSuccess).toEqual(true);
    }));
    it("should fetch GET /users/vehicles", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitFor } = renderHook(() => getUsersQuery({ appendToUrl: "vehicles" }), { wrapper });
        yield waitFor(() => result.current.isSuccess);
        expect(result.current.isSuccess).toEqual(true);
    }));
    it("should fetch GET /users/vehicles with ?page=1", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitFor } = renderHook(() => getUsersQuery({ appendToUrl: "vehicles", params: { page: 1 } }), { wrapper });
        yield waitFor(() => result.current.isSuccess);
        expect(result.current.isSuccess).toEqual(true);
    }));
    it("should fetch GET /users and cache the response", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitFor } = renderHook(() => getUsersQuery({
            cacheResponse: { key: "testKey" },
        }), { wrapper });
        yield waitFor(() => result.current.isSuccess);
        const cachedResponse = yield AsyncStorage.getItem("testKey");
        const parsedCachedResponse = JSON.parse(cachedResponse !== null && cachedResponse !== void 0 ? cachedResponse : "{}");
        expect(parsedCachedResponse).toEqual([{ id: 1, name: "John Smith" }]);
    }));
});
//# sourceMappingURL=use-query.test.js.map