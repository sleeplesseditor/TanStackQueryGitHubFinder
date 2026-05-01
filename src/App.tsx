import UserSearch from "@components/UserSearch/UserSearch";
import Header from "@components/Header/Header";
import './App.scss';

function App() {
  return (
    <div className="github-finder__container">
      <Header />
      <UserSearch />
    </div>
  )
}

export default App
