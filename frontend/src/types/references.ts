import { TReferenceTag } from "@shared/types/reference";

export type TGenerator = {
  sex: undefined | TReferenceTag | string;
  clothing: undefined | boolean | string;
  pose: undefined | TReferenceTag | string;
  view: undefined | TReferenceTag | string;
  timer: undefined | TGeneratorTimer | string;
};

// В секундах
export type TGeneratorTimer = 30 | 60 | 120 | 300 | 600 | 1800 | 3600;

export type TTimerOption = {
  tag_id: string;
  name: string;
  value: TGeneratorTimer;
}