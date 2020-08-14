import { request } from '@/plugins/request'

// 公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/articles',
        params
    })
}

export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/articles/${slug}`,
    })
}

export const createArticle = (data) => {
    return request({
        method: 'POST',
        url: '/articles',
        data
    })
}

export const updateArticle = (slug, data) => {
    return request({
        method: 'PUT',
        url: `/articles/${slug}`,
        data
    })
}

export const deleteArticle = (slug) => {
    return request({
        method: 'DELETE',
        url: `/articles/${slug}`
    })
}

export const addCommentToArticle = (slug, data) => {
    return request({
        method: 'POST',
        url: `/articles/${slug}/comments`,
        data
    })
}

export const getCommentsFormArticle = (slug) => {
    return request({
        method: 'GET',
        url: `/articles/${slug}/comments`
    })
}

export const deleteCommentFormArticle = (slug,id) => {
    return request({
        method: 'DELETE',
        url: `/articles/${slug}/comments/${id}`
    })
}

export const getYourFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/articles/feed',
        params,
    })
}

export const getTags = params => {
    return request({
        method: 'GET',
        url: '/tags',
        params
    })
}

// 文章点赞
export const setFavoriteToArticle = slug => {
    return request({
        method: 'POST',
        url: `/articles/${slug}/favorite`,
    })
}

export const deleteFavoriteToArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/articles/${slug}/favorite`,
    })
}
