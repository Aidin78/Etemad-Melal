/** JSON for a `<script>` body: `<` is escaped so no text can close the tag */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
