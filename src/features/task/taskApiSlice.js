import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState();

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: '/task',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedTasks = responseData.map((task) => {
          task.id = task._id;
          return task;
        });
        return tasksAdapter.setAll(initialState, loadedTasks);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Task', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Task', id })),
          ];
        } else {
          return [{ type: 'Task', id: 'LIST' }];
        }
      },
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    updateTask: builder.mutation({
      query: ({ id, isComplete }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: { isComplete },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Task', id: arg.id },
        { type: 'Task', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = taskApiSlice;

export const selectTasksResult = taskApiSlice.endpoints.getTasks.select();

const selectTasksData = createSelector(
  selectTasksResult,
  (tasksResult) => tasksResult.data
);

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
} = tasksAdapter.getSelectors((state) => selectTasksData(state) ?? initialState);
