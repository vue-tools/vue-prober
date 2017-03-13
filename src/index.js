import os from './os'
import app from './app'
import Version from './version'
import browser from './browser'

function plugin(Vue) {
    let env = {
        os,
        app,
        browser,
        Version
    }

    Vue.env = env
    Vue.prototype.$env = env
}

export default plugin