export const handleTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const { value, selectionStart: start, selectionEnd: end } = event.target;
    event.target.value = `${value.substring(0, start)}  ${value.substring(
      end
    )}`;
  }
};

export default handleTab;
