
import './App.css';
import Banner from './components/main components/Banner';
import Mainpage from './components/main page/Mainpage';
import ShoppingCart from './components/main components/ShoppingCart';
import Sidebar from './components/main components/Sidebar';

function App() {
 
  return (
    <>
      <Banner/>
      <Sidebar loginout="login"/>
      <Mainpage/>
      <ShoppingCart/>
    </>
  );
}

export default App;
