import type { Ref, DeepReadonly } from "vue";
import * as vue from "vue";

const { readonly, ref } = vue;

export function useState<T>(
  initValue: T,
  mapValue: (current: T, next: T) => T = (_, next) => next,
): [
    Ref<DeepReadonly<T>>,

    {
      dispatch(next: T): void,
      trigger(): void,
      reset(): void,
    },
] {
  const value = ref<T>(initValue) as Ref<T>;

  const dispatch = (next: T) => {
    value.value = mapValue(value.value, next);
  };

  const trigger = () => {
    value.value = mapValue(value.value, value.value);
  };

  const reset = () => {
    value.value = initValue;
  };

  return [
    readonly(value),
    { dispatch, reset, trigger },
  ];
}
