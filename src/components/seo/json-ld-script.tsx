import { serializeJsonLd, type JsonLdObject } from "@/lib/seo/json-ld";

export function JsonLdScript({ data }: { data: JsonLdObject | readonly JsonLdObject[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
