import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  if (session === undefined) {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.userId} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button
        onClick={async () => {
          await fetch("/api/connect-test", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }}
      >
        test
      </button>
    </>
  );
}
