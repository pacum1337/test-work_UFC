<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link tag="li" class="nav-item" active-class="active" exact to="/">
            <a class="nav-link">Главная</a>
          </router-link>

          <router-link tag="li" class="nav-item" active-class="active" to="/login/">
            <a class="nav-link">Авторизация</a>
          </router-link>

          <router-link tag="li" class="nav-item" active-class="active" to="/register/">
            <a class="nav-link">Регистрация</a>
          </router-link>

          <router-link tag="li" class="nav-item" active-class="active" to="/pass_reset/">
            <a class="nav-link">Сброс пароля</a>
          </router-link>

        </ul>
        <div class="ml-auto my-auto">
          <p v-if="username && token !== ''">Здравствуйте {{ username }}</p>
          <p v-else>Вы не авторизованы</p>
          <p v-if="username && token !== ''">Токен авторизации: {{ token }}</p>
          <form v-if="token !== ''" @submit.prevent="logOut()">
            <button class="btn btn-info">Выход из профиля</button>
          </form>
        </div>
      </div>
    </nav>
</template>

<script>
    export default {
        methods:{
          async logOut(){
            await fetch(this.$store.getters.getDomen + 'auth/token/logout/', {
                method: 'post',
                headers: {
                    'Authorization': 'Token ' + this.token
                }
            });
            this.$store.commit('logOut')
        }
        },
        computed: {
          token () {
            return this.$store.getters.getToken
          },
          username () {
            return this.$store.getters.getUsername
          }
        }
    }
</script>

<style scoped>

</style>
