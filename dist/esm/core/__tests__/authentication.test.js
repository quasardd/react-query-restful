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
import { buildMutation } from "../mutations";
import { wrapper } from "./utils";
const mock = new MockAdapter(axios);
mock.onPost("/auth/sign-in").reply(200, {
    data: { user: { id: 1, name: "John Smith", accessToken: "123" } },
});
mock
    .onGet("/users/messages", undefined, expect.objectContaining({
    Authorization: "Bearer 123",
}))
    .reply(200);
const getUsersQuery = buildQuery({ path: "users" });
const { createMutation } = buildMutation({
    path: ["auth", "sign-in"],
    cacheResponse: { key: "user" },
});
describe("authentication", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mock.restore();
        yield AsyncStorage.removeItem("user");
    }));
    it("should authenticate yourself", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => createMutation(), {
            wrapper,
        });
        result.current.mutateAsync();
        yield waitForNextUpdate();
        expect(result.current.isSuccess).toBe(true);
    }));
    it("now should be able to fetch users/messages", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitFor } = renderHook(() => getUsersQuery({ appendToUrl: "/messages" }), { wrapper });
        yield waitFor(() => result.current.isSuccess);
        expect(result.current.status).toEqual("success");
    }));
});
//# sourceMappingURL=authentication.test.js.map