import { FormEvent, useEffect, useRef, useState } from "react";

interface UserType {
  _id: string;
  name: string;
  email: string;
}

function App() {
  const nameRef = useRef<null | HTMLInputElement>(null);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);

  const [users, setUsers] = useState<UserType[] | []>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users/all");
    const { data } = await res.json();
    setUsers(data);
  };
  console.log(users);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const name = nameRef.current?.value;
    const userOutput = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userOutput),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, data]);
      })
      .catch((err) => console.log(err));
    formRef.current?.reset();
  };

  return (
    <div>
      <h1 className="text-center font-medium text-2xl mb-5">CRUD</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col space-y-3 justify-center items-center mb-5"
      >
        <input
          className="block border border-black"
          ref={nameRef}
          type="text"
          placeholder="Name"
        />
        <input
          className="block border border-black"
          ref={emailRef}
          type="email"
          name=""
          id=""
          placeholder="Email"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {users.map((user) => (
          <div className="text-center" key={user._id}>
            <span className="mr-2">{user.name}</span>
            <span>{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
