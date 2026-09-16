import withoutAstraPreview from "@/variants/without-design-skill/gpt-6-astra-preview";
import withAstraPreview from "@/variants/with-design-skill/gpt-6-astra-preview";
import withTasteAstraPreview from "@/variants/with-taste-skill/gpt-6-astra-preview";
import miscAstraPreview from "@/variants/miscellaneous/gpt-6-astra-preview";
import withoutMimo from "@/variants/without-design-skill/mimo-x-pro-preview";
import withMimo from "@/variants/with-design-skill/mimo-x-pro-preview";
import withTasteMimo from "@/variants/with-taste-skill/mimo-x-pro-preview";
import withoutMimoFlash from "@/variants/without-design-skill/mimo-x-flash-preview";
import withMimoFlash from "@/variants/with-design-skill/mimo-x-flash-preview";
import withTasteMimoFlash from "@/variants/with-taste-skill/mimo-x-flash-preview";
import type { GalleryGroupSlug, ModelSlug, VariantModule } from "@/lib/gallery-types";
import withAstra from "@/variants/with-design-skill/gpt-6-astra";
import withTasteAstra from "@/variants/with-taste-skill/gpt-6-astra";
import withoutAstra from "@/variants/without-design-skill/gpt-6-astra";
import withComposer15 from "@/variants/with-design-skill/composer-1.5";
import withComposer20 from "@/variants/with-design-skill/composer-2.0";
import withComposer25 from "@/variants/with-design-skill/composer-2.5";
import withFable from "@/variants/with-design-skill/fable";
import withFable51 from "@/variants/with-design-skill/fable-5.1";
import withGemini from "@/variants/with-design-skill/gemini";
import withGemini35Flash from "@/variants/with-design-skill/gemini-3.5-flash";
import withGemini37Flash from "@/variants/with-design-skill/gemini-3.7-flash";
import withGemini38Flash from "@/variants/with-design-skill/gemini-3.8-flash";
import withGrok45 from "@/variants/with-design-skill/grok-4.5";
import withGrok46 from "@/variants/with-design-skill/grok-4.6";
import withGpt54 from "@/variants/with-design-skill/gpt-5.4";
import withGpt55Low from "@/variants/with-design-skill/gpt-5.5-low";
import withGpt55High from "@/variants/with-design-skill/gpt-5.5-high";
import withKimi from "@/variants/with-design-skill/kimi-k-2.5";
import withKimi26 from "@/variants/with-design-skill/kimi-k-2.6";
import withKimiK3 from "@/variants/with-design-skill/kimi-k3";
import withOpus from "@/variants/with-design-skill/opus-4.6";
import withOpus47 from "@/variants/with-design-skill/opus-4.7";
import withOpus48 from "@/variants/with-design-skill/opus-4.8";
import withOpus5 from "@/variants/with-design-skill/opus-5";
import withGlm53Flash from "@/variants/with-design-skill/glm-5.3-flash";
import withGlm5Turbo from "@/variants/with-design-skill/glm-5-turbo";
import withGlm51 from "@/variants/with-design-skill/glm-5.1";
import withGlm52 from "@/variants/with-design-skill/glm-5.2";
import withSonnet5 from "@/variants/with-design-skill/sonnet-5";
import withSol from "@/variants/with-design-skill/sol";
import withLuna from "@/variants/with-design-skill/luna";
import withTerra from "@/variants/with-design-skill/terra";
import withMuseSpark12 from "@/variants/with-design-skill/muse-spark-1.2";
import withMuseSpark13 from "@/variants/with-design-skill/muse-spark-1.3";
import withSwe2 from "@/variants/with-design-skill/swe-2";
import withTasteFable from "@/variants/with-taste-skill/fable";
import withTasteFable51 from "@/variants/with-taste-skill/fable-5.1";
import withTasteGrok45 from "@/variants/with-taste-skill/grok-4.5";
import withTasteGrok46 from "@/variants/with-taste-skill/grok-4.6";
import withTasteKimiK3 from "@/variants/with-taste-skill/kimi-k3";
import withTasteGlm52 from "@/variants/with-taste-skill/glm-5.2";
import withTasteSonnet5 from "@/variants/with-taste-skill/sonnet-5";
import withTasteSol from "@/variants/with-taste-skill/sol";
import withTasteLuna from "@/variants/with-taste-skill/luna";
import withTasteTerra from "@/variants/with-taste-skill/terra";
import withTasteOpus5 from "@/variants/with-taste-skill/opus-5";
import withTasteGlm53Flash from "@/variants/with-taste-skill/glm-5.3-flash";
import withTasteMuseSpark12 from "@/variants/with-taste-skill/muse-spark-1.2";
import withTasteMuseSpark13 from "@/variants/with-taste-skill/muse-spark-1.3";
import withTasteGemini37Flash from "@/variants/with-taste-skill/gemini-3.7-flash";
import withTasteGemini38Flash from "@/variants/with-taste-skill/gemini-3.8-flash";
import withTasteSwe2 from "@/variants/with-taste-skill/swe-2";
import withUiShComposer20 from "@/variants/with-ui-sh-skill/composer-2.0";
import withUiShGpt55Low from "@/variants/with-ui-sh-skill/gpt-5.5-low";
import withUiShGpt55High from "@/variants/with-ui-sh-skill/gpt-5.5-high";
import withUiShOpus47 from "@/variants/with-ui-sh-skill/opus-4.7";
import miscGpt54 from "@/variants/miscellaneous/gpt-5.4";
import withoutComposer15 from "@/variants/without-design-skill/composer-1.5";
import withoutComposer20 from "@/variants/without-design-skill/composer-2.0";
import withoutComposer25 from "@/variants/without-design-skill/composer-2.5";
import withoutFable from "@/variants/without-design-skill/fable";
import withoutFable51 from "@/variants/without-design-skill/fable-5.1";
import withoutGemini from "@/variants/without-design-skill/gemini";
import withoutGemini35Flash from "@/variants/without-design-skill/gemini-3.5-flash";
import withoutGemini37Flash from "@/variants/without-design-skill/gemini-3.7-flash";
import withoutGemini38Flash from "@/variants/without-design-skill/gemini-3.8-flash";
import withoutGrok45 from "@/variants/without-design-skill/grok-4.5";
import withoutGrok46 from "@/variants/without-design-skill/grok-4.6";
import withoutGpt54 from "@/variants/without-design-skill/gpt-5.4";
import withoutGpt55Low from "@/variants/without-design-skill/gpt-5.5-low";
import withoutGpt55High from "@/variants/without-design-skill/gpt-5.5-high";
import withoutKimi from "@/variants/without-design-skill/kimi-k-2.5";
import withoutKimi26 from "@/variants/without-design-skill/kimi-k-2.6";
import withoutKimiK3 from "@/variants/without-design-skill/kimi-k3";
import withoutOpus from "@/variants/without-design-skill/opus-4.6";
import withoutOpus47 from "@/variants/without-design-skill/opus-4.7";
import withoutOpus48 from "@/variants/without-design-skill/opus-4.8";
import withoutOpus5 from "@/variants/without-design-skill/opus-5";
import withoutGlm53Flash from "@/variants/without-design-skill/glm-5.3-flash";
import withoutGlm5Turbo from "@/variants/without-design-skill/glm-5-turbo";
import withoutGlm51 from "@/variants/without-design-skill/glm-5.1";
import withoutGlm52 from "@/variants/without-design-skill/glm-5.2";
import withoutSonnet5 from "@/variants/without-design-skill/sonnet-5";
import withoutSol from "@/variants/without-design-skill/sol";
import withoutLuna from "@/variants/without-design-skill/luna";
import withoutTerra from "@/variants/without-design-skill/terra";
import withoutMuseSpark12 from "@/variants/without-design-skill/muse-spark-1.2";
import withoutMuseSpark13 from "@/variants/without-design-skill/muse-spark-1.3";
import withoutSwe2 from "@/variants/without-design-skill/swe-2";

