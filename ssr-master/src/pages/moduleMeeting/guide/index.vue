<template>
  <div class="brand">
    <img :src="guide" alt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      guide: "",
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
          url: "/api/meeting/guide",
          data: { meeting_id: meeting_id }
        })
        .then(res => {
          if (res.data.status == "200") {
            res.data.data.guide_url = this.domains +  res.data.data.guide_url;
            this.guide = res.data.data.guide_url;
          }
        });
    }
  }
};
</script>
<style scopecd>
</style>