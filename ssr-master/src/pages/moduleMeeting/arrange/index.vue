<template>
  <div class="brand">
    <img :src="plan" alt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      plan: "",
      url: ""
    };
  },
  onLoad(v) {
    this.url = this.domains;
    this.init(v.id);
  },
  methods: {
    init(meeting_id) {
      this.axios
        .post({
          url: "/api/meeting/plan",
          data: { meeting_id: meeting_id }
        })
        .then(res => {
          if (res.data.status == "200") {
            res.data.data.plan_url = this.domains + res.data.data.plan_url;
            this.plan = res.data.data.plan_url;
          }
        });
    }
  }
};
</script>
<style scopecd>
</style>