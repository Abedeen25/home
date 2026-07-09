import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

test("renders the portfolio intro", async () => {
  render(
    <HelmetProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HelmetProvider>
  );
  expect(
    await screen.findByRole("heading", { level: 1, name: /IFTEKHARUL ABEDEEN/i })
  ).toBeInTheDocument();
});
