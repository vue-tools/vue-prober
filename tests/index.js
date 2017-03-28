import Vue from 'vue'
import { expect } from 'chai'
import Version from '../src/version'

function setUserAgent(ua) {
    let __originalNavigator = navigator

    navigator = new Object()
    navigator.__proto__ = __originalNavigator
    navigator.__defineGetter__('userAgent', () => ua)
}

describe('main', () => {
    let prober

    before(() => {
        let oldkeys, newkeys

        oldkeys = Object.keys(require.cache)
        prober = require('../src').default
        newkeys = Object.keys(require.cache)

        newkeys.forEach((newkey) => {
            if (!~oldkeys.indexOf(newkey)) {
                delete require.cache[newkey]
            }
        })
    })

    it('correct', () => {
        Vue.use(prober)
        
        expect(Vue.env.os.name).to.be.equal('unknown')
        expect(Vue.env.app.name).to.be.equal('unknown')
        expect(Vue.env.browser.name).to.be.equal('unknown')
    })
})

describe('browser', () => {
    const iOSWebviewUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A5376e'
    const SafariUA = 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
    const FireFoxUA = 'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4'
    const KindleUA = 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true'
    const AndroidBrowserUA = 'Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30'
    const UCUA = 'Mozilla/5.0 (Linux; U; Android 2.3; zh-CN; MI-ONEPlus) AppleWebKit/534.13 (KHTML, likeGecko) UCBrowser/8.6.0.199 U3/0.8.0 Mobile Safari/534.13'
    const ChromeUA = 'Mozilla/5.0 (Linux; Android 4.1; Galaxy Nexus Build/JRN84D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
    const QQUA = 'Mozilla/5.0 (Linux; U; Android 4.1.1; zh-cn; MI 2S Build/JRO03L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 MQQBrowser/5.0 Mobile Safari/537.36'
    const ChromeWebviewUA = 'Mozilla/5.0 (Linux; Android 4.1; Galaxy Nexus Build/JRN84D) AppleWebKit/535.19 (KHTML, like Gecko) Version/4.0 Chrome/18.0.1025.166 Mobile Safari/535.19'
    const IEMobileUA = 'Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft; RM-1074) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537'
    const IEUA = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 1.1.4322; InfoPath.2; .NET CLR 3.5.21022; .NET CLR 3.5.30729; MS-RTC LM 8; OfficeLiveConnector.1.4; OfficeLivePatch.1.3; .NET CLR 3.0.30729)'
    
    describe('UCBrowser', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(UCUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isUC).to.be.true
            expect(browser.name).to.be.equal('UC')
            expect(browser.version.eq('8.6.0.199')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(UCUA)
        })
    })

    describe('QQBrowser', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(QQUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isQQ).to.be.true
            expect(browser.name).to.be.equal('QQ')
            expect(browser.version.eq('5.0')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(QQUA)
        })
    })

    describe('Firefox', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(FireFoxUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isFirefox).to.be.true
            expect(browser.name).to.be.equal('Firefox')
            expect(browser.version.eq('1.0')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(FireFoxUA)
        })
    })

    describe('IE', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(IEUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isIE).to.be.true
            expect(browser.name).to.be.equal('IE')
            expect(browser.version.eq('8.0')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(IEUA)
        })
    })

    describe('IEMobile', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(IEMobileUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isIEMobile).to.be.true
            expect(browser.name).to.be.equal('IEMobile')
            expect(browser.version.eq('11.0')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(IEMobileUA)
        })
    })

    describe('Chrome', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(ChromeUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isChrome).to.be.true
            expect(browser.name).to.be.equal('Chrome')
            expect(browser.version.eq('18.0.1025.166')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(ChromeUA)
        })
    })

    describe('Chrome Webview', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(ChromeWebviewUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isWebview).to.be.true
            expect(browser.name).to.be.equal('Chrome Webview')
            expect(browser.version.eq('18.0.1025.166')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(ChromeWebviewUA)
        })
    })

    describe('AndroidBrowser', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(AndroidBrowserUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isAndroid).to.be.true
            expect(browser.name).to.be.equal('Android')
            expect(browser.version.eq('4.2')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(AndroidBrowserUA)
        })
    })

    describe('Safari', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(SafariUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isSafari).to.be.true
            expect(browser.name).to.be.equal('Safari')
            expect(browser.version.eq('7.0')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(SafariUA)
        })
    })

    describe('iOS Webview', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(iOSWebviewUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.isWebview).to.be.true
            expect(browser.name).to.be.equal('iOS Webview')
            expect(browser.version.eq('6.0')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(iOSWebviewUA)
        })
    })

    describe('unknown', () => {
        let browser

        before(() => {
            let oldkeys, newkeys

            setUserAgent(KindleUA)
            oldkeys = Object.keys(require.cache)
            browser = require('../src/browser').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(browser.version.eq('0')).to.be.true
            expect(browser.name).to.be.equal('unknown')
            expect(window.navigator.userAgent).to.be.equal(KindleUA)
        })
    })
})

