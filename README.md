# XtremeX Stremio Addon

Ready-to-deploy starter for **GitHub → Vercel → Stremio**.

## Included

- `manifest.json` endpoint
- Bangla Movies catalog
- Bangla Series catalog
- Anime catalog
- `catalog`, `meta`, and `stream` routes
- Provider adapter placeholders for:
  - BanglaPlex
  - Cinefreak
  - MovieBox
  - Anime

> Provider files intentionally contain no third-party scraping or protection-bypass logic.
> Add only streams/APIs you own or are authorized to use.

## Deploy

1. Upload all files to `helal-c/xtremex-stremio-addon`.
2. Open Vercel and import that GitHub repository.
3. Framework preset: **Other**.
4. No build command is required.
5. Deploy.
6. Test:
   `https://YOUR-PROJECT.vercel.app/manifest.json`
7. Add that manifest URL in Stremio.

## Expected first result

The addon will install and show the three XtremeX catalogs. They are empty until authorized provider data is connected.

## Provider adapter return shapes

### catalog()

Return an array of Stremio meta previews:

```js
[
  {
    id: "your:movie:123",
    type: "movie",
    name: "Example Movie",
    poster: "https://example.com/poster.jpg"
  }
]
```

### meta()

Return one full meta object or `null`.

### streams()

Return only authorized stream URLs:

```js
[
  {
    name: "XtremeX",
    title: "1080p",
    url: "https://your-authorized-host/video.mp4"
  }
]
```
