import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const employeesAdapter = createEntityAdapter({})

const initialState = employeesAdapter.getInitialState()

export const employeesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employees',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedEmployees = responseData.map(employee => {
                    employee.id = employee._id
                    return employee
                });
                return employeesAdapter.setAll(initialState, loadedEmployees)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Employee', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Employee', id }))
                    ]
                } else return [{ type: 'Employee', id: 'LIST' }]
            }
        }),
        addNewEmployees: builder.mutation({
            query: initialEmployeeData => ({
                url: '/employees',
                method: 'POST',
                body: {
                    ...initialEmployeeData,
                }
            }),
            invalidatesTags: [
                { type: 'Employee', id: "LIST" }
            ]
        }),
        updateEmployees: builder.mutation({
            query: initialUserData => ({
                url: '/employees',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Employee', id: arg.id }
            ]
        }),
        deleteEmployees: builder.mutation({
            query: ({ id }) => ({
                url: `/employees`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Employee', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetEmployeesQuery,
    useAddNewEmployeesMutation,
    useUpdateEmployeesMutation,
    useDeleteEmployeesMutation,
} = employeesApiSlice

// returns the query result object
export const selectEmployeesResult = employeesApiSlice.endpoints.getEmployees.select()

// creates memoized selector
const selectEmployeesData = createSelector(
    selectEmployeesResult,
    EmployeesResult => EmployeesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllEmployees,
    selectById: selectEmployeesById,
    selectIds: selectEmployeesIds
    // Pass in a selector that returns the users slice of state
} = employeesAdapter.getSelectors(state => selectEmployeesData(state) ?? initialState)