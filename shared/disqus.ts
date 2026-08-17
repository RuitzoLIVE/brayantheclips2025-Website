export const DISQUS_SHORTNAME = "brayantheclips2025";
export const DISQUS_EMBED_SCRIPT_ID = "disqus-embed-script";
export const DISQUS_PAGE_URL = "https://brayantheclips2025.manus.space/";

export interface DisqusPageConfig {
  identifier: string;
  title: string;
  url: string;
}

export interface DisqusConfigContext {
  page?: Partial<DisqusPageConfig>;
}

/**
 * Universal Code oficial: solo personaliza this.page para conservar
 * el identificador, título y URL canónica del hilo.
 */
export function createDisqusConfig(
  config: Omit<DisqusPageConfig, "url"> & { url?: string },
) {
  return function (this: DisqusConfigContext) {
    this.page = {
      ...(this.page ?? {}),
      identifier: config.identifier,
      title: config.title,
      url: config.url ?? DISQUS_PAGE_URL,
    };
  };
}

export function getDisqusEmbedUrl(shortname: string = DISQUS_SHORTNAME) {
  return `https://${shortname}.disqus.com/embed.js`;
}

export function getDisqusIframeUrl({
  identifier,
  title,
  url = DISQUS_PAGE_URL,
  shortname = DISQUS_SHORTNAME,
}: {
  identifier: string;
  title: string;
  url?: string;
  shortname?: string;
}) {
  const params = new URLSearchParams({
    base: "default",
    f: shortname,
    t_u: url,
    t_d: title,
    t_t: title,
    s_o: "default",
    t_i: identifier,
  });

  return `https://disqus.com/embed/comments/?${params.toString()}`;
}
