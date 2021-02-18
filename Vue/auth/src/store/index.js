import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        username: '',
        token: '',
        domen: 'http://127.0.0.1:8000/'
    },
    mutations: {
        setToken: (state, {auth_token}) => {
            state.token = auth_token
            sessionStorage.token = auth_token
        },
        setUsername: (state, payload) => {
            state.username = payload
            sessionStorage.username = payload
        },
        logOut: (state) => {
            state.username = ""
            sessionStorage.username = ""

            state.token = ""
            sessionStorage.token = ""
        }
    },
    actions: {

    },
    getters: {
        getToken: (state) => {
            if (sessionStorage.token){
                state.token = sessionStorage.getItem('token')
            }
            if (state.token === undefined){
                state.token = ""
            }
            return state.token
        },
        getUsername: (state) => {
            if (sessionStorage.username){
                state.username = sessionStorage.getItem('username')
            }
            return state.username
        },
        getDomen: (state) => {
            return state.domen
        }
    }
})
