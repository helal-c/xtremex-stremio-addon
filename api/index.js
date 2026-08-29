import { manifest } from "../manifest.js";
import * as banglaplex from "../providers/banglaplex.js";
import * as cinefreak from "../providers/cinefreak.js";
import * as moviebox from "../providers/moviebox.js";
import * as anime from "../providers/anime.js";

const providers = [banglaplex, cinefreak, moviebox, anime];

function send(res, status, body, contentType = "application/json") {
  res.statusCode = status;
  res.setHeader("Content-Type", contentType);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Cache-Control", "public, max-age=300");
  res.end(contentType.includes("json") ? JSON.stringify(body) : body);
}

function parseExtra(raw = "") {
  try {
    return Object.fromEntries(new URLSearchParams(decodeURIComponent(raw)));
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    return res.end();
  }

  const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);
  const resource = url.searchParams.get("resource") || "home";
  const type = url.searchParams.get("type") || "";
  const id = url.searchParams.get("id") || "";
  const extra = parseExtra(url.searchParams.get("extra") || "");

  try {
    if (resource === "home") {
      return send(
        res,
        200,
        `XtremeX Stremio Addon is running.\nInstall: https://${req.headers.host}/manifest.json\n`,
        "text/plain; charset=utf-8"
      );
    }

    if (resource === "manifest") {
      return send(res, 200, manifest);
    }

    if (resource === "catalog") {
      const metas = [];
      for (const provider of providers) {
        const items = await provider.catalog({ type, id, extra });
        if (Array.isArray(items)) metas.push(...items);
      }
      return send(res, 200, { metas });
    }

    if (resource === "meta") {
      for (const provider of providers) {
        const item = await provider.meta({ type, id });
        if (item) return send(res, 200, { meta: item });
      }
      return send(res, 200, { meta: null });
    }

    if (resource === "stream") {
      const streams = [];
      for (const provider of providers) {
        const items = await provider.streams({ type, id });
        if (Array.isArray(items)) streams.push(...items);
      }
      return send(res, 200, { streams });
    }

    return send(res, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    return send(res, 500, { error: "Internal server error" });
  }
}
