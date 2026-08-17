import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(user: TrpcContext["user"] = null): TrpcContext {
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAuthenticatedUser(): AuthenticatedUser {
  const now = new Date();

  return {
    id: 987654,
    openId: "comments-test-user",
    email: "comments-test@example.com",
    name: "Comments Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  };
}

describe("comments router", () => {
  it("exposes a public list procedure that returns an array", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.comments.list();

    expect(Array.isArray(result)).toBe(true);
  });

  it("requires authentication to create a comment", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.comments.create({ content: "Comentario anónimo" }),
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects empty comments before reaching the database", async () => {
    const caller = appRouter.createCaller(
      createContext(createAuthenticatedUser()),
    );

    await expect(caller.comments.create({ content: "" })).rejects.toMatchObject({
      code: "BAD_REQUEST",
    });
  });

  it("rejects comments longer than 1000 characters", async () => {
    const caller = appRouter.createCaller(
      createContext(createAuthenticatedUser()),
    );

    await expect(
      caller.comments.create({ content: "x".repeat(1001) }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects comments containing only whitespace", async () => {
    const caller = appRouter.createCaller(
      createContext(createAuthenticatedUser()),
    );

    await expect(caller.comments.create({ content: "   \n\t" })).rejects.toMatchObject({
      code: "BAD_REQUEST",
    });
  });
});
