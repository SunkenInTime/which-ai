import { VariantSwitcher } from "@/variants/with-taste-skill/haiku-5-5/source/components/variant-switcher";

export default function VariantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <VariantSwitcher />
    </>
  );
}
