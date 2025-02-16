export default function Home() {
  const user = localStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;

  return (
    <div className="flex flex-col pl-20 pt-20 h-screen w-screen">
      <h1>Bienvenido {parsedUser ? parsedUser.username : "Invitado"}</h1>
    </div>
  );
}
