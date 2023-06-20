import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApiMain = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "cd739a57e7mshd1618539c11c51dp1ead66jsnf377bd88928f"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/track" }),
    getRelatedSongs: builder.query({
      query: ({ songid }) => `/songs/list-recommendations?key=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: ({ artistId }) => `/artists/get-details?id=${artistId}`,
    }),
  }),
});

export const { useGetTopChartsQuery, useGetRelatedSongsQuery , useGetArtistDetailsQuery } =
  shazamCoreApiMain;
