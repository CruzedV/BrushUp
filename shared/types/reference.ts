export type TReferenceTags = {
  sex: TReferenceTag[];
  clothing: TReferenceTag[];
  pose: TReferenceTag[];
  view: TReferenceTag[];
}

export type TReferenceTag = {
  tag_id: string;
  name: string;
}