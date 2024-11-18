"use client";

import AddTodoPopup from "@/components/ui/custom/AddTodoPopup";
import Navbar from "@/components/ui/custom/Navbar";
import Pagination from "@/components/ui/custom/Pagination";
import TodoCard from "@/components/ui/custom/TodoCard";
import {
  createTodoHandler,
  getTodosHandler,
  updateTodoHandler,
} from "@/hooks/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: todoData,
  } = useQuery({
    queryKey: ["get-todos", currentPage],
    queryFn: () => getTodosHandler(currentPage),
  });

  const { mutate: toggleTodo } = useMutation({
    mutationFn: updateTodoHandler,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["get-todos", currentPage], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          data: oldData.data.data.map((todo) =>
            todo._id === data.data._id
              ? { ...todo, completed: data.data.completed }
              : todo
          ),
        },
      }));
    },
  });

  const { mutate: createTodo } = useMutation({
    mutationFn: createTodoHandler,
    onSuccess: (data) => {
      const newTodo = data?.data?.data;
      const totalDataNow = data?.data?.totalData;
      const lastPageNumber = Math.ceil(totalDataNow / totalPages);
      const isLastPageFull = totalDataNow % totalPages === 0;
      for (let i = 1; i <= lastPageNumber; i++) {
        queryClient.setQueryData(["get-todos", i], (oldData) => ({
          ...oldData,
          data: {
            ...oldData.data,
            totalData: totalDataNow,
          },
        }));

        if (i === lastPageNumber && !isLastPageFull) {
          queryClient.setQueryData(["get-todos", i], (oldData) => ({
            ...oldData,
            data: {
              ...oldData.data,
              data: [...oldData.data.data, newTodo],
            },
          }));
        }

        if (i === lastPageNumber && isLastPageFull) {
          queryClient.invalidateQueries(["get-todos", lastPageNumber + 1]);
        }
      }
    },
  });

  if (isLoading) return <div className="text-2xl">Loading...</div>;

  return (
    <>
      <Navbar onAddTodo={() => setShowAddTodo(true)} />
      <main className="container mx-auto p-4 space-y-4">
        <div className="container grid grid-cols-3 gap-6 justify-items-center">
          {todoData?.data &&
            todoData?.data?.data.map((todo) => (
              <TodoCard
                key={todo._id}
                id={todo._id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                onToggle={() =>
                  toggleTodo({ ...todo, completed: !todo.completed })
                }
              />
            ))}
        </div>
      </main>
      {todoData?.data && (
        <Pagination
          currentPage={todoData?.data?.currentPage}
          totalPages={Math.ceil(todoData?.data?.totalData / 10)}
          onPageChange={setCurrentPage}
        />
      )}
      {showAddTodo && (
        <AddTodoPopup
          onClose={() => setShowAddTodo(false)}
          handleCreateTodo={(data) => createTodo(data)}
        />
      )}
    </>
  );
}
