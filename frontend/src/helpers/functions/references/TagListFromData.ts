import { TGenerator } from "@/types/references";

export function TagListFromData(
  formData: TGenerator
): string[] {
  const tagList = Object.values(formData);
  const filteredTagList = tagList.filter((tag) => tag != undefined);
  return filteredTagList;
}