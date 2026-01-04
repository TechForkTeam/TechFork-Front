import { LoginPage } from "./pages/Login/LoginPage";
import { Onboarding } from "./pages/onboarding/Onboarding";

function App() {
  return (
    <div className="w-full min-h-dvh mx-auto overflow-y-auto">
      <main className=" max-w-480 mx-auto px-14">
        <Onboarding />
        {/* <LoginPage /> */}
      </main>
    </div>
  );
}

export default App;
