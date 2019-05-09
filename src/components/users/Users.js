/* eslint-disable */
import Axios from "axios";
export default {
    data () {
        return {
            tableData: [
                {
                    username: "王小虎",
                    email: "20160502@qq.com",
                    mobile: "121321412332"
                }
            ],
            status: true,
            querytext: "",
            totalnum: 0
        };
    },
    mounted () {
        this.getuserdate();
    },
    methods: {
        getuserdate (pagenum = 1, query = "") {
            Axios.get("http://localhost:8888/api/private/v1/users", {
                params: {
                    query: this.querytext,
                    pagenum: pagenum,
                    pagesize: 2
                },
                headers: { Authorization: localStorage.getItem("token") }
            }).then(res => {
                console.log(res);
                this.totalnum = res.data.data.total;
                this.tableData = res.data.data.users;
            });
        },
        changepage (currentpage) {
            this.getuserdate(currentpage);
        },
        query () {
            this.getuserdate(1, this.querytext);
        }
    }
};