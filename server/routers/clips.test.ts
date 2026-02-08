import { describe, expect, it } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("clips router", () => {
  it("should return clip stats for twitch platform", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.clips.getClipStats({
      clipId: "test-clip-1",
      platform: "twitch",
    });

    expect(result).toHaveProperty("views");
    expect(result).toHaveProperty("likes");
    expect(result).toHaveProperty("shares");
    expect(result.platform).toBe("twitch");
    expect(result.views).toBeGreaterThan(0);
    expect(result.likes).toBeGreaterThan(0);
  });

  it("should return clip stats for youtube platform", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.clips.getClipStats({
      clipId: "test-video-1",
      platform: "youtube",
    });

    expect(result).toHaveProperty("views");
    expect(result).toHaveProperty("likes");
    expect(result).toHaveProperty("comments");
    expect(result.platform).toBe("youtube");
    expect(result.views).toBeGreaterThan(0);
    expect(result.likes).toBeGreaterThan(0);
  });

  it("should return aggregated stats for all clips", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.clips.getAllClipsStats();

    expect(result).toHaveProperty("totalClips");
    expect(result).toHaveProperty("totalViews");
    expect(result).toHaveProperty("totalLikes");
    expect(result).toHaveProperty("averageViews");
    expect(result.totalClips).toBe(10);
    expect(result.totalViews).toBe(651);
  });

  it("should return trending clips with default limit", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.clips.getTrendingClips({});

    expect(result).toHaveProperty("clips");
    expect(result).toHaveProperty("totalCount");
    expect(result).toHaveProperty("platform");
    expect(result.platform).toBe("all");
    expect(Array.isArray(result.clips)).toBe(true);
  });

  it("should return trending clips filtered by platform", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.clips.getTrendingClips({
      platform: "youtube",
      limit: 3,
    });

    expect(result.platform).toBe("youtube");
  });
});
