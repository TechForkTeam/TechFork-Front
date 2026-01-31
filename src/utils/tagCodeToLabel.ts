import { TAG_CATEGORY_MAP, TAG_MAP } from "../constants/tag";

//서버=>ui 변환용
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

//ui=>서버 변환용
export function TagLabelToCode(label: string): string {
  for (const category of Object.values(TAG_MAP)) {
    const found = category.find(tag => tag.label === label);
    if (found) return found.code;
  }
  return label;
}
