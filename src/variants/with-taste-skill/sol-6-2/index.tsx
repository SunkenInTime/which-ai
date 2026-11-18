import type { VariantModule } from "@/lib/gallery-types";
import { TasteSkillRuntime } from "@/components/gallery/taste-skill-runtime";
import RootLayout from "@/variants/with-taste-skill/sol-6-2/source/app/layout";
import { Landing } from "@/variants/with-taste-skill/sol-6-2/source/app/landing";
import { editions } from "@/variants/with-taste-skill/sol-6-2/source/app/editions";

// The source's /[edition] route renders <Landing edition={edition} />; the gallery renders the same component,
// plus TasteSkillRuntime, which starts the taste skill's motion modules the source loaded with next/script.
const variant: VariantModule = {
  render({ iteration }) {
    const edition = editions.find(({ id }) => id === iteration)!;
    return (
      <RootLayout>
        <Landing key={edition.id} edition={edition} />
        <TasteSkillRuntime base="/variants/with-taste-skill/sol-6-2/assets" design={edition.id} />
      </RootLayout>
    );
  },
};

export default variant;
