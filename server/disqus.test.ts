import { describe, expect, it } from "vitest";
import {
  DISQUS_PAGE_URL,
  DISQUS_SHORTNAME,
  createDisqusConfig,
  getDisqusEmbedUrl,
  getDisqusIframeUrl,
} from "../shared/disqus";

describe("Disqus configuration", () => {
  it("uses the configured shortname to build the embed script URL", () => {
    expect(DISQUS_SHORTNAME).toBe("brayantheclips2025");
    expect(DISQUS_PAGE_URL).toBe("https://brayantheclips2025.manus.space/");
    expect(getDisqusEmbedUrl()).toBe(
      "https://brayantheclips2025.disqus.com/embed.js",
    );
  });

  it("supports an explicit shortname for reusable integrations", () => {
    expect(getDisqusEmbedUrl("example-site")).toBe(
      "https://example-site.disqus.com/embed.js",
    );
  });

  it("builds a direct iframe URL with canonical Disqus metadata", () => {
    const iframeUrl = getDisqusIframeUrl({
      identifier: "brayantheclips2025-home",
      title: "Los mejores clips de Brayan 2025",
    });
    const parsed = new URL(iframeUrl);

    expect(parsed.origin).toBe("https://disqus.com");
    expect(parsed.pathname).toBe("/embed/comments/");
    expect(parsed.searchParams.get("f")).toBe(DISQUS_SHORTNAME);
    expect(parsed.searchParams.get("t_i")).toBe("brayantheclips2025-home");
    expect(parsed.searchParams.get("t_u")).toBe(DISQUS_PAGE_URL);
    expect(parsed.searchParams.get("t_d")).toBe("Los mejores clips de Brayan 2025");
  });

  it("builds the official Universal Code page configuration", () => {
    const context: Parameters<ReturnType<typeof createDisqusConfig>>[0] = {};
    const config = createDisqusConfig({
      identifier: "brayantheclips2025-home",
      title: "Los mejores clips de Brayan 2025",
    });

    config.call(context);

    expect(context.page).toEqual({
      identifier: "brayantheclips2025-home",
      title: "Los mejores clips de Brayan 2025",
      url: DISQUS_PAGE_URL,
    });
    expect(context).not.toHaveProperty("forum");
  });
});
