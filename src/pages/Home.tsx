import { useEffect, useState } from "react";
import { Book } from "../types/types";
import axios, { AxiosRequestConfig } from "axios";
import { env } from "../const";
import { BooksPagination } from "../components/Pagination";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";

export const Home = () => {
  const [offset, setOffset] = useState(0)
  const [books, setBooks] = useState<Book[]>([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchBooks = async () => {
      let url;
      const config: AxiosRequestConfig = {};

      if (cookies.token) {
        url = `${env.url}/books?offset=${offset}`;
        config.headers = {
          Authorization: `Bearer ${cookies.token}`
        };
      } else {
        url = `${env.url}/public/books?offset=${offset}`;
      }

      const response = await axios.get(url, config);
      setBooks(response.data);
    };
    fetchBooks();
  }, [offset, cookies.token]);

  return (
    <>
      <Header />
      <div className="grid place-items-center m-5">
        {books.length > 0 ? (
          <>
            {books.map((book, index) => (
              <div
                key={book.id}
                className={`border border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 w-1/2 p-3 pl-4 cursor-pointer`}
              >
                {book.title}
              </div>
            ))}
            <div className="mt-4">
              <BooksPagination offset={offset} setOffset={setOffset}/>
            </div>
          </>
        ) : (
          <div>書籍はありません</div>
        )}
      </div>
    </>
  );
  
}
