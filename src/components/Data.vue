<template>
	{{
		new Intl.DateTimeFormat('pt-BR', 
			{
				day: 'numeric', 
				month: 'long', 
				year: 'numeric', 
				hour: 'numeric', 
				minute: 'numeric'
			}).format(Date.parse(data_atual))
	}}
</template>

<script>
export default {
	name: 'Data',
	props: {
		data_atual: String
	}
}
</script>