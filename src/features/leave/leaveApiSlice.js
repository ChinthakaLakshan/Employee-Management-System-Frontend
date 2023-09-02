import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const leavesAdapter = createEntityAdapter(/* {   sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1} */)

const initialState = leavesAdapter.getInitialState()


export const leaveApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLeaves: builder.query({
            query: () => ({
                url: '/leave',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedLeaves = responseData.map(leave=> {
                    leave.id =leave._id
                    return leave
                });
                return leavesAdapter.setAll(initialState, loadedLeaves)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Leave', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Leave', id }))
                    ]
                } else return [{ type: 'Leave', id: 'LIST' }]
            }
        }),
        addNewLeave: builder.mutation({
            query: initialNote => ({
                url: '/leave',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: [
                { type: 'Leave', id: "LIST" }
            ]
        }),
        updateLeave: builder.mutation({
            query:({ leaveId, approvalstatus, ...initialNote }) => ({
                url: `/leave`,
                
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Leave', id: arg.id }
            ]
        }),
        deleteLeave: builder.mutation({
            query: ({ id }) => ({
                url: `/leave`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Leave', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetLeavesQuery,
    useAddNewLeaveMutation,
    useUpdateLeaveMutation,
    useDeleteLeaveMutation,
} = leaveApiSlice;

// returns the query result object
export const selectLeaveResult = leaveApiSlice.endpoints.getLeaves.select()

// creates memoized selector
const selectLeaveData = createSelector(
    selectLeaveResult,
    (leaveResult) => leaveResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLeave,
    selectById: selectLeaveById,
    selectIds: selectLeaveIds
    // Pass in a selector that returns the notes slice of state
} = leavesAdapter.getSelectors((state) => selectLeaveData(state) ?? initialState);