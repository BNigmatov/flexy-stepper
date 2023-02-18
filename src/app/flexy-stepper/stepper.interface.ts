export interface IFlexyStepperStep {
  key: string;
  title: string;
  component: any;
  // permissionsOnly?: string[];
}

export interface IFlexyStepperDone {
  payload?: any;
  goto?: string;
  is_checkpoint?: boolean;
  is_stop_back?: boolean;
}

export interface IFlexyStepperOptions {
  [otherKey: string]: any;
  localStorageKey?: string;
  is_not_auto_continue?: boolean;
  result?: 'back' | 'cancel' | 'success';
}
