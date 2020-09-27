<template>
  <div class="container">
    <h1>{{counter.title}}</h1>
    <h2>{{helloCounts}}</h2>

    <button type="button" @click="handleButtonClick">Plus</button>
  </div>
</template>

<style>
</style>


<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  watchEffect
} from "vue";

function useCounter(defaultCounts?: number) {
  const counts = ref<number>(defaultCounts || 0);
  const counter = reactive({
    title: "Hello",
    value: counts
  });

  const helloCounts = computed(() => "Hello Counts: " + counts.value);

  const increment = () => {
    counts.value++;
  };

  watch(counts, (v, ov) => {
    console.log(`counts has been changed. ${ov} -> ${v}`);
  });

  watch(
    () => counter.value,
    (v, ov) => {
      console.log(`counter has been changed. ${ov} -> ${v}`);
    }
  );

  watchEffect(() => {
    console.log("effected");
  });

  onBeforeMount(() => {
    console.log("hook before mount");
  });
  onMounted(() => {
    console.log("hook mounted");
  });

  return {
    counter,
    counts,
    helloCounts,
    increment
  };
}

const App = defineComponent({
  setup() {
    const { counter, counts, helloCounts, increment } = useCounter(0);

    return {
      counter,
      counts,
      helloCounts,
      increment
    };
  },

  methods: {
    handleButtonClick(e) {
      this.increment();
    }
  },

  beforeMount() {
    console.log("before mount");
  },
  mounted() {
    console.log("mounted");
  }
});

export default App;
</script>