
import { createRouter, createWebHistory } from 'vue-router'
import Props from '@/pages/01_props/Father.vue'
import Event from '@/pages/02_custom-event/Father.vue'
import Bus from '@/pages/03_mitt/Father.vue'
import Model from '@/pages/04_v-model/Father.vue'
import AttrsListeners from '@/pages/05_$attrs/Father.vue'
import RefChildrenParent from '@/pages/06_$refs-$parent/Father.vue'
import ProvideInject from '@/pages/07_provide-inject/Father.vue'
import Pinia from '@/pages/08_pinia/Father.vue'
import Slot from '@/pages/09_slot_具名插槽/Father.vue'
import MyGrand from '@/pages/05_$attrs/MyGrand.vue'
import Parent06 from "@/pages/06_$refs-$parent/Parent06.vue"
import level_0 from "@/pages/07_provide-inject/level_0.vue"
import PracticeFather from '@/pages/09_slot_默认插槽/PracticeFather.vue'
import ScopeFather from '@/pages/09_slot_作用域插槽/ScopeFather.vue'

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/props',
			component: Props
		},
		{
			path: '/event',
			component: Event
		},
		{
			path: '/mitt',
			component: Bus
		},
		{
			path: '/model',
			component: Model
		},
		{
			path: '/attrs',
			component: AttrsListeners
		},
		{
			path: '/ref-parent',
			component: RefChildrenParent
		},
		{
			path: '/provide-inject',
			component: ProvideInject
		},
		{
			path: '/pinia',
			component: Pinia
		},
		{
			path: '/slot',
			component: Slot
		},
		{
			path: '/myAttr',
			component: MyGrand
		},
		{
			path: '/myRefLearn',
			component: Parent06
		},
		{
			path:'/myProvideInjectLearn',
			component: level_0
		},
		{
			path:'/practiceShot1',
			component: PracticeFather
		},
		{
			path:'/scopeFather',
			component: ScopeFather
		},
	]
})

