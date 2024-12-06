import Header from "../components/Header";

export default function Blog({ contents, close, isDarkTheme }) {
  return (
    <div className="ContentBody">
      <Header isDarkTheme={isDarkTheme} />
      <div className="nav" onClick={() => close(false)}>
        {"Go Back"}
      </div>
      {contents}
    </div>
  );
}
