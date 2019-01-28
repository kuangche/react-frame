import {
    createAction,
    handleAction, handleActions as originalHandleActions,
    combineActions
} from 'redux-actions'
import axios from 'axios'
import qs from 'qs'

// ajax 统一配置
const instance = axios.create({
    method: 'get',
    baseURL: '',
    timeout: 0,
   // responseType: 'json'
})

/*instance.interceptors.request.use(
    config => ({ ...config, cancelToken: window.projectConf.source.token }),
    err => (Promise.reject(err))
)*/

const handleWithParameter = function (url, {
    method = 'GET',
    contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
    params = {},
    data = {}
}) {
    const { headers } = instance.defaults
    instance.defaults.headers = { ...headers, 'Content-Type': contentType }

    // url替换参数
    let urlNew = url
    const strParams = []
    const paramsNew = { ...params }
    /*eslint-disable*/
    for (const key in params) {
        const reg = new RegExp(`:${key}`, 'g')
        if ({}.hasOwnProperty.call(params, key) && reg.test(urlNew)) {
            urlNew = urlNew.replace(reg, params[key])
            delete paramsNew[key]
        } else {
            strParams.push(`${key}=${params[key]}`)
        }
    }

    switch (method.toLowerCase()) {
        case 'get':
            return instance.get(urlNew, { params: paramsNew })
        case 'delete':
            return instance.delete(urlNew, { params: paramsNew, data })
        case 'post':
            return instance.post(urlNew, qs.stringify(data), {params: strParams.length > 0 ? paramsNew : {} })
        case 'put':
            return instance.put(urlNew, qs.stringify(data), {params: strParams.length > 0 ? paramsNew : {} })
        default: {
            const res = {
                then: resolve => resolve({
                    statusCode: 300,
                    message: 'method方式错误'
                })
            }
            return Promise.resolve(res)
        }
    }
}
/*
* pre: ajax提交前
* success: ajax连接成功返回正确结果后
* error: ajax连接成功返回错误结果后
* fail: ajax连接失败（网络错误）
* always: ajax无论成功与失败都要执行
 */
const suffix = ['pre', 'success', 'error', 'fail', 'always']

// 初始化工程中的所有state
const projectInitState = 'PROJECT_INIT_STATE_PUBLIC'

// 增强createActions, 可以配置{}
const createActions = function (actionMap) {
    const eventNames = Object.keys(actionMap)
    const fnsMap = {
        projectInit: createAction(projectInitState)
    }
    eventNames.forEach((eventName) => {
        const configOrFn = actionMap[eventName]
        if (typeof configOrFn !== 'function') {
            const config = {
                method: 'GET',
                actionType:'hasNotConfigActionType',
                hasLoading: true,
                handleError: true,
                ...configOrFn
            }
            fnsMap[eventName] = (settings = {}) => (dispatch) => {
                // const loading = require('loading').default
                // const dialog = require('dialog').default

                //if ((config.hasLoading) && !loading.getLoadingStatus()) loading.show()

                dispatch(createAction(`${config.actionType}_PRE`)(settings))
                return handleWithParameter(
                    config.url,
                    {
                        ...settings,
                        ...config
                    }
                ).then((res) => {
                    //loading.hide()
                    const { status, data1 } = res
                    const params = res.config.params === undefined ? res.config.data : res.config.params
                    const dt = qs.parse(params)

                    let data = {}
                    // 是否需要接口传递的参数
                    if (config.needFormData) {
                        data = {data: res}
                    } else {
                        data = res.data.data === undefined ? {...res.data, data: dt } : res.data
                    }

                    // always只有在成功时才返回数据，非200或异常都不返回数据
                    if (status === 200) {
                        dispatch(createAction(`${config.actionType}_SUCCESS`)(data.data))
                        dispatch(createAction(`${config.actionType}_ALWAYS`)(data.data))

                        return res.data
                    }

                    if (config.handleError) {
                        if (status === 301) {
                            location.replace(location.origin)
                        } else {
                            //mesAntd.error(message)
                        }
                    }

                    dispatch(createAction(`${config.actionType}_ERROR`)('error'))
                    dispatch(createAction(`${config.actionType}_ALWAYS`)())

                    return res.data
                }).catch(({message, response}) => {
                    //loading.hide()
                    if(response){
                        dispatch(createAction(`${config.actionType}_FAIL`)())
                        dispatch(createAction(`${config.actionType}_ALWAYS`)())
                        //mesAntd.error(`${response.statusText}😂！`)
                        return {
                            statusCode: response.status,
                            message: response.statusText
                        }
                    } else {
                        if (message && config.handleError){
                            //mesAntd.error(`${message}！`)
                        } else {
                            console.log(`未知错误error😂！`)
                        }
                    }

                    return {
                        statusCode: 500,
                        message: 'error'
                    }
                })
            }
        } else {
            fnsMap[eventName] = configOrFn
        }
    })
    return fnsMap
}

// 增强handleActions，可以配置{}
const handleActions = function (reducerMap, defaultState) {
    const result = { ...reducerMap }
    Object.keys(result).forEach((actionType) => {
        const fnOrObject = result[actionType]
        if (fnOrObject && typeof fnOrObject !== 'function') {
            delete result[actionType]
            const keys = Object.keys(fnOrObject)
            // 补充没有的默认配置
            suffix.forEach(str => {
                if (!keys.includes(str)) {
                    keys.push(str)
                    fnOrObject[str] = (state)=>(state)
                }
            })

            keys.forEach((suffixAction) => {
                result[`${actionType}_${suffixAction.toUpperCase()}`] = fnOrObject[suffixAction]
            })
        }
    })

    result[projectInitState] = function () {
        window.localStorage.clear()
        return defaultState
    }

    return originalHandleActions(result, defaultState)
}

export {
    createAction,
    createActions,
    handleAction,
    originalHandleActions,
    handleActions,
    combineActions,
}