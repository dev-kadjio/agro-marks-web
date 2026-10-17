import { notFound } from "next/navigation";
import { NOT_FOUND_SEGMENT } from "@/lib/routing/route-guard";

export function generateStaticParams() {
  return [{ rest: [NOT_FOUND_SEGMENT] }];
}

export default function CatchAllPage() {
  notFound();
}
