<template>
    <div>
        <p>
            根据当前筛选条件：共{{$store.state.filtercar.count}}个结果，当前在第{{$store.state.filtercar.pageinfo.page}}页
        </p>
        <Table :columns="tablecols" :data="tabledata"  @on-sort-change="sortchange"></Table>
        <div class="page">
            <Page :total="count" show-sizer @on-change="pagechange" @on-page-size-change="pagesizechange" show-elevator></Page>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                tablecols : [
                    {
                        title: 'id',
                        key: 'id',
                        sortable: 'custom'
                    },
                    {
                        title: '缩略图',
                        key: 'images',
                        render : (h , {row})=>{
                            return h({
                                template : `
                                    <img src="carimages_small/${row.id}/view/${row.images.view[0]}" alt="">
                                `
                            })
                        },
                        width: 180
                    },
                    {
                        title: '品牌',
                        key: 'brand'
                    },
                    {
                        title: '车系',
                        key: 'series'
                    },
                    {
                        title: '颜色',
                        key: 'color'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        sortable: 'custom'
                    },
                    {
                        title: '公里数',
                        key: 'km',
                         sortable: 'custom'
                    },
                    {
                        title: '变速箱',
                        key: 'gearbox'
                    },
                    {
                        title: '环保',
                        key: 'environmental'
                    },
                    {
                        title: '燃料',
                        key: 'fuel'
                    },
                    {
                        title: '排量',
                        key: 'displacement'
                    },
                    {
                        title: '是否上牌',
                        key: 'licence',
                        render(h , {row}){
                            return h({
                                template : `
                                    <div>
                                        <span v-if="${row.licence}">是</span>
                                        <span v-if="${!row.licence}">否</span>
                                    </div>
                                `
                            })
                        }
                    },
                    {
                        title: '是否本地车',
                        key: 'locality',
                        render(h , {row}){
                            return h({
                                template : `
                                    <div>
                                        <span v-if="${row.locality}">是</span>
                                        <span v-if="${!row.locality}">否</span>
                                    </div>
                                `
                            })
                        }
                    }
                ]
            }
        },
        computed : {
            tabledata(){
                return this.$store.state.filtercar.cars
            },
            count(){
                return this.$store.state.filtercar.count
            }
        },
        methods : {
            pagechange(page){
                this.$store.dispatch("changepage" , {page})
            },
            pagesizechange(pagesize){
                this.$store.dispatch("changepagesize" , {pagesize})
            },
            sortchange({key , order}){
                console.log(order)
                this.$store.dispatch("changesort" , {key , order})
            }
        }
    }
</script>


<style lang="less" scoped>
    .page{
        padding-top:30px;
        display: flex;
        justify-content: flex-end;
    }
    img{
        width: 150px
    }
</style>
