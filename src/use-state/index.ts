import * as vue from "vue";
import { Ref, DeepReadonly } from "vue";

const { readonly, ref } = vue;

export function useState<T>(
  initValue: T,
  mapValue: (current: T, next: T) => T = (_, next) => next,
): [
    Ref<DeepReadonly<T>>,

    {
      dispatch(next: T): void,
      reset(): void,
    },
] {
  const value = ref<T>(initValue) as Ref<T>;

  const dispatch = (next: T) => {
    value.value = mapValue(value.value, next);
  };

  const reset = () => dispatch(initValue);

  return [
    readonly(value),
    { dispatch, reset },
  ];
}
