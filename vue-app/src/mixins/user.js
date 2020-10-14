import { mapGetters } from 'vuex';

import { USER_GETTERS_USER } from '@/store';

export default {
  name: 'user-mixin',
  computed: {
    ...mapGetters({
      user: USER_GETTERS_USER,
    }),
  },
};