import withUnionAlpha from "@/variants/with-design-skill/union-alpha";
import withTasteUnionAlpha from "@/variants/with-taste-skill/union-alpha";
import withoutUnionAlpha from "@/variants/without-design-skill/union-alpha";

type RegistryKey = `${GalleryGroupSlug}:${ModelSlug}`;

const registry: Partial<Record<RegistryKey, VariantModule>> = {
  "without-design-skill:union-alpha": withoutUnionAlpha,
  "with-taste-skill:union-alpha": withTasteUnionAlpha,
  "with-design-skill:union-alpha": withUnionAlpha,
  "with-taste-skill:mimo-x-flash-preview": withTasteMimoFlash,
  "with-design-skill:mimo-x-flash-preview": withMimoFlash,
  "without-design-skill:mimo-x-flash-preview": withoutMimoFlash,
  "with-taste-skill:mimo-x-pro-preview": withTasteMimo,
  "with-design-skill:mimo-x-pro-preview": withMimo,
  "without-design-skill:mimo-x-pro-preview": withoutMimo,
  "with-design-skill:gpt-6-astra": withAstra,
  "with-taste-skill:gpt-6-astra": withTasteAstra,
  "without-design-skill:gpt-6-astra": withoutAstra,

  "without-design-skill:gpt-6-astra-preview": withoutAstraPreview,
  "with-design-skill:gpt-6-astra-preview": withAstraPreview,
  "with-taste-skill:gpt-6-astra-preview": withTasteAstraPreview,
  "miscellaneous:gpt-6-astra-preview": miscAstraPreview,
  "with-design-skill:composer-1.5": withComposer15,
  "with-design-skill:composer-2.0": withComposer20,
  "with-design-skill:composer-2.5": withComposer25,
  "with-design-skill:fable": withFable,
  "with-design-skill:fable-5.1": withFable51,
  "with-design-skill:gemini": withGemini,
  "with-design-skill:gemini-3.5-flash": withGemini35Flash,
  "with-design-skill:gemini-3.7-flash": withGemini37Flash,
  "with-design-skill:gemini-3.8-flash": withGemini38Flash,
  "with-design-skill:grok-4.5": withGrok45,
  "with-design-skill:grok-4.6": withGrok46,
  "with-design-skill:gpt-5.4": withGpt54,
  "with-design-skill:gpt-5.5-low": withGpt55Low,
  "with-design-skill:gpt-5.5-high": withGpt55High,
  "with-design-skill:kimi-k-2.5": withKimi,
  "with-design-skill:kimi-k-2.6": withKimi26,
  "with-design-skill:kimi-k3": withKimiK3,
  "with-design-skill:opus-4.6": withOpus,
  "with-design-skill:opus-4.7": withOpus47,
  "with-design-skill:opus-4.8": withOpus48,
  "with-design-skill:opus-5": withOpus5,
  "with-design-skill:glm-5.3-flash": withGlm53Flash,
  "with-design-skill:glm-5-turbo": withGlm5Turbo,
  "with-design-skill:glm-5.1": withGlm51,
  "with-design-skill:glm-5.2": withGlm52,
  "with-design-skill:sonnet-5": withSonnet5,
  "with-design-skill:sol": withSol,
  "with-design-skill:luna": withLuna,
  "with-design-skill:terra": withTerra,
  "with-design-skill:muse-spark-1.2": withMuseSpark12,
  "with-design-skill:muse-spark-1.3": withMuseSpark13,
  "with-design-skill:swe-2": withSwe2,
  "with-taste-skill:fable": withTasteFable,
  "with-taste-skill:fable-5.1": withTasteFable51,
  "with-taste-skill:grok-4.5": withTasteGrok45,
  "with-taste-skill:grok-4.6": withTasteGrok46,
  "with-taste-skill:kimi-k3": withTasteKimiK3,
  "with-taste-skill:glm-5.2": withTasteGlm52,
  "with-taste-skill:sonnet-5": withTasteSonnet5,
  "with-taste-skill:sol": withTasteSol,
  "with-taste-skill:luna": withTasteLuna,
  "with-taste-skill:terra": withTasteTerra,
  "with-taste-skill:opus-5": withTasteOpus5,
  "with-taste-skill:glm-5.3-flash": withTasteGlm53Flash,
  "with-taste-skill:muse-spark-1.2": withTasteMuseSpark12,
  "with-taste-skill:muse-spark-1.3": withTasteMuseSpark13,
  "with-taste-skill:gemini-3.7-flash": withTasteGemini37Flash,
  "with-taste-skill:gemini-3.8-flash": withTasteGemini38Flash,
  "with-taste-skill:swe-2": withTasteSwe2,
  "with-ui-sh-skill:composer-2.0": withUiShComposer20,
  "with-ui-sh-skill:gpt-5.5-low": withUiShGpt55Low,
  "with-ui-sh-skill:gpt-5.5-high": withUiShGpt55High,
  "with-ui-sh-skill:opus-4.7": withUiShOpus47,
  "miscellaneous:gpt-5.4": miscGpt54,
  "without-design-skill:composer-1.5": withoutComposer15,
  "without-design-skill:composer-2.0": withoutComposer20,
  "without-design-skill:composer-2.5": withoutComposer25,
  "without-design-skill:fable": withoutFable,
  "without-design-skill:fable-5.1": withoutFable51,
  "without-design-skill:gemini": withoutGemini,
  "without-design-skill:gemini-3.5-flash": withoutGemini35Flash,
  "without-design-skill:gemini-3.7-flash": withoutGemini37Flash,
  "without-design-skill:gemini-3.8-flash": withoutGemini38Flash,
  "without-design-skill:grok-4.5": withoutGrok45,
  "without-design-skill:grok-4.6": withoutGrok46,
  "without-design-skill:gpt-5.4": withoutGpt54,
  "without-design-skill:gpt-5.5-low": withoutGpt55Low,
  "without-design-skill:gpt-5.5-high": withoutGpt55High,
  "without-design-skill:kimi-k-2.5": withoutKimi,
  "without-design-skill:kimi-k-2.6": withoutKimi26,
  "without-design-skill:kimi-k3": withoutKimiK3,
  "without-design-skill:opus-4.6": withoutOpus,
  "without-design-skill:opus-4.7": withoutOpus47,
  "without-design-skill:opus-4.8": withoutOpus48,
  "without-design-skill:opus-5": withoutOpus5,
  "without-design-skill:glm-5.3-flash": withoutGlm53Flash,
  "without-design-skill:glm-5-turbo": withoutGlm5Turbo,
  "without-design-skill:glm-5.1": withoutGlm51,
  "without-design-skill:glm-5.2": withoutGlm52,
  "without-design-skill:sonnet-5": withoutSonnet5,
  "without-design-skill:sol": withoutSol,
  "without-design-skill:luna": withoutLuna,
  "without-design-skill:terra": withoutTerra,
  "without-design-skill:muse-spark-1.2": withoutMuseSpark12,
  "without-design-skill:muse-spark-1.3": withoutMuseSpark13,
  "without-design-skill:swe-2": withoutSwe2,
};

export function getVariantModule(group: GalleryGroupSlug, model: ModelSlug) {
  return registry[`${group}:${model}`];
}
