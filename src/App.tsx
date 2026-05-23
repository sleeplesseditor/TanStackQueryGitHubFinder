import UserSearch from "@components/UserSearch/UserSearch";
import Header from "@components/Header/Header";
import { Toaster } from 'sonner';
import './App.scss';

function App() {
  return (
    <div className="github-finder__container">
      <Header />
      <UserSearch />
      <Toaster />
    </div>
  )
}

export default App
