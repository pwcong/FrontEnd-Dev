export function buildOptionText(options) {
  return {
    name: 'option-text',
    props: ['value'],
    template: `
      <span class="option-text">{{ text }}</span>
    `,
    data() {
      return {
        text: ''
      };
    },
    created() {
      this.handleInit();
    },
    methods: {
      async handleInit() {
        let option;
        if (Array.isArray(options)) {
          option = options.find(o => o.value === this.value);
        } else {
          const result = await options(this, this.value);
          option = result.find(o => o.value === this.value);
        }

        this.text = option.text;
      }
    }
  };
}
