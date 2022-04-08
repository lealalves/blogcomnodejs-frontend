<template>
  <router-view/>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
}
hr {
  width: 100%;
  border: 1px solid #56818133;
  margin: 15px 0;
}
a{
  color: inherit;
}
.card_text{
    margin: 10px 0;
}
.jumbo_paragrafo {
  font-family: "Lucida Sans", Arial, sans-serif;
  font-size: min(16px, 3vw);
  line-height: 26px;
  margin: 0;
  word-break: break-all;
  text-align: left;
}
#list_container{
  width: 100%;
  padding: 20px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 10px;
  margin: 10px 0;
  word-break: break-all;
}
#container_principal{
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: min(700px,90vw);
  align-items: flex-start;
}
#categorias_container{
  width: 100%;
}
#form_container{
  width: 100%;
  border: 1px solid rgb(223, 223, 223);
  padding: 30px;
  border-radius: 10px;
  margin-top: 10px;
}
.effect-10{
  border: 0;
  padding: 7px 15px;
  border: 1px solid #ccc;
  position: relative;
  background: transparent;
  margin: 10px 10px 10px 0px;
  width: 100%;
}
.form_title{
  margin-bottom: 15px;
}
</style>
