<template>
    <div class="layout" >
        <Layout >
            <myHeader></myHeader>
            <router-view></router-view>
            <myFooter></myFooter>
        </Layout>
    </div>
</template>
<script>

import myHeader from '../../components/user/HeaderGuide/HeaderGuide'
import myFooter from '../../components/user/FooterGuide/FooterGuide'

export default {
    data () {
        return {

        }
    },
    components: {
        myHeader,
        myFooter
    },
    
}
</script>
<style lang="less" scoped>

</style>

