import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptonewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '5b9180585emshae7de7b2a6fe8adp15f531jsn51b73a1f1871'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptonewsApiHeaders })

export const cryptonewsApi = createApi({
    reducerPath: 'cryptonewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ category, count }) => createRequest(`/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});
export const { useGetCryptoNewsQuery } = cryptonewsApi;