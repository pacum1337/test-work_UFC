<template>
    <div>
        <h1>Страница регистрации</h1>
        <div class="alert alert-danger" role="alert" v-if="!hasUser">
            <div v-for="userMsg in serverMsg.username" :key="userMsg">
                {{userMsg}}
            </div>
            <div v-for="userMsg in serverMsg.password" :key="userMsg">
                {{userMsg}}
            </div>
        </div>
        <form @submit.prevent="register()">
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
                <div class="invalid-feedback" v-if="!$v.userData.username.minLength">
                    Поле "Имя пользователя" должно состоять минимум из 4 символов
                </div>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    class="form-control"
                    :class="{'is-invalid': $v.userData.email.$error}"
                    id="email"
                    name="email"
                    v-model="userData.email"
                    @blur="$v.userData.email.$touch()"
                >
                <div class="invalid-feedback" v-if="!$v.userData.email.required">
                    Поле "Email" обязательно к заполнению
                </div>
                <div class="invalid-feedback" v-if="!$v.userData.email.email">
                    Поле "Email" не является адресом эл. почты
                </div>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input
                    type="password"
                    class="form-control"
                    :class="{'is-invalid': $v.userData.password.$error}"
                    id="password"
                    name="password"
                    v-model="userData.password"
                    @blur="$v.userData.password.$touch()"
                >
                <div class="invalid-feedback" v-if="!$v.userData.password.required">
                    Поле "Пароль" обязательно к заполнению
                </div>
                <div class="invalid-feedback" v-if="!$v.userData.password.minLength">
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
            <button type="submit" class="btn btn-primary">Регистрация</button>
        </form>
    </div>
</template>

<script>
    import {required, minLength, email, sameAs} from "vuelidate/lib/validators";

    export default {
        data () {
            return {
                userData:{
                    username: '',
                    password: '',
                    confirm_password: '',
                    email: '',
                },
                hasUser: true,
                serverMsg: ''
            }
        },
        validations: {
            userData:{
                username: {
                    required,
                    minLength: minLength(4),
                    uniqName: (username_value) => {
                        if (username_value){
                             return true
                        }else {
                            return false
                        }
                    }
                },
                email: {
                    required,
                    email,
                    uniqEmail: (username_value) => {
                        if (username_value){
                             return true
                        }else {
                            return false
                        }
                    }
                },
                password: {
                    required,
                    minLength: minLength(6)
                },
                confirm_password: {
                    sameAs: sameAs((vue) => {
                        return vue.password
                    })
                }
            }
        },
        methods: {
            async register() {
                var response = await fetch(this.$store.getters.getDomen + 'auth/users/', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.userData)
                });
                this.hasUser = response.status === 201;
                if (!this.hasUser){
                    this.serverMsg = await response.json()
                }
                else{
                    alert("Создан новый пользователь!")
                    this.userData.username = ''
                    this.userData.password = ''
                    this.userData.confirm_password = ''
                    this.userData.email = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
