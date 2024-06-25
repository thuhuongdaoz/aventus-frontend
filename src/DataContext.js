import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
// Tạo context
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Hàm để lấy dữ liệu từ API
  const fetchData = async () => {
    axios.get('http://localhost:8080/users/myInfo', { 
        headers : {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
     })
      .then(response => {
        setUser(response.data)

      })
      .catch(error => {
        console.error('Error fetching myInfo:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const updateData = () => {
      fetchData(); // Cập nhật lại dữ liệu sau khi update
  };

  return (
    <DataContext.Provider value={{ user, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);