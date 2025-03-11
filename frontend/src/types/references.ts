import { TReferenceTag } from "@shared/types/reference";

export type TGenerator = {
  sex: null | TReferenceTag;
  clothing: null | boolean;
  pose: null | TReferenceTag;
  view: null | TReferenceTag;
  timer: null | TGeneratorTimer;
};

// В секундах
export type TGeneratorTimer = 30 | 60 | 120 | 300 | 600 | 1800 | 3600;

export type TTimerOption = {
  tag_id: string;
  name: string;
  value: TGeneratorTimer;
}