<template>
    <button>{{text}}</button>
</template>

<script>
export default {
	name: 'Button',
	props: {
		text: String
	}
}
</script>

<style scoped>
button{
    padding: 10px;
    color: white;
    background-color: green;
    border: 1px solid green;
    border-radius: 5px;
    cursor: pointer;
    margin: 15px 5px;
    font-size: 16px;
}
</style>