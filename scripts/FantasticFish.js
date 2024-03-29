new Vue({
  el: "#app",
  data() {
    return {
      response: null,
			ip: null,
			useragent: null,
			ts: null
    };
  },
	watch: {
    response: function (){
      this.ip = this.response.substring(this.response.search('ip=')+3, this.response.search('ts='));
      this.ts = this.response.substring(this.response.search('ts=')+3, this.response.search('visit_scheme='));
			this.useragent = this.response.substring(this.response.search('uag=')+4, this.response.search('colo='));
    }
  },
	computed: {
    tsFormatted () {
			return new Date(this.ts * (100 * 10))
		}
  },
  mounted() {
    axios
    .get("https://www.cloudflare.com/cdn-cgi/trace")
      .then(response=> (this.response = response.data))
  }
});
