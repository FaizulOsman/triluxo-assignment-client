import apiSlice from "../api/apiSlice";

const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/blog/create-blog`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["blog"],
    }),
    getAllBlog: builder.query({
      query: () => `/blog`,
      providesTags: ["blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => `/blog/${id}`,
      providesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/blog/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/blog/${id}`,
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
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
