import Chat from './components/Chat';
import { ChatProvider } from './context/chat';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <ChatProvider>
    <Chat />
  </ChatProvider>
);

export default App;
