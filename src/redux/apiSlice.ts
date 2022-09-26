import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../model';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://www.filltext.com' }),

    endpoints(builder) {
        return {
			getPosts: builder.query<IUser[], number | void>({  
            	query() {
					return '/?rows=20&id={number%7C1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone%7C(xxx)xxx-xx-xx}&address={addressObject}&description={lorem%7C32}';
				}
			})
		}
    }
});

export const { useGetPostsQuery } = apiSlice;