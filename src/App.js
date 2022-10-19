import './App.css';
import Header from './Header';
import Content from './Content';
import { nanoid } from "nanoid";

export default function App() {
  const web = nanoid();
  const gamedev = nanoid();
  const etCetera = nanoid();
  const cv = nanoid();

    return (
    <div className="App">
      <Header web={web} gamedev={gamedev} etCetera={etCetera} cv={cv} />
      <Content web={web} gamedev={gamedev} etCetera={etCetera} cv={cv}/>
    </div>
  );
}