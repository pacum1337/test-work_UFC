<template>
    <div>
        <h1>Создание нового пароля</h1>
        <div class="alert alert-danger" role="alert" v-if="!hasUser">
            <div v-for="userMsg in serverMsg.uid" :key="userMsg">
                {{userMsg}}
            </div>
            <div v-for="userMsg in serverMsg.token" :key="userMsg">
                {{userMsg}}
            </div>
            <div v-for="userMsg in serverMsg.new_password" :key="userMsg">
                {{userMsg}}
            </div>
        </div>
        <form @submit.prevent="res_pass()">
            <div class="form-group">
                <label for="password">Пароль</label>
                <input
                    type="password"
                    class="form-control"
                    :class="{'is-invalid': $v.userData.new_password.$error}"
                    id="password"
                    name="password"
                    v-model="userData.new_password"
                    @blur="$v.userData.new_password.$touch()"
                >
                <div class="invalid-feedback" v-if="!$v.userData.new_password.required">
                    Поле "Пароль" обязательно к заполнению
                </div>
                <div class="invalid-feedback" v-if="!$v.userData.new_password.minLength">
                    Поле "Пароль" должно состоять минимум из 6 символов
                </div>
            </div>
            <div class="form-group">
                <label for="password2">Повтор пароля</label>
                <input
                    type="password"
                    class="form-control"
                    :class="{'is-invalid': $v.userData.confirm_password.$error}"
                    id="password2"
                    name="password2"
                    v-model="userData.confirm_password"
                    @blur="$v.userData.confirm_password.$touch()"
                >
                <div class="invalid-feedback" v-if="!$v.userData.confirm_password.sameAs">
                    Поле "Повтор пароля" и поле "Пароль" должны совпадать
                </div>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
            >Восстановить</button>
        </form>
    </div>
</template>

<script>
    import {minLength, required, sameAs} from "vuelidate/lib/validators";

    export default {
        data() {
            return {
                userData: {
                    uid: this.$route.params['uid'],
                    token: this.$route.params['token'],
                    new_password: '',
                    confirm_password: '',
                },
                hasUser: true,
                serverMsg: ''
            }
        },
        watch: {
            $route (toR) {
                this.userData.uid = toR.params['uid']
                this.userData.token = toR.params['token']
            }
        },
        validations: {
            userData:{
                new_password: {
                    required,
                    minLength: minLength(6)
                },
                confirm_password: {
                    sameAs: sameAs((vue) => {
                        return vue.new_password
                    })
                }
            }
        },
        methods: {
            async res_pass() {
                var response = await fetch(this.$store.getters.getDomen + 'auth/users/reset_password_confirm/', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.userData)
                });
                this.hasUser = response.status === 204;
                if (!this.hasUser){
                    this.serverMsg = await response.json()
                }
                else{
                    alert("Ваш пароль был изменен!")
                }
            }
        }
    }
</script>

<style scoped>

</style>
