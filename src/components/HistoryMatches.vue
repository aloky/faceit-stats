<template>
	<at-table
		:columns="columns"
		:data="historyMatches"
		size="large"
		:pagination="true"
	></at-table>
</template>

<script>
export default {
	props: {
		historyMatches: {
			type: Array,
			required: true
		}
	},
	data () {
		return {
			columns: [
				{
					title: 'Date',
					key: 'date'
				},
				{
					title: 'Result',
					render: (h, { item }) => {
						return h('div', {
							class: item.result.toLowerCase()
						}, item.result)
					}
				},
				{
					title: 'K/A/D',
					key: 'kad'
				},
				{
					title: 'Score',
					key: 'score'
				},
				{
					title: 'Map',
					key: 'map'
				},
				{
					title: 'Elo',
					key: 'elo'
				},
				{
					title: 'Team',
					key: 'team'
				},
				{
					title: 'View Room',
					render: (h, { item }) => {
						return h('div', [
							h('a', {
								attrs: {
									href: `https://www.faceit.com/en/csgo/room/${item.roomUrl}`,
									target: '_blank'
								}
							}, 'View'),
						])
					}
				}
			]
		}
	}
}
</script>
