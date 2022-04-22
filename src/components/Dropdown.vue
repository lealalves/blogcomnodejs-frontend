<template>
  <div id="dropdown">
    <li @click="isOpen = !isOpen">{{title}}</li>
    <transition name="fade" appear>
      <div class="sub-menu" v-show="isOpen" >
        <div v-for="(item, i) in items" :key="i">
          <component 
            :is="item.is" 
            :to="item.url"
            @click="detectEvent($event)">{{item.title}}
          </component>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
	name: 'Dropdown',
	props: ['title', 'items'],
	data() {
		return {
			isOpen: false
		}
	},
	methods: {
		detectEvent(e){
			if(e.target.nodeName == 'P'){
				this.logout()
			}
		},
		async logout() {
			const req = await fetch(`${process.env.VUE_APP_API_URL}usuarios/logout`);

			const res = await req.json()

			if(!res.ok) {
				this.msgs = res;
			}else {
				this.$router.push({
					name: 'Home',
					params: {
						ok: res.texto,
					},
				})
				setInterval(() => {
					location.reload()
				},1000)
			}
		},
	},
}
</script>

<style scoped>
.sub-menu {
  position: absolute;
  background-color: #222;
  right: 5px;
  border-radius: 10px;
}
.sub-menu div{
  padding: 10px;
  text-align: center;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .3s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>