import Home from './pages/Home';
import NewPrank from './pages/NewPrank';
import History from './pages/History';
import Contacts from './pages/Contacts';
import Scripts from './pages/Scripts';
import Support from './pages/Support';
import Landing from './pages/Landing';
import Community from './pages/Community';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "NewPrank": NewPrank,
    "History": History,
    "Contacts": Contacts,
    "Scripts": Scripts,
    "Support": Support,
    "Landing": Landing,
    "Community": Community,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
    Layout: __Layout,
};