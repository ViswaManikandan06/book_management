import React, { useState, useEffect } from "react";
import { TbLogout } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import cart from "../assets/cart.png";
import { Toaster, toast } from "react-hot-toast";
import ProfilePicture from "./Profile";
import Loading from "./Loading";
const formatDate = () => {
  const date = new Date();
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  };
  const formattedDate = date.toLocaleDateString(undefined, options);
  const [weekday, monthDay, year] = formattedDate.split(", ");
  const [month, day] = monthDay.split(" ");

  return `${day} ${month} ${year}, ${weekday}`;
};
const Dashboard = () => {
  const currentDate = formatDate();
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const name = "John Doe";
  const addToCart = (book) => {
    const updatedCart = [...selectedBooks, book];
    setSelectedBooks(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Book Added Successfully 😉");
  };
  useEffect(() => {
    const cartData = sessionStorage.getItem("cart");
    if (cartData) {
      setSelectedBooks(JSON.parse(cartData));
    }
  }, []);
  const clearCart = () => {
    setSelectedBooks([]);
  };
  useEffect(() => {
    const isRefreshing = performance.navigation.type === 1;

    if (isRefreshing) {
      setSelectedBooks([]);
      sessionStorage.removeItem("cart");
    } else {
      const storedCart = sessionStorage.getItem("cart");
      if (storedCart) {
        setSelectedBooks(JSON.parse(storedCart));
      }
    }
  }, []);

  const removeFromCart = (book) => {
    const updatedCart = selectedBooks.filter((item) => item.id !== book.id);
    setSelectedBooks(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=25&key=AIzaSyA928hZgxA_wbFaSnDTJJjHyukpFA0PXd8"
        );

        if (response.data.items.length > 0) {
          setBooks(response.data.items);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen ">
      <div className="h-full">
        <div className="flex gap-[5%] h-full">
          <div className="flex  h-full items-center">
            <div className="h-[98%] w-[80px] rounded-e-lg  bg-[#bc94fc] relative ">
              <div className="h-[100px] flex justify-center items-center rounded-full ">
                <img
                  className="h-[50px] w-[50px] rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuRcNgtyX1vuH1eDLMgoTMVokY4iwWc4tl7w&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="flex justify-center items-center h-[50%]">
                <AiOutlineShoppingCart
                  color="white"
                  onClick={() => setShowModal(true)}
                  size={22}
                />
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold flex  justify-center items-center gap-10">
                              My Cart{" "}
                              <span>
                                <img
                                  className="h-[50px] w-[50px]"
                                  src={cart}
                                  alt=""
                                />
                              </span>
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}>
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div
                            className={`${
                              selectedBooks.length > 0
                                ? "relative p-6 h-[350px] overflow-auto  flex-auto"
                                : "relative p-6 overflow-auto  flex-auto"
                            }`}>
                            {selectedBooks.length > 0 ? (
                              <div className="space-y-8">
                                {selectedBooks.map((book) => (
                                  <div key={book.id} className="flex">
                                    <img
                                      src={book.volumeInfo.imageLinks.thumbnail}
                                      alt={book.volumeInfo.title}
                                      className="flex-shrink-0 w-20 h-20 object-cover rounded"
                                    />
                                    <div className="ml-4 flex-grow">
                                      <h2 className="text-lg font-semibold text-gray-900">
                                        {book.volumeInfo.title}
                                      </h2>
                                      <p className="text-sm text-gray-500">
                                        by{" "}
                                        {book.volumeInfo.authors &&
                                          book.volumeInfo.authors.join(", ")}
                                      </p>
                                      <button
                                        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                                        onClick={() => removeFromCart(book)}>
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-center text-gray-500">
                                Your cart is empty.
                              </p>
                            )}
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}>
                              Close
                            </button>
                            <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                clearCart();
                              }}>
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <TbLogout color="white" />
              </div>
            </div>
          </div>

          <div className=" w-full">
            <div className="flex  items-center h-[90px]">
              <div className="flex justify-center items-center gap-10">
                <div className="bg-white box flex justify-center items-center h-[40px] w-[40px] rounded-lg ">
                  <AiOutlineSearch color="#A020F0" size={22} />
                </div>
                <div>
                  <input
                    type="search"
                    placeholder="Search..."
                    className="border outline-none border-gray-200 border-l-0 border-r-0 border-t-0 border-b-2 px-1 w-[300px] py-1"
                  />
                </div>
              </div>
              <div className="ml-10 text-gray-400 text-sm font-mono">
                {currentDate}
              </div>
              <div className="flex gap-10 pl-20 justify-center items-center">
                <div>
                  <FiSettings color="#c0c0c0" size={20} />
                </div>
                <div>
                  <MdOutlineNotificationsNone color="#c0c0c0" size={20} />
                </div>
              </div>
              <div className="flex gap-1 justify-center pl-40  items-center">
                <div>
                  <p className="font-bold text-md tracking-wider">{name}</p>
                </div>
                <div className="h-[100px] w-[100px] flex justify-center items-center">
                  <ProfilePicture name={name} />
                </div>
              </div>
            </div>
            <div className="flex justify-between  w-[90%] items-center">
              <div>
                <p className="font-bold pl-10 text-black tracking-wider pt-10 text-3xl">
                  Books
                </p>
              </div>
              <div className="flex gap-3  ">
                <label htmlFor="">Sort by</label>
                <select className="outline-none border rounded-sm px-10 border-gray-400">
                  <option value="author">author</option>
                  <option value="genre">genre</option>
                  <option value="year">year</option>
                  <option value="book name">book name</option>
                </select>
              </div>
            </div>
            <div className="flex mt-10 overflow-auto">
              {books.length > 0 ? (
                <div className="flex flex-wrap gap-y-5 h-[400px] overflow-auto justify-around w-full">
                  {books.map((book) => (
                    <div
                      style={{ backgroundColor: getRandomColor() }}
                      className="h-[200px] rounded-md w-[350px]  flex justify-center items-center">
                      <div key={book.id} className="flex gap-6 ">
                        <img
                          className="h-[150px] w-[150px] rounded-lg"
                          src={book.volumeInfo.imageLinks?.thumbnail}
                          alt={book.volumeInfo.title}
                        />

                        <div className="h-full">
                          <h3 className="w-[150px]  font-bold text-white truncate">
                            {book.volumeInfo.title}
                          </h3>
                          <br />
                          <p className="w-[100px] font-normal  text-white truncate">
                            {book.volumeInfo.authors
                              ? book.volumeInfo.authors.join(", ")
                              : "Unknown author"}
                          </p>
                          <div className="flex justify-center items-center mt-8">
                            <button
                              className="button1 btn-shine"
                              onClick={() => addToCart(book)}>
                              <p>Add to Cart</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-[400px] w-full">
                  <Loading />
                </div>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <Toaster reverseOrder={false} position="bottom-center" />
    </div>
  );
};

export default Dashboard;
