import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Label } from "@radix-ui/react-label";
import { Switch } from "../switch";

function TodoCard({ id, title, description, completed, onToggle }) {
  return (
    <>
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Label htmlFor={id} className="text-sm font-medium text-[#8967B3]">
            {completed ? "Completed" : "Not Completed"}
          </Label>
          <Switch
            id={id}
            checked={completed}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-[#CB80AB]"
          ></Switch>
        </CardFooter>
      </Card>
    </>
  );
}

export default TodoCard;
