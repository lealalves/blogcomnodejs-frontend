<template>
    <input @input='$emit("customChange", $event.target.value)' class="effect-10" :type="type" :placeholder="placeholder" />
</template>

<script>
export default {
  name: "Input",
  props: {
    type: String,
    placeholder: String,
  }
}
</script>

<style>

</style>