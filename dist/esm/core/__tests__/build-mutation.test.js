import { buildMutation } from "../mutations";
describe("buildMutation", () => {
    it("should build a mutation with only one path", () => {
        const { createUserMutation, deleteUserMutation, updateUserMutation, replaceUserMutation, } = buildMutation({
            path: "users",
        });
        expect(createUserMutation).toBeDefined();
        expect(deleteUserMutation).toBeDefined();
        expect(updateUserMutation).toBeDefined();
        expect(replaceUserMutation).toBeDefined();
    });
    it("should build a mutation with only one path as a array", () => {
        const { createUserMutation, deleteUserMutation, updateUserMutation, replaceUserMutation, } = buildMutation({
            path: ["users"],
        });
        expect(createUserMutation).toBeDefined();
        expect(deleteUserMutation).toBeDefined();
        expect(updateUserMutation).toBeDefined();
        expect(replaceUserMutation).toBeDefined();
    });
    it("should build a mutation with two paths", () => {
        const { createAuthMutation, deleteAuthMutation, updateAuthMutation, replaceAuthMutation, createSignInMutation, deleteSignInMutation, replaceSignInMutation, updateSignInMutation, } = buildMutation({
            path: ["auth", "sign-in"],
        });
        expect(createAuthMutation).toBeDefined();
        expect(deleteAuthMutation).toBeDefined();
        expect(updateAuthMutation).toBeDefined();
        expect(replaceAuthMutation).toBeDefined();
        expect(createSignInMutation).toBeDefined();
        expect(deleteSignInMutation).toBeDefined();
        expect(replaceSignInMutation).toBeDefined();
        expect(updateSignInMutation).toBeDefined();
    });
});
//# sourceMappingURL=build-mutation.test.js.map