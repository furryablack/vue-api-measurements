# Vue 3 API measurements

```html
<template>
  <div>
    <button @click="flagApi.toggle">toggle</button>
  </div>
  <div v-if="flag">
    <button @click="add">add</button>
    <button @click="reset">reset</button>
    <ul>
      <li v-for="(item, index) of items" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useFlag, useState } from "vue-api-measurements";
  // or
  import { useFlag } from "vue-api-measurements/use-flag";
  import { useState } from "vue-api-measurements/use-state";

  const [flag, flagApi] = useFlag(true);
  const [items, { dispatch, reset }] = useState<Array<{ name: string }>>([]);

  const add = () => dispatch([...items.value, { name: "item" }]);
</script>
```

## Install

```bash
yarn add vue-api-measurements
```
or
```bash
npm install vue-api-measurements
```

## Methods

### **[useState]**

Dedicated state value. **useState\<T\>** gives two parameters:
- **initValue: T**: default _undefined_.
- **mapFn(current: T, next: T) => T**: default _(current, next) => next_ 

Returns **state** and **stateApi**.

- stateApi.dispatch(value)  
**value** will be passed to **mapFn** as the second argument _next_

- stateApi.reset()   
reset **state** to **initValue**

```ts
type Note = {
  id: number,
  title: string,
  content: string
}

function createNote() {
  // ... create Note here
}

const [notes, {dispatch, reset}] = useState<Array<Note[]>([]);
const add = () => dispatch([...notes.value, createNote()]);
```

### **[useFlag]**

On-off switcher. **useFlag** gives one _boolean_ parameter **initValue** (default _false_).  

Returns **flag** and **flagApi**.

```ts
// flag is false now
const [flag, flagApi] = useFlag()

// set true
flagApi.setTrue();

// set false
flagApi.setFalse();

// set manually true (or false)
flagApi.set(true);

// inverse flag
flagApi.toggle();

// reset to inital value
flagApi.reset();
```
