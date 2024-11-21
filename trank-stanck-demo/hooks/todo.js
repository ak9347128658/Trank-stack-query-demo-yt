const { BACKEND_BASE_URL } = require("@/contants");

export const createTodoHandler = async (todo) => {
  const response = await fetch(`${BACKEND_BASE_URL}create-todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
};

export const getTodosHandler = async (page = 1) => {
  const response = await fetch(`${BACKEND_BASE_URL}get-todo?page=${page}`);
  const data = await response.json();
  return data;
};

export const updateTodoHandler = async (todo) => {
  const response = await fetch(`${BACKEND_BASE_URL}update-todo/${todo._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
};
