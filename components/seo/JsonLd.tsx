/**
 * JsonLd
 * ======
 * Renders a schema.org object as an inline <script type="application/ld+json">.
 * This is the Next.js App Router recommended pattern for structured data: a
 * plain script node in the component tree, serialized on the server, invisible
 * to users but read by search and AI crawlers.
 *
 * `data` is a trusted, code-authored object (see lib/schema.ts), never user
 * input, so JSON.stringify is safe to inject.
 */

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
