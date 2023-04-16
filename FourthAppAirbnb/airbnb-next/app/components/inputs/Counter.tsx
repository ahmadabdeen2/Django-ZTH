"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title?: string;
//   subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
//   subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onSubtract = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        {/* <div className="font-light ">{title}</div> */}
        <div className="font-light text-neutral-500 mt-2">{title}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onSubtract}
          className="w-8 h-8 rounded-full border-[1px] border-neutral-400
        flex items-center justify-center text-neutral-600 cursor-pointer
        hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-500"
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="w-8 h-8 rounded-full border-[1px] border-neutral-400
        flex items-center justify-center text-neutral-600 cursor-pointer
        hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-500"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
