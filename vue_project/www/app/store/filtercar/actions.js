const loadserver = async function ({ pageinfo, filterinfo, sortinfo }){
    return await fetch("/api/cars", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pageinfo, filterinfo, sortinfo
        })
    });
}

export default {
    async init_car({commit , state}){
        //得到最新的三大嫁妆
        const { pageinfo, filterinfo, sortinfo} = state.filtercar;
        //娶服务器上两个姑娘
        const {results , count} = await loadserver({ pageinfo, filterinfo, sortinfo }).then(data=>data.json());
        //改变
        commit("changecars", { cars: results });
        commit("changecount", { count });
    },
    async changefilterinfo({ commit, state } , {k , v}) {
        //先改变
        commit("changefilterinfo", { k , v });
        //然后得到最新的三大嫁妆
        const { pageinfo, filterinfo, sortinfo } = state.filtercar;
        //娶服务器上两个姑娘
        const { results, count } = await loadserver({ pageinfo, filterinfo, sortinfo }).then(data => data.json());
        //改变
        if (count / pageinfo.pagesize < pageinfo.page) {
            pageinfo.page = count / pageinfo.pagesize < pageinfo.page ? Math.ceil(count / pageinfo.pagesize) == 0 ? 1 : Math.ceil(count / pageinfo.pagesize) : pageinfo.page
            commit("changepage", { page: pageinfo.page });
        }
        commit("changecars", { cars: results });
        commit("changecount", { count });
    },
    async changepage({ commit, state }, { page }) {
        //先改变
        commit("changepage", { page });
        //然后得到最新的三大嫁妆
        const { pageinfo, filterinfo, sortinfo } = state.filtercar;
        //娶服务器上两个姑娘
        const { results, count } = await loadserver({ pageinfo, filterinfo, sortinfo }).then(data => data.json());
        //改变
        commit("changecars", { cars: results });
        commit("changecount", { count });
    },
    async changepagesize({ commit, state }, { pagesize }) {
        //先改变
        commit("changepagesize", { pagesize });
        //然后得到最新的三大嫁妆
        const { pageinfo, filterinfo, sortinfo } = state.filtercar;
        //娶服务器上两个姑娘
        const { results, count } = await loadserver({ pageinfo, filterinfo, sortinfo }).then(data => data.json());
        //改变
        commit("changecars", { cars: results });
        commit("changecount", { count });
    },
    async changesort({ commit, state }, { key, order }) {
        //先改变
        commit("changesort", { key, order});
        //然后得到最新的三大嫁妆
        const { pageinfo, filterinfo, sortinfo } = state.filtercar;
        //娶服务器上两个姑娘
        const { results, count } = await loadserver({ pageinfo, filterinfo, sortinfo }).then(data => data.json());
        //改变
        commit("changecars", { cars: results });
        commit("changecount", { count });
    },
    async delfilterinfo({ commit, state }, { k}) {
        //先改变
        commit("delfilterinfo", { k });
        //然后得到最新的三大嫁妆
        const { pageinfo, filterinfo, sortinfo } = state.filtercar;
        //娶服务器上两个姑娘
        const { results, count } = await loadserver({ pageinfo, filterinfo, sortinfo }).then(data => data.json());
        //改变
        commit("changecars", { cars: results });
        commit("changecount", { count }); 
    },
}