describe('os', () => {
    const WPUA = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)'
    const iPadUA = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    const AndroidPadUA = 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Safari/537.36'
    const iPhoneUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    const KindleUA = 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true'
    const AndroidUA = 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G9250 Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043115 Safari/537.36 MicroMessenger/6.5.4.1000 NetType/WIFI Language/zh_CN'
    
    describe('android', () => {
        let os

        before(() => {
            let oldkeys, newkeys

            setUserAgent(AndroidUA)
            oldkeys = Object.keys(require.cache)
            os = require('../src/os').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(os.isAndroid).to.be.true
            expect(os.name).to.be.equal('Android')
            expect(os.version.eq('6.0.1')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(AndroidUA)
        })
    })

    describe('android pad', () => {
        let os

        before(() => {
            let oldkeys, newkeys

            setUserAgent(AndroidPadUA)
            oldkeys = Object.keys(require.cache)
            os = require('../src/os').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(os.isAndroidPad).to.be.true
            expect(os.version.eq('4.3')).to.be.true
            expect(os.name).to.be.equal('AndroidPad')
            expect(window.navigator.userAgent).to.be.equal(AndroidPadUA)            
        })
    })

    describe('iPhone', () => {
        let os

        before(() => {
            let oldkeys, newkeys

            setUserAgent(iPhoneUA)
            oldkeys = Object.keys(require.cache)
            os = require('../src/os').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(os.isIOS).to.be.true
            expect(os.isIPhone).to.be.true            
            expect(os.name).to.be.equal('iPhone')            
            expect(os.version.eq('9.1')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(iPhoneUA)            
        })
    })

    describe('iPad', () => {
        let os

        before(() => {
            let oldkeys, newkeys

            setUserAgent(iPadUA)
            oldkeys = Object.keys(require.cache)
            os = require('../src/os').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(os.isIOS).to.be.true
            expect(os.isIPad).to.be.true
            expect(os.name).to.be.equal('iPad')            
            expect(os.version.eq('9.1')).to.be.true
            expect(window.navigator.userAgent).to.be.equal(iPadUA)
            
        })
    })

    describe('WindowsPhone', () => {
        let os

        before(() => {
            let oldkeys, newkeys

            setUserAgent(WPUA)
            oldkeys = Object.keys(require.cache)
            os = require('../src/os').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(os.isWindowsPhone).to.be.true
            expect(os.version.eq('8.0')).to.be.true
            expect(os.name).to.be.equal('Windows Phone')
            expect(window.navigator.userAgent).to.be.equal(WPUA)            
        })
    })

    describe('unknown', () => {
        let os

        before(() => {
            let oldkeys, newkeys

            setUserAgent(KindleUA)
            oldkeys = Object.keys(require.cache)
            os = require('../src/os').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(os.version.eq('0')).to.be.true
            expect(os.name).to.be.equal('unknown')
            expect(window.navigator.userAgent).to.be.equal(KindleUA)
        })
    })
})

describe('app', () => {
    const KindleUA = 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true'
    const WeiboUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Weibo'
    const WeixinUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 MicroMessenger'

    describe('Weibo', () => {
        let app

        before(() => {
            let oldkeys, newkeys

            setUserAgent(WeiboUA)
            oldkeys = Object.keys(require.cache)
            app = require('../src/app').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(app.isWeibo).to.be.true
            expect(app.name).to.be.equal('Weibo')
            expect(window.navigator.userAgent).to.be.equal(WeiboUA)
        })
    })

    describe('Weixin', () => {
        let app

        before(() => {
            let oldkeys, newkeys

            setUserAgent(WeixinUA)
            oldkeys = Object.keys(require.cache)
            app = require('../src/app').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(app.isWeixin).to.be.true
            expect(app.name).to.be.equal('Weixin')
            expect(window.navigator.userAgent).to.be.equal(WeixinUA)
        })
    })

    describe('unknown', () => {
        let app

        before(() => {
            let oldkeys, newkeys

            setUserAgent(KindleUA)
            oldkeys = Object.keys(require.cache)
            app = require('../src/app').default
            newkeys = Object.keys(require.cache)

            newkeys.forEach((newkey) => {
                if (!~oldkeys.indexOf(newkey)) {
                    delete require.cache[newkey]
                }
            })
        })

        it('correct', () => {
            expect(app.name).to.be.equal('unknown')
            expect(window.navigator.userAgent).to.be.equal(KindleUA)
        })
    })
})

describe('Version', () => {
    it('with value', () => {
        let str, ver

        str = '1.0.0'
        ver = new Version(str)
        expect(ver.val).to.be.equal(str)
        expect(ver).to.be.instanceof(Version)
    })

    it('without value', function() {
        let ver = new Version()

        expect(ver.val).to.be.empty
        expect(ver).to.be.instanceof(Version)
    })

    it('toString', function() {
        let str, ver

        str = '1.0.0'
        ver = new Version(str)

        expect(ver.toString()).to.be.equal(str)
    })

    it('gt', function() {
        let ver = new Version('1.0.0')
        
        expect(ver.gt('0.9.9')).to.be.true
        expect(ver.gt('1.0.0')).to.be.false
        expect(ver.gt('1.0.1')).to.be.false
    })

    it('gte', function() {
        let ver = new Version('1.0.0')
        
        expect(ver.gte('0.9.9')).to.be.true
        expect(ver.gte('1.0.0')).to.be.true
        expect(ver.gte('1.0.1')).to.be.false
    })

    it('lt', function() {
        let ver = new Version('1.0.0')
        
        expect(ver.lt('0.9.9')).to.be.false
        expect(ver.lt('1.0.0')).to.be.false
        expect(ver.lt('1.0.1')).to.be.true
    })

    it('lte', function() {
        let ver = new Version('1.0.0')
        
        expect(ver.lte('0.9.9')).to.be.false
        expect(ver.lte('1.0.0')).to.be.true
        expect(ver.lte('1.0.1')).to.be.true
    })

    it('eq', function() {
        let a = '1.0.0'
        let ver = new Version('1.0.0')
        
        expect(ver.eq('0.9.9')).to.be.false
        expect(ver.eq('1.0.0')).to.be.true
        expect(ver.eq('1.0.1')).to.be.false
    })

    it('static compare', function() {
        expect(Version.compare('', '0.9.9')).to.be.equal(-1)
        expect(Version.compare('1.0.0', '0.9.9')).to.be.equal(1)
        expect(Version.compare('1.0.0', '1.0.0')).to.be.equal(0)
        expect(Version.compare('1.0.0', '1.0.1')).to.be.equal(-1)
    })
})