<template>
  <img class="card-image-top" :src="images[0].content">
</template>

<script>
export default {
    data: function() {
return {
        content: 'Vue image preview',
        images: new Array(3)
            .fill()
            .map((el,index) => ({content:null, key:index})),
    };
},

    methods: {
        onImage(index, e) {
            e.stopPropagation()
            e.preventDefault()

            const file = e.target.files[0]

            if(!file.type.match("image.*")) alert("Select a valid image file")
            else this.images[index].content =URL.createObjectURL(file)
        }
    }

}
</script>

<style>

</style>