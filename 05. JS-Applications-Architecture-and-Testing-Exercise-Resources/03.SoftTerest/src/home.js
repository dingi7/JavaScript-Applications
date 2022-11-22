import { showSection } from "./api.js";

const section = document.getElementById("home-view")
section.remove()

export function showHomeView(ctx) {
    showSection(section)
}