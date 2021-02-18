<template>
    <div>
        <h1>Страница сброса пароля</h1>
        <form @submit.prevent="passReset()">
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
            <button type="submit" class="btn btn-primary">Сброс</button>
        </form>
    </div>
</template>

<script>
    import {email, required} from "vuelidate/lib/validators";

    export default {
        data () {
            return {
                userData:{
                    email: ''
                }
            }
        },
        validations: {
            userData: {
                email: {
                    required,
                    email,
                }
            }
        },
        methods:{
            async passReset(){
                await fetch(this.$store.getters.getDomen + 'auth/users/reset_password/', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.userData)
                });
                alert('Письмо было отправлено на почту!')
                this.userData.email = ''
            }
        },
    }
</script>

<style scoped>

</style>
