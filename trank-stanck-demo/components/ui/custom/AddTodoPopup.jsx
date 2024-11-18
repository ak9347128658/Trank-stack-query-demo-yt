import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { Button } from "../button";
function AddTodoPopup({ onClose, handleCreateTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateTodo({ title, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-[#624E88]">Add New Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title" className="text-[#8967B3]">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter todo title"
                className="border-[#CB80AB]"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-[#8967B3]">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter todo description"
                className="border-[#CB80AB]"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-[#624E88] text-[#624E88]"
          >
            Cancel
          </Button>
          <Button
            className="bg-[#CB80AB] hover:bg-[#8967B3] text-white"
            onClick={handleSubmit}
          >
            Add Todo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AddTodoPopup;
