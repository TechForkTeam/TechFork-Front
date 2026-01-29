import { TAG_CATEGORY_MAP, TAG_MAP } from "../constants/tag";

export function TagCodeToLabel(
  serverCategory: string,
  codes: string[],
): string[] {
  const clientCategory =
    TAG_CATEGORY_MAP[serverCategory as keyof typeof TAG_CATEGORY_MAP];

  if (!clientCategory) return codes;

  const tags = TAG_MAP[clientCategory];
  if (!tags) return codes;

  return codes.map(code => {
    const found = tags.find(tag => tag.code === code);
    return found?.label ?? code;
  });
}
