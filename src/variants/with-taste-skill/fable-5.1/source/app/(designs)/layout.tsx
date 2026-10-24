import { Switcher } from "./switcher";

export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Switcher />
    </>
  );
}
