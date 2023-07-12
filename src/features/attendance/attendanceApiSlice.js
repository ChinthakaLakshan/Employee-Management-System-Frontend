import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const employeesAttendanceAdapter = createEntityAdapter({})

const initialState = employeesAttendanceAdapter.getInitialState()

export const attendanceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAttendance: builder.query({
            query: () => '/attendance',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedEmployeesAttendance = responseData.map(attendance => {
                    attendance.id = attendance._id
                    return attendance
                });
                return employeesAttendanceAdapter.setAll(initialState, loadedEmployeesAttendance)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Attendance', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Attendance', id }))
                    ]
                } else return [{ type: 'Attendance', id: 'LIST' }]
            }
        }),
        addNewEmployeeAttendance: builder.mutation({
            query: initialEmployeeData => ({
                url: '/attendance',
                method: 'POST',
                body: {
                    ...initialEmployeeData,
                }
            }),
            invalidatesTags: [
                { type: 'Attendance', id: "LIST" }
            ]
        }),
        updateEmployeeAttendance: builder.mutation({
            query: initialEmployeeData => ({
                url: '/attendance',
                method: 'PATCH',
                body: {
                    ...initialEmployeeData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Attendance', id: arg.id }
            ]
        }),
        deleteEmployeeAttendance: builder.mutation({
            query: ({ id }) => ({
                url: `/attendance`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Attendance', id: arg.id }
            ]
        }),
    }),
})



export const {
    useGetAttendanceQuery,
    useAddNewEmployeeAttendanceMutation,
    useUpdateEmployeeAttendanceMutation,
    useDeleteEmployeeAttendanceMutation


} = attendanceApiSlice





export const selectAttendanceResult = attendanceApiSlice.endpoints.getAttendance.select()


const selectAttendancesData = createSelector(
    selectAttendanceResult,
    AttendanceResult => AttendanceResult.data 
)

export const {
    selectAll: selectAllEmployeesAttendance,
    selectById: selectEmployeesAttendanceById,
    selectIds: selectEmployeesAttendanceIds
   
} = employeesAttendanceAdapter.getSelectors(state => selectAttendancesData(state) ?? initialState)