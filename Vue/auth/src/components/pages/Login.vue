<template>
    <div>
        <h1>Страница авторизации</h1>
        <div class="alert alert-danger" role="alert" v-if="!hasUser">
            <div v-for="userMsg in serverMsg.username" :key="userMsg">
                {{userMsg}}
            </div>
            <div v-for="userMsg in serverMsg.password" :key="userMsg">
                {{userMsg}}
            </div>
        </div>
        <form @submit.prevent="logIn()">
            <div class="form-group">
                <label for="username">Имя пользователя</label>
                <input
                    type="text"
                    class="form-control"
                    :class="{'is-invalid': $v.userData.username.$error}"
                    id="username"
                    name="username"
                    v-model="userData.username"
                    @blur="$v.userData.username.$touch()"
                >
                <div class="invalid-feedback" v-if="!$v.userData.username.required">
                    Поле "Имя пользователя" обязательно к заполнению
                </div>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    :class="{'is-invalid': $v.userData.password.$error}"
                    v-model="userData.password"
                    @blur="$v.userData.password.$touch()"
                >
                <div class="invalid-feedback" v-if="!$v.userData.password.required">
                    Поле "Пароль" обязательно к заполнению
                </div>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
            >Авторизация</button>
        </form>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    export default {
        data () {
            return {
                userData:{
                    username: '',
                    password: ''
                },
                hasUser: true,
                serverMsg: ''
            }
        },
        methods:{
            async logIn(){
                var response = await fetch(this.$store.getters.getDomen + 'auth/token/login/', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.userData)
                });
                if (response.status === 200)
                {
                    this.hasUser = true
                    this.$store.commit('setToken', await response.json())
                    this.$store.commit('setUsername', this.userData.username)
                    this.userData.username = ''
                    this.userData.password = ''
                }
                else{
                    this.hasUser = false
                    this.serverMsg = await response.json()
                }
            }
        },
        validations: {
            userData: {
                username: {
                    required
                },
                password: {
                    required
                }
            }
        }
    }
</script>

<style scoped>

</style>
