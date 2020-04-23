import React from "react";
import ReactDOM from "react-dom";

beforeEach(() => {
    rootContainer = document.createElement("div");
    document.body.appendChild(rootContainer);
  });

  afterEach(() => {
    document.body.removeChild(rootContainer);
    rootContainer = null;
  });

  describe("App Component Testing", () => {
    it("Renders Hello World Title", () => {
      act(() => {
        ReactDOM.render(<App />, rootContainer);
      });
      const h1 = rootContainer.querySelector("h1");
      expect(h1.textContent).to.equal("Hello World");
    });
  });