import './App.css';
import Header from './Header';
import Content from './Content';
import { nanoid } from "nanoid";

export default function App() {
  const web = nanoid();
  const gamedev = nanoid();
  const etCetera = nanoid();
  const cv = nanoid();

  let clickedSection = false;
  function clickHandler(section) {
    clickedSection = section;
    // console.log(section);
  }

  return (
    <div className="App">
      <Header web={web} gamedev={gamedev} etCetera={etCetera} cv={cv} sectionHandler={clickHandler}/>
      <Content web={web} gamedev={gamedev} etCetera={etCetera} cv={cv} clickedSection={clickedSection} />
    </div>
  );
}