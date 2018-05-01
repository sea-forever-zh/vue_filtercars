import Vue from "vue";

export default {
    changecars(state , {cars}){
        state.filtercar.cars = cars;
    },
    changecount(state , {count}){
        state.filtercar.count = count;
    },
    changefilterinfo(state , {k , v}){
        Vue.set(state.filtercar.filterinfo , k , v);
    },
    changepage(state, { page }) {
        state.filtercar.pageinfo.page = page;
    },
    changepagesize(state, { pagesize }) {
        state.filtercar.pageinfo.pagesize = pagesize;
    },
    changesort(state, { key, order }) {
        state.filtercar.sortinfo.sortby = key;
        state.filtercar.sortinfo.sortdirection = order == "asc" ? 1 : -1;
    },
    delfilterinfo(state , {k}){
        if (k == "km") {
            Vue.set(state.filtercar.filterinfo.km, 0, 0);
            Vue.set(state.filtercar.filterinfo.km, 1, 1000000);
            return;
        }
        if(k == "price"){
            Vue.set(state.filtercar.filterinfo.price , 0 , 0);
            Vue.set(state.filtercar.filterinfo.price , 1 , 100);
            return;
        }

       

        var o = {};
        //delete是一个运算符，表示删除一个对象的键
        for (var kk in state.filtercar.filterinfo){
            if(kk != k){
                o[kk] = state.filtercar.filterinfo[kk];
            }
        }
        state.filtercar.filterinfo = o;
    }
}