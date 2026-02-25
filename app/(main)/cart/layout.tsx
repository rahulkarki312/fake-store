

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Cart - Fake Store",
    template: "%s | Fake Store",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}