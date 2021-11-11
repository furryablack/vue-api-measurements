import { Ref, DeepReadonly } from "vue";
import { useState } from "../use-state";

export function useFlag(initFlag = false): [
  Ref<DeepReadonly<boolean>>,

  {
    setTrue(): void,
    setFalse(): void,
    reset(): void,
    set(flag: boolean): void,
    toggle(): void
  },
] {
  const [flag, api] = useState<boolean>(initFlag);

  const flagApi = {
    setTrue: () => api.dispatch(true),
    setFalse: () => api.dispatch(false),
    set: (flag: boolean) => api.dispatch(flag),
    toggle: () => api.dispatch(!flag.value),
    reset: api.reset,
  };

  return [
    flag,
    flagApi,
  ];
}
