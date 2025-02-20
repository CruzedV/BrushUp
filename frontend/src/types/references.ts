export type TGenerator = {
  sex: null | ESex;
  clothing: null | boolean;
  pose: null | EPose;
  view: EView;
  timer: null | ETimer;
};

// В секундах
export enum ETimer {
  halfMinute = 30,
  minute =  60, 
  twoMinutes = 120, 
  fiveMinutes = 300,
  tenMinutes = 600,
  halfHour = 1800,
  hour = 3600,
};

export enum ESex {
  male = 'male',
  female = 'female',
};

export enum EPose {
  action = 'action',
  stationary = 'stationary',
};

export enum EView {
  front = 'front',
  side = 'side',
  back = 'back',
  another = 'another',
};
