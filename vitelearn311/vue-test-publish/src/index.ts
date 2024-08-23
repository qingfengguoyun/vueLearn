import TestBtn from './components/TestBtn.vue'
export { TestBtn }

const components = [TestBtn]
const install = function (App: any, options: any) {
  components.forEach((component) => {
    App.component(component.name, component)
  })
}

export default { install }
