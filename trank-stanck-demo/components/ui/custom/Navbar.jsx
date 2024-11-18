import React from "react";
import { Button } from "../button";
import { Plus } from "lucide-react";

function Navbar({ onAddTodo }) {
  return (
    <nav className="bg-[#624E88] p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">DevDyanamo Todo</h1>
      <Button
        onClick={onAddTodo}
        className="bg-[#CB80AB] hover:bg-[#8967B3] text-white"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Todo
      </Button>
    </nav>
  );
}

export default Navbar;
