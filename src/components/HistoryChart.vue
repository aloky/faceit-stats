<script>
	import { Line } from 'vue-chartjs'

	export default {
		extends: Line,
		props: ['data', 'options'],
		mounted () {
			this.renderChart({
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				datasets: [
					{
						label: 'GitHub Commits',
						backgroundColor: '#f87979',
						data: this.data
					}
				]
			})
		}
	}
</script>
