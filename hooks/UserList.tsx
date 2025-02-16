import React from "react";
import { useUsers } from "../api/userApi";

function UserList() {
    const { data: users = [], isLoading, error } = useUsers();
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
