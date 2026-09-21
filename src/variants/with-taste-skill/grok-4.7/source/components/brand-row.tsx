const brands = [
  { slug: "notion", name: "Notion" },
  { slug: "obsidian", name: "Obsidian" },
  { slug: "dropbox", name: "Dropbox" },
  { slug: "googledocs", name: "Google Docs" },
  { slug: "evernote", name: "Evernote" },
  { slug: "markdown", name: "Markdown" },
];

export function BrandRow() {
  return (
    <ul className="flex flex-wrap items-center gap-x-8 gap-y-5">
      {brands.map((brand) => (
        <li key={brand.slug}>
          <span
            role="img"
            aria-label={brand.name}
            className="block h-7 w-7 bg-current opacity-80"
            style={{
              maskImage: `url(/variants/with-taste-skill/grok-4.7/logos/${brand.slug}.svg)`,
              WebkitMaskImage: `url(/variants/with-taste-skill/grok-4.7/logos/${brand.slug}.svg)`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
        </li>
      ))}
    </ul>
  );
}
