import { AppComponent } from "./app.component";

describe("AppComponent test", () => {
	it("mounts", () => {
		cy.mount(AppComponent);
	})
})