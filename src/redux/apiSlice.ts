import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../model';

export const apiSlice = createApi({
    reducerPath: 'usersapi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://www.filltext.com' }),

    endpoints(builder) {
        return {
            getUsers: builder.query<IUser[], number | void>({
                query() {
                    return '/?rows=20&id={number%7C1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone%7C(xxx)xxx-xx-xx}&address={addressObject}&description={lorem%7C32}';
                },
                providesTags: (result, error, arg) =>  result
                        ? [...result.map(({ id }) => ({ type: 'Users' as const, id })), {type : 'Users', id : '123'}]
                        : [{type : 'Users', id : '123'}],
            }),
            addUser: builder.mutation({
                query(body) {
                    return ({
                        url : '/?rows=20&id={number%7C1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone%7C(xxx)xxx-xx-xx}&address={addressObject}&description={lorem%7C32}',
                        method : 'POST',
                        body,
                    })
                },
                invalidatesTags : [{type : 'Users', id : '123'}]
            })
        }
    }
});

export const { useGetUsersQuery, useAddUserMutation } = apiSlice;