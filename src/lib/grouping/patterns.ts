export interface GroupPattern {
  name: string;
  patterns: RegExp[];
}

export const DEFAULT_PATTERNS: GroupPattern[] = [
  { name: 'homepage', patterns: [/^\/$/] },
  { name: 'blog', patterns: [/^\/blog(\/|$)/, /^\/news(\/|$)/, /^\/articles?(\/|$)/, /^\/posts?(\/|$)/] },
  { name: 'product', patterns: [/^\/products?(\/|$)/, /^\/shop(\/|$)/, /^\/item(\/|$)/] },
  { name: 'category', patterns: [/^\/categor(y|ies)(\/|$)/, /^\/collections?(\/|$)/] },
  { name: 'tag', patterns: [/^\/tags?(\/|$)/] },
  { name: 'author', patterns: [/^\/authors?(\/|$)/, /^\/team(\/|$)/, /^\/staff(\/|$)/] },
  { name: 'page', patterns: [/^\/pages?(\/|$)/, /^\/(about|contact|faq|privacy|terms|imprint)(\/|$)/] },
  { name: 'documentation', patterns: [/^\/docs?(\/|$)/, /^\/help(\/|$)/, /^\/support(\/|$)/, /^\/knowledge-?base(\/|$)/] },
  { name: 'media', patterns: [/^\/media(\/|$)/, /^\/gallery(\/|$)/, /^\/images?(\/|$)/] },
  { name: 'legacy-page', patterns: [/\.(html?|php|aspx?|jsp)$/] },
];

export const PLATFORM_PATTERNS: Record<string, GroupPattern[]> = {
  wordpress: [
    ...DEFAULT_PATTERNS,
    { name: 'blog', patterns: [/^\/\d{4}\/\d{2}\//, /^\/archives?(\/|$)/] },
    { name: 'category', patterns: [/^\/category(\/|$)/] },
    { name: 'tag', patterns: [/^\/tag(\/|$)/] },
    { name: 'author', patterns: [/^\/author(\/|$)/] },
    { name: 'page', patterns: [/^\/page\/\d+/] },
  ],
  shopify: [
    ...DEFAULT_PATTERNS,
    { name: 'product', patterns: [/^\/products(\/|$)/] },
    { name: 'category', patterns: [/^\/collections(\/|$)/] },
    { name: 'page', patterns: [/^\/pages(\/|$)/] },
    { name: 'blog', patterns: [/^\/blogs?(\/|$)/] },
  ],
  webflow: [
    ...DEFAULT_PATTERNS,
    { name: 'blog', patterns: [/^\/blog(\/|$)/, /^\/post(\/|$)/] },
    { name: 'page', patterns: [/^\/[a-z0-9-]+$/] },
  ],
  framer: [
    ...DEFAULT_PATTERNS,
    { name: 'page', patterns: [/^\/[a-z0-9-]+$/] },
  ],
};
