import { Outlet } from "react-router-dom";

function Unauthenticated() {
  // any additional unauthenticated logic here

  return (
    <main>
      <Outlet />
    </main>
  );
}

export default Unauthenticated;
