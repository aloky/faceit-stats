<template>
	<form class="content" @submit.prevent="getInfo">
		<div class="container flex flex-between">
			<at-input
				v-model="nickname"
				size="large"
				placeholder="Type nickname"
				class="search-input"
				required
			/>
			<at-button
				nativeType="submit"
				:disabled="!nickname.length"
			>
				Get Stats
			</at-button>
		</div>
		<player-stats
			v-if="player && playerStats && historyMatches"
			:player="player"
			:player-stats="playerStats"
			:history-matches="historyMatches"
		/>
	</form>
</template>

<script>
import PlayerStats from '../components/PlayerStats'

const api = 'https://open.faceit.com/data/v4/players'
const apiKey = '21a3c7e3-50be-4d4e-a565-d661b8f4d244'
const apiMatch = 'https://api.faceit.com/stats/api/v1/stats/time/users/'
const headers = { Authorization: `Bearer ${apiKey}` }

export default {
	components: {
		PlayerStats
	},
	data () {
		return {
			nickname: '',
			player: null,
			playerStats: null,
			historyMatches: []
		}
	},
	methods: {
		getInfo () {
			this.$Loading.start()
			this.axios.get(api, {
				params: {
					nickname: this.nickname,
					game: 'csgo'
				},
				headers
			})
				.then(({ data }) => {
					this.player = data
					this.axios.get(`${api}/${data.player_id}/stats/csgo`, { headers })
						.then(({ data }) => {
							this.playerStats = data
						})

					this.axios.get(`${apiMatch}${data.player_id}/games/csgo`, {
						params: {
							size: 150
						}
					})
						.then(({ data }) => {
							this.historyMatches = []
							data.forEach(item => {
								this.historyMatches.push({
									date: item.date,
									team: (item.i5).replace('team_', ''),
									elo: item.elo,
									score: item.i18,
									kad: `${item.i6}/${item.i7}/${item.i8}`,
									result: item.i10 === '1' ? 'Win' : 'Lost',
									map: item.i1,
									roomUrl: item.matchId
								})
							})
						})
				})
				.then(() => this.$Loading.finish())
		}
	}
}
</script>

<style>
.search-input {
	width: 100%;
	margin-right: 8px;
}
</style>
