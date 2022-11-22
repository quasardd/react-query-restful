import { buildMutation } from "../mutations";

describe("buildMutation", () => {
  it("should build a mutation", () => {
    const { createMutation, deleteMutation, updateMutation, replaceMutation } =
      buildMutation({
        path: "users",
      });

    expect(createMutation).toBeDefined();
    expect(deleteMutation).toBeDefined();
    expect(updateMutation).toBeDefined();
    expect(replaceMutation).toBeDefined();
  });

  it("should create function with overrides", () => {
    const createOverride = jest.fn();
    const { createMutation } = buildMutation({
      path: ["auth", "sign-in"],
      overrides: {
        mutationFnOverrides: {
          create: createOverride,
        },
      },
    });
    expect(createMutation).toBeDefined();
  });
});
