import { Outlet } from "react-router-dom";

function Authenticated() {
  // any additional authenticated logic here (e.g. redirect to login if not authenticated)

  return (
    <main>
      <Outlet />
    </main>
  );
}

export default Authenticated;
