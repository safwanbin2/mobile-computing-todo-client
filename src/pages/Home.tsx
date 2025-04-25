import { useAtom } from "jotai";
import Container from "../components/Container";
import Todos from "../components/ui/home/Todos";
import React from "react";
import { searchAtom } from "../jotai/atoms";
import { useDebouncedAtom } from "../hooks/useDebounce";

const Home = () => {
  const [, setSearchTerm] = useAtom(searchAtom);
  const [inputValue, setInputValue] = useDebouncedAtom<string>("", setSearchTerm, 400);

  return (
    <div>
      <Container className="space-y-5">
        <div className="flex justify-center items-start flex-col gap-2">
          <div>
            <h1 className="text-sm text-gray-500">Welcome,</h1>
            <h3 className="text-xl">Mr Todo</h3>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border px-2 py-[6px] rounded-md border-gray-400 focus:outline-none text-gray-500 w-full"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
        </div>
        <Todos />
      </Container>
    </div>
  );
};

export default Home;
