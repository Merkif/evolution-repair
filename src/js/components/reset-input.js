const canResetInput = (input) => {
	return input && input.value !== "" && !input.readOnly && !input.disabled;
};

document.body.addEventListener("click", (event) => {
	const resetButton = event.target.closest(".field__reset");
	if (!resetButton) return;
	const input = resetButton.closest(".field").querySelector(".field__input");

	if (canResetInput(input)) {
		input.value = "";
	}
});
