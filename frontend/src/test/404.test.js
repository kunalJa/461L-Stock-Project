import React from "react";
import ReactDOM from "react-dom";

import { act } from "react-dom/test-utils";
import { expect } from "chai";
var jsdom = require("mocha-jsdom");

global.document = jsdom({
	url: "http://localhost:3000/"
});

import Fourohfour from "../pages/404";

let rootContainer;

beforeEach(() => {
	rootContainer = document.createElement("div");
	document.body.appendChild(rootContainer);
});

afterEach(() => {
	document.body.removeChild(rootContainer);
	rootContainer = null;
});

describe("404 pack test", () => {
	it("Renders Not Found Message", () => {
		//Test if mounted and prints NOT FOUND in h1
		act(() => {
			ReactDOM.render(<Fourohfour />, rootContainer);
		});
		const h1 = rootContainer.querySelector("h1");
		expect(h1.textContent).to.equal("NOT FOUND");
	});
});
