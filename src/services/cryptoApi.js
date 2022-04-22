import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '5b9180585emshae7de7b2a6fe8adp15f531jsn51b73a1f1871'
}
const baseUrl =  'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (id) => createRequest(`/coin/${id}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ id, timeperiod }) => createRequest(`coin/${id}/history?timeperiod=${timeperiod}`),
        }),

        // Premium plan endpoint
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        })
    })
});
export const { 
    useGetCryptosQuery, 
    useGetCryptoDetailsQuery, 
    useGetCryptoHistoryQuery, 
    useGetExchangesQuery 
} = cryptoApi;