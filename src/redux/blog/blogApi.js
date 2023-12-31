import apiSlice from "../api/apiSlice";

const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/blogs/create-blog`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["blog"],
    }),
    getAllBlog: builder.query({
      query: () => ({
        url: `/blogs`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    getBlogsByAuthorization: builder.query({
      query: ({ headers }) => ({
        url: `/blogs/get-blogs-by-authorization`,
        method: "GET",
        headers: headers,
      }),
      providesTags: ["blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogQuery,
  useGetBlogsByAuthorizationQuery,
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
