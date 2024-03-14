<template>
    <div>

    <p>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="user.userName" autocomplete="true" required >
    </p>
    
    <p>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="user.password" autocomplete="true" required>
    </p>
    <button  @click="userLogin">Login</button>

    <div v-if="showSuccessModal">
      <p>Login successful!</p>
    </div>
    <div>
        <h2>userName:{{ user.userName }}</h2>
    </div>
    <div> sum:{{ sum }}</div>
    <button @click="addsum">add</button>
  </div>

</template>
<script lang="ts" setup name="login">
    import { ref } from 'vue';
    import axios from 'axios';
    import {User,type Result} from '@/types/index'
    let showSuccessModal=ref(false);
    let user=ref(new User(NaN,"qwe","123"));

    let sum=ref(1);
    function addsum(){
        sum.value+=1;
    }

    
    async function userLogin(){
        // debugger;
        console.log("into userLogin")
        const response = await axios.post('http://localhost:8200/api/user/login', {
          userName: user.value.userName,
          password: user.value.password,
        });
        console.log(response)
        if (response.status === 200) {
          // 登录成功，显示弹窗提示
          showSuccessModal.value = true;
        } else {
          // 登录失败，处理错误
          console.error('Login failed');
        }
    }
</script>
<style>

</style>