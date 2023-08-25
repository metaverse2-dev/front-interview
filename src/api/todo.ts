import api from "@/api/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/queryKey";

type Todo = {
  id: number;
  userId: string;
  title: string;
  content: string;
};
export const getTodo = () => {
  return useQuery([QUERY_KEY.getTodo], async () => {
    try {
      const {data} = await api.get<Todo[] | []>('/todo');
      return data;
    } catch (e) {
      console.error(e);
    }
  })
};


type PostTodo = {
  title: string;
  content: string;
}

type Status = { message: string; }
export const postTodo = ({
                           onError = () => {
                           },
                           onSuccess = () => {
                           },
                         }) => {
  return useMutation([QUERY_KEY.postTodo], {
    mutationFn: async ({title, content}: PostTodo) => {
      const {data} = await api.post<Status>('/todo', {title, content});
      return data;
    },
    onError,
    onSuccess
  });
};
export interface PutTodo {
  id: number;
  title: string;
  content: string;
}
export const putTodo = ({
                          onError = () => {
                          },
                          onSuccess = () => {
                          },
                        }) => {
  return useMutation([QUERY_KEY.putTodo], {
    mutationFn: async ({id, title, content}: PutTodo) => {
      const {data} = await api.put<Status>('/todo', {id, title, content});
      return data;
    },
    onError,
    onSuccess
  });

};
type DeleteTodo = {
  id: number;
}
export const deleteTodo = ({
                             onError = () => {
                             },
                             onSuccess = () => {
                             },
                           }) => {

  return useMutation([QUERY_KEY.deleteTodo], {
    mutationFn: async ({id}: DeleteTodo) => {
      const {data} = await api.delete<Status>(`/todo?id=${id}`);
      return data;
    },
    onError,
    onSuccess
  });
};

type GetTodoDetail = {
  id: number;
};
export const getTodoDetail = ({id}: GetTodoDetail) => {
  return useQuery([QUERY_KEY.getTodoDetail, id], async () => {
      const {data}:{data:Todo} = await api.get<Todo>(`/todoDetail?id=${id}`);
      return data;
  })
};
