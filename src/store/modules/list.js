import Vue from "vue";
import {
    LOGOUT_,
    REQUEST_,
    SUCCESS_,
    ERROR_,
    LIST_TOGGLE_MOVIE_REQUEST_,
    LIST_TOGGLE_MOVIE_SUCCESS_,
    LIST_TOGGLE_MOVIE_ERROR_
} from "@/store/actions";
import { list_service } from "@/services";
const state = {
    loading: "",
    my_lists: JSON.parse(localStorage.getItem("my_lists")) || [],
};

const getters = {

};

const actions = {
    [REQUEST_]: ({ commit, }, user_id) => {
        return new Promise((resolve, reject) => {
            if (!state.loading) {
                commit(REQUEST_);
                list_service.get({ owner__id: user_id }).then(data => {
                    commit(SUCCESS_, data.results);
                    resolve(data.results)
                }).catch(error => {
                    commit(ERROR_, error);
                    reject(error)
                })
            } else {
                reject({ details: "Movie List fetch already in progress" })
            }
        })
    },
    [LIST_TOGGLE_MOVIE_REQUEST_]: ({ commit }, { list, movie_id }) => {
        return new Promise((resolve, reject) => {
            commit(LIST_TOGGLE_MOVIE_REQUEST_);
            var movies = [...list.movies]
            var idx = movies.indexOf(movie_id)
            if (idx == -1)
                movies.push(movie_id)
            else {
                movies.splice(idx, 1)
            }
            list_service.patch({ movies: movies }, list.id).then(data => {
                commit(LIST_TOGGLE_MOVIE_SUCCESS_, data)
                resolve(data)
            }).catch(error => {
                commit(LIST_TOGGLE_MOVIE_ERROR_, error)
                reject(error)
            })
        })

    }
};

const mutations = {
    [LOGOUT_]: state => {
        state.my_lists = [];
        localStorage.removeItem("my_lists");
    },
    [REQUEST_]: state => {
        state.loading = true
    },
    [SUCCESS_]: (state, my_lists) => {
        state.loading = false
        state.lists_last_updated = new Date();
        localStorage.setItem("my_lists", JSON.stringify(my_lists));
        Vue.set(state, "my_lists", my_lists);
    },
    [ERROR_]: state => {
        state.loading = false
    },
    [LIST_TOGGLE_MOVIE_REQUEST_]: state => {
        state.loading = true
    },
    [LIST_TOGGLE_MOVIE_SUCCESS_]: (state, updated_list) => {
        console.log("adding movie in a list")
        state.loading = false
        var index = -1
        state.my_lists.forEach((list, i) => {
            if (list.id == updated_list.id) {
                index = i
            }
        });
        if (index != -1)
            Vue.set(state.my_lists, index, updated_list)

    },
    [LIST_TOGGLE_MOVIE_ERROR_]: state => {
        state.loading = false
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};