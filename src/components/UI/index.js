import React, { useEffect, useState } from "react";
import Header from "../Header";
import List from "../List";
import Footer from "../Footer";

function UI() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(10);
  const [paginationData, setPaginationData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedRows, setCheckedRows] = useState(new Set());

  const itemsToDelete = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
          setFilteredData(jsonData);
          setPaginationData(jsonData.slice(0, 10));
        } else {
          console.error("Fetch failed:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (query) => {
    setQ(query);
    const filteredItems = data.filter(
      (item) =>
        item?.name.toLowerCase().includes(query.toLowerCase()) ||
        item?.role.toLowerCase().includes(query.toLowerCase()) ||
        item?.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredItems);
    setPaginationData(filteredItems.slice(0, 10)); 
    setFirstIndex(0); 
    setLastIndex(10); 
  };

  const handleDelete = (itemId) => {
    const updatedData = filteredData.filter((item) => item.id !== itemId);
    setFilteredData(updatedData);
    setPaginationData(updatedData.slice(firstIndex, lastIndex));
  };

  const handleDeleteAll = () => {
    const updatedData = filteredData.filter((item) => {
      return !checkedRows?.has(item?.id);
    });
    setFilteredData(updatedData);
    setCheckedRows(new Set());
    setSelectAll(false);
    setPaginationData(updatedData.slice(firstIndex, lastIndex));
  };

  const handleNextPagination = () => {
    if (lastIndex < Math.floor(filteredData?.length)) {
      setFirstIndex(firstIndex + 10);
      setLastIndex(lastIndex + 10);
      setPaginationData(filteredData.slice(firstIndex + 10, lastIndex + 10));
    }
  };

  const handlePrevPagination = () => {
    if (firstIndex > 0) {
      setFirstIndex(firstIndex - 10);
      setLastIndex(lastIndex - 10);
      setPaginationData(filteredData.slice(firstIndex - 10, lastIndex - 10));
    }
  };

  const handleLastPagination = () => {
    setFirstIndex(Math.floor(filteredData?.length) - 10);
    setLastIndex(Math.floor(filteredData?.length));
    setPaginationData(
      filteredData.slice(
        Math.floor(filteredData?.length) - 10,
        Math.floor(filteredData?.length)
      )
    );
  };

  const handleFirstPagination = () => {
    setFirstIndex(0);
    setLastIndex(10);
    setPaginationData(filteredData.slice(0, 10)); 
  };

  return (
    <>
      <Header setQ={handleFilter} q={q}></Header>
      <List
        data={paginationData}
        handleDelete={handleDelete}
        itemsToDelete={itemsToDelete}
        selectedRows={checkedRows}
        selectAll={selectAll}
        setSelectedRows={setCheckedRows}
        setSelectAll={setSelectAll}
        setFilteredData={setFilteredData}
        setPaginationData={setPaginationData}
      />
      <Footer
        handleDeleteAll={handleDeleteAll}
        handleNextPagination={handleNextPagination}
        handlePrevPagination={handlePrevPagination}
        handleLastPagination={handleLastPagination}
        handleFirstPagination={handleFirstPagination}
      />
    </>
  );
}

export default UI;