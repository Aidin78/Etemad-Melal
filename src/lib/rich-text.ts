export type RichTextPart = { type: 'text'; value: string } | { type: 'link'; label: string; href: string };

const PANEL_HOST_PATTERN = /(?:Panel\.)?etemadmel(?:al|ad)\.com/gi;

/** Split paragraph text; panel hostnames become external links to panelUrl */
export function parsePanelLinks(paragraph: string, panelUrl: string): RichTextPart[] {
  const parts: RichTextPart[] = [];
  let lastIndex = 0;

  for (const match of paragraph.matchAll(PANEL_HOST_PATTERN)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      parts.push({ type: 'text', value: paragraph.slice(lastIndex, start) });
    }
    parts.push({ type: 'link', label: match[0], href: panelUrl });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < paragraph.length) {
    parts.push({ type: 'text', value: paragraph.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: 'text', value: paragraph }];
}
