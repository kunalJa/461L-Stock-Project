import React from "react";
import ReactDOM from "react-dom";

import { act } from "react-dom/test-utils";
import { expect } from "chai";
var jsdom = require("mocha-jsdom");

global.document = jsdom({
	url: "http://localhost:8000/"
});

import StockLanding from "../pages/stocklanding";

let rootContainer;

beforeEach(() => {
	rootContainer = document.createElement("div");
	document.body.appendChild(rootContainer);
});

afterEach(() => {
	document.body.removeChild(rootContainer);
	rootContainer = null;
});

describe("StockLanding Display Tests", () => {
	it("Renders Welcome Message", () => {
		//Test if card displays correct welcome text
		act(() => {
			ReactDOM.render(<StockLanding />, rootContainer);
		});
		const h2 = rootContainer.querySelector("h2");
		expect(h2.textContent).to.equal("Top Stocks: Click on a stock for more info!");
	});
	it("Navbar Rendering test", () => {
		//Test if Navbar is correctly rendered
		act(() => {
			ReactDOM.render(<IndustryLanding />, rootContainer);
		});
		const Nav = rootContainer.querySelector("Navbar");
		expect(Nav).to.not.equal(null);
    });
});
