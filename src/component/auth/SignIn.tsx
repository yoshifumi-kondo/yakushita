import { signIn, signOut, useSession } from "next-auth/react";

export default function Component() {
	const { data: session } = useSession();

	if (session === undefined) {
		return <p>Loading...</p>;
	}

	if (session) {
		return (
			<>
				Signed in as {session.userId} <br />
				<button type="button" onClick={() => signOut()}>
					Sign out
				</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button type="button" onClick={() => signIn("google")}>
				Sign in with Google
			</button>
		</>
	);
}
