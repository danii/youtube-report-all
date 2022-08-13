// ==UserScript==
// @name         YouTube User Report Select All
// @version      0.1
// @description  Adds a "Select All" button to the user report modal to select all the videos in the list at once.
// @author       Daniel Conley
// @match        https://www.youtube.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
	const style = "background-color: #65f77b;margin-right: 8px;padding: 10px;border-radius: 2px;width: 110px;cursor: pointer;text-transform: uppercase;font-weight: 600; border-width: 0;";

	function create(container) {
		function selectAll() {
			const checkBoxes = container.querySelectorAll("#checkboxContainer");
			checkBoxes.forEach(checkBox => {
				const checkMark = checkBox.querySelector("#checkmark");
				if (checkMark.classList.contains("hidden"))
					checkBox.click();
			});

			this.innerHTML = "Unselect All";
			this.removeEventListener("click", selectAll);
			this.addEventListener("click", unselectAll);
			this.style.width = "130px";
		}

		function unselectAll() {
			const checkBoxes = container.querySelectorAll("#checkboxContainer");
			checkBoxes.forEach(checkBox => {
				const checkMark = checkBox.querySelector("#checkmark");
				if (!checkMark.classList.contains("hidden"))
					checkBox.click();
			});

			this.innerHTML = "Select All";
			this.removeEventListener("click", unselectAll);
			this.addEventListener("click", selectAll);
			this.style.width = "110px";
		}

		const buttonContainer = document.querySelector("ytd-report-channel-modal-footer-renderer");
		const nextButton = buttonContainer.querySelector("#next-button");
		const button = document.createElement("button");
		button.innerText = "Select All";
		button.setAttribute("style", style);
		button.addEventListener("click", selectAll);
		buttonContainer.insertBefore(button, nextButton);
	}

	GM_registerMenuCommand("Add The Button I'm Too Lazy To Do It For You", () => {
		const container = document.querySelector("ytd-multi-page-menu-renderer");
		create(container);
	});
})();
