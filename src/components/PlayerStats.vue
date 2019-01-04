<template>
	<div>
		<div class="player-container" :style="{ backgroundImage: player.cover_image ? `url(${player.cover_image})` : '' }">
			<div class="container">
				<div class="player-content flex flex-around">
					<div class="flex flex-around flex-middle">
						<div class="player-level">
							{{ hasCsgo ? player.games.csgo.skill_level : 0 }}
							<p>Skill Level</p>
							<a :href="faceitUrl" target="_blank" class="at-btn at-btn--primary">
								<span class="at-btn__text">
									Faceit Profile
								</span>
							</a>
						</div>
						<div class="player-info">
							<img class="player-avatar" :src="avatar" :alt="player.nickname">
							<div class="player-info--nick flex flex-middle flex-center">
								{{ player.nickname }}
								<img class="player-country" :src="`./assets/flags/${player.country}.svg`" :alt="player.country">
							</div>
						</div>
						<div class="player-elo">
							{{ hasCsgo ? player.games.csgo.faceit_elo : 0 }}
							<p>Faceit Elo</p>
							<a :href="steamUrl" target="_blank" class="at-btn at-btn--primary">
								<span class="at-btn__text">
									Steam Profile
								</span>
							</a>
						</div>
					</div>
					<div v-if="hasCsgo" class="player-elo-bar">
						<p>
							<i class="icon icon-zap" /> {{ player.games.csgo.faceit_elo }} - {{ progress.next }}
						</p>
						<at-progress :percent="progress.percent"></at-progress>
					</div>
				</div>
			</div>
		</div>
		<div class="row at-row">
			<template v-for="segment in playerStats.segments">
				<div
					v-if="segment.mode === '5v5'"
					:key="segment.label"
					class="col-xs-12 col-sm-8 col-md-4"
				>
					<at-card :body-style="{ padding: 0, overflow: 'hidden' }">
						<div>
							<img class="map-img" :src="segment.img_regular">
							<div class="map-info flex flex-around">
								<div class="map-count">
									<p>Matches</p>
									{{ segment.stats['Matches'] }}
								</div>
								<div class="map-win-rate">
									<p>Win Rate %</p>
									{{ segment.stats['Win Rate %'] }}
								</div>
							</div>
						</div>
					</at-card>
				</div>
			</template>
		</div>
		<history-matches :history-matches="historyMatches" />
	</div>
</template>

<script>
import HistoryChart from './HistoryChart'
import HistoryMatches from './HistoryMatches'

export default {
	components: {
		HistoryChart,
		HistoryMatches
	},
	props: {
		player: {
			type: Object,
			required: true
		},
		playerStats: {
			type: Object,
			required: true
		},
		historyMatches: {
			type: Array,
			required: true
		}
	},
	computed: {
		progress () {
			const elo = this.hasCsgo ? this.player.games.csgo.faceit_elo : 0
			let percent = 0
			let next = 0
			switch (true) {
				case (elo < 800) :
					next = 800
					percent = elo / next * 100
					break
				case (elo < 950) :
					next = 950
					percent = this.percentProgress(next)
					break
				case (elo < 1100) :
					next = 1100
					percent = this.percentProgress(next)
					break
				case (elo < 1250) :
					next = 1250
					percent = this.percentProgress(next)
					break
				case (elo < 1400) :
					next = 1400
					percent = this.percentProgress(next)
					break
				case (elo < 1550) :
					next = 1550
					percent = this.percentProgress(next)
					break
				case (elo < 1700) :
					next = 1700
					percent = this.percentProgress(next)
					break
				case (elo < 1850) :
					next = 1850
					percent = this.percentProgress(next)
					break
				case (elo < 2000) :
					next = 2000
					percent = this.percentProgress(next)
					break
				case (elo > 2000) :
					next = '∞'
					percent = 100
					break
			}
			percent = Number(percent.toFixed(2))
			return { percent, next }
		},
		avatar () {
			return this.player.avatar || '/assets/img/noava.png'
		},
		faceitUrl () {
			return 'https://www.faceit.com/en/players/' + this.player.nickname
		},
		steamUrl () {
			return 'http://www.steamcommunity.com/profiles/' + this.player.steam_id_64
		},
		hasCsgo () {
			return !!this.player.games.csgo
		}
	},
	methods: {
		percentProgress (next) {
			const count = next - this.player.games.csgo.faceit_elo
			return 100 - (count / 150 * 100)
		}
	}
}
</script>

<style lang="scss" scoped>
$black: #000;

.player {
	&-container {
		position: relative;
		margin: 16px -16px 16px -16px;
		height: 280px;
		background: no-repeat center url(/assets/img/fon.jpg);
		background-size: cover;
		.container {
			height: 100%;
		}
	}
	&-content {
		padding: 16px;
		flex-direction: column;
		height: 100%;
	}
	&-avatar {
		height: 150px;
		width: 150px;
		border-radius: 100%;
		box-shadow: 0 0 0 8px rgba($black, .5);
		transition: .2s ease;
		&:hover {
			transform: scale(1.02);
		}
	}
	&-info {
		color: #fff;
		font-size: 20px;
		font-weight: bold;
		border-radius: 5px;
		padding: 8px;
		&--nick {
			margin-top: 16px;
			white-space: nowrap;
		}
	}
	&-country {
		width: auto;
		height: 20px;
		margin-left: 8px;
		border-radius: 3px;
	}
	&-level, &-elo {
		color: #fff;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		p {
			color: #fff;
		}
		a:hover {
			color: #fff;
		}
	}
	&-elo-bar {
		p {
			text-align: right;
			color: #fff;
		}
	}
}
.map {
	&-img {
		width: 100%;
	}
	&-info {
		padding: 8px;
	}
}
</style>