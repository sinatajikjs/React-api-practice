import axios from "axios";
import { useState, useEffect } from "react";
import styles from './UserList.module.css'
const UserList = () => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3001/users").then((res) => {
      setUsers(res.data);
      setFilteredUsers(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h2>lodaing ...</h2>;
  }

  const changeHandler = (e) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setFilteredUsers(users);
      return;
    }
    const filtered = users.filter((user) => {
      const userString = Object.values(user).join(" ");
      return userString
        .toLowerCase()
        .includes(e.target.value.toLowerCase().trim());
    });
    setFilteredUsers(filtered);
  };

  return (
    <div  className={styles.container}>
      <input className={styles.input} placeholder="Search for..." type="text" value={inputValue} onChange={changeHandler} />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {filteredUsers.map((user) => {
            const { id, name, email, role } = user;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
