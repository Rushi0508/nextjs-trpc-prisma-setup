"use client";
import { trpc } from "../utils/trpc";
export default function Home() {
  const { data: users, isLoading } = trpc.user.getUsers.useQuery();

  const createUser = trpc.user.createUser.useMutation({
    onSuccess: () => {
      console.log("User created");
    },
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div>
        <div>
          <h1>Users:</h1>
          <ul>
            {users?.map((user) => (
              <li key={user.id}>{user.name} ({user.email})</li>
            ))}
          </ul>
          <button
            onClick={() =>
              createUser.mutate({ name: 'Jack', email: `jack${Math.random()}@example.com` })
            }
          >
            Add User
          </button>
        </div>
      </div>
    </>
  );
}
