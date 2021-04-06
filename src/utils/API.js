import axios from "axios";

const BASEURL = "https://randomuser.me/api/";
const searchNum = "?results=";
const natType = "&nat=us";

export default {
    search: function (query) {
        return axios.get(
            BASEURL + searchNum + query + natType
        );
    }
};