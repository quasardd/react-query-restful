var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QueryClient } from "react-query";
/**
 * Just testing some match patterns from react-query
 */
describe("invalidation", () => {
    let queryClient;
    beforeEach(() => {
        queryClient = new QueryClient();
        queryClient.mount();
    });
    // not working
    it.skip("should invalidate", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryFn = jest.fn();
        yield queryClient.fetchQuery([["users"], "vehicles", { page: 1 }], queryFn);
        yield queryClient.refetchQueries({ queryKey: "users" });
        expect(queryFn).toHaveBeenCalledTimes(2);
    }));
    // not working
    it.skip("should invalidate", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryFn = jest.fn();
        yield queryClient.fetchQuery(["users/vehicles", { page: 1 }], queryFn);
        yield queryClient.refetchQueries({ queryKey: ["users", "vehicles"] });
        expect(queryFn).toHaveBeenCalledTimes(2);
    }));
    it("should invalidate", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryFn = jest.fn();
        // GET { path: 'users', appendToUrl: "vehicles"}
        yield queryClient.fetchQuery(["users/vehicles", { page: 1 }], queryFn);
        // POST { path: 'users', appendToUrl: "vehicles"}
        yield queryClient.refetchQueries({ queryKey: "users/vehicles" });
        expect(queryFn).toHaveBeenCalledTimes(2);
    }));
});
//# sourceMappingURL=invalidation.test.js.map