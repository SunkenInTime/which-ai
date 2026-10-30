import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-taste-skill/deepseek-v4-1-flash/source/app/layout";
import Page1 from "@/variants/with-taste-skill/deepseek-v4-1-flash/source/app/1/page";
import Page2 from "@/variants/with-taste-skill/deepseek-v4-1-flash/source/app/2/page";
import Page3 from "@/variants/with-taste-skill/deepseek-v4-1-flash/source/app/3/page";
import Page4 from "@/variants/with-taste-skill/deepseek-v4-1-flash/source/app/4/page";
import Page5 from "@/variants/with-taste-skill/deepseek-v4-1-flash/source/app/5/page";

const pages = { "1": Page1, "2": Page2, "3": Page3, "4": Page4, "5": Page5 } as const;

type Credit = { text: string; href: string };

// The model credited every licensed picture on /5 but left some uncredited on /1 to /4. Those pages use Creative
// Commons media that requires attribution, so the gallery lists every licensed item each page uses below the
// model's page, instead of editing the page. Source: the skill's public/img/credits.json in the original project.
const CREDITS: Record<string, Credit> = {
  catalog2: {
    text: "\"Card Catalog 2\" by mamsy (flickr.com/photos/mamsy), CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Card_Catalog_2.jpg",
  },
  indiana: {
    text: "\"Card catalog at the Indiana State Library - cabinet exterior\" by TBurmeister (WMF), CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_cabinet_exterior.jpg",
  },
  murmansk: {
    text: "\"Card catalogs in Murmansk Regional Scientific Library, 2018\" by FingerWiki, CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Card_catalogs_in_Murmansk_Regional_Scientific_Library,_2018.jpg",
  },
  typewriter: {
    text: "\"Olivetti Dora portable typewriter\" by Erik Pålsson, CC BY 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Olivetti_Dora_portable_typewriter.webm",
  },
  trobe: {
    text: "\"Trobe Reading Room State Library of Victoria interior\" by Bhullargraphic, CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Trobe_Reading_Room_State_Library_of_Victoria_interior.jpg",
  },
  nypl: {
    text: "\"Reading Room - N.Y. Public Library - Schwarzman Bldg.\" by Bestbudbrian, CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Reading_Room_-_N.Y._Public_Library_-_Schwarzman_Bldg..jpg",
  },
};

const pageCredits: Partial<Record<keyof typeof pages, Credit[]>> = {
  "1": [CREDITS.catalog2, CREDITS.typewriter, CREDITS.trobe],
  "2": [CREDITS.catalog2, CREDITS.indiana, CREDITS.murmansk, CREDITS.typewriter, CREDITS.trobe],
  "3": [CREDITS.catalog2, CREDITS.indiana, CREDITS.typewriter, CREDITS.nypl, CREDITS.trobe],
  "4": [CREDITS.catalog2, CREDITS.murmansk, CREDITS.typewriter, CREDITS.trobe],
};

function GalleryCredits({ credits }: { credits: Credit[] }) {
  return (
    <aside
      data-gallery-credits
      style={{
        background: "#f3f3f1",
        color: "#3d3d3a",
        font: "12px/1.6 system-ui, sans-serif",
        padding: "16px 24px",
        borderTop: "1px solid #dcdcd8",
      }}
    >
      Picture credits, added by the gallery (via Wikimedia Commons):{" "}
      {credits.map((credit, i) => (
        <span key={credit.href}>
          <a href={credit.href} style={{ color: "inherit" }}>
            {credit.text}
          </a>
          {i < credits.length - 1 ? "; " : "."}
        </span>
      ))}
    </aside>
  );
}

const variant: VariantModule = {
  render({ iteration }) {
    const Page = pages[iteration];
    const credits = pageCredits[iteration];
    return (
      <RootLayout>
        <Page />
        {credits ? <GalleryCredits credits={credits} /> : null}
      </RootLayout>
    );
  },
};

export default variant;
