import React from "react";
import { Button } from "../button";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-[#624E88] hover:bg-[#8967B3] text-white"
      >
        Previous
      </Button>
      <span className="text-[#624E88]">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-[#624E88] hover:bg-[#8967B3] text-white"
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
