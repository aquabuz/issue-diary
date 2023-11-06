<script setup>
const clickFunc = () => {
  console.log('👌');
};
</script>

<template>
  <h1>User</h1>
  <form action="">
    name: <input type="text" name="user" /> location:
    <input type="text" name="location" />
    <button type="submit">SUBMIT</button>
  </form>
  <button @click="clickFunc">TTTTTTTTTTTTTTT</button>
</template>
