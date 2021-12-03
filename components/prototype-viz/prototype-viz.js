import { html } from "../../helpers/index.js";

class Component extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  data = {
    ast: null,
    selected: null,
  };

  update(newData) {
    this.data = {
      ...this.data,
      ...newData || {},
    }

    this.shadow.innerHTML = this.render();
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.shadow.innerHTML = this.render();

    this.shadow.addEventListener("click", (event) => {
      const { destination, key, status } = event.target.dataset
      if (key === "link" && destination && status === 'selected') {

        this.update({ selected: destination })
      }
    });
  }

  render() {
    const { ast, selected } = this.data

    if (!ast) return html`<div></div>`

    const list = Object.keys(ast).map((key) => {
      const status = selected === key ? "selected" : "inactive";
      const obj = ast[key];

      const actions = Object.keys(obj)
        .filter((val) => val !== "_")
        .map((innerKey) => {
          const destination = obj[innerKey][0] || null;
          const note = obj[innerKey][1] || null;

          return html`
            <prototype-viz-link
              data-key="link" 
              data-action="${innerKey}"
              data-status="${status}"
              data-destination="${destination}"
              data-note="${note}"
            ></prototype-viz-link>
          `;
        })
        .join('');

        
        return html`
            <prototype-viz-item
              data-name="${key}"
              data-status="${status}"
              data-note="${obj._ || null}"
            >
                ${actions}
            </prototype-viz-item>
        `
    }).join('');

    const styles = html`
      <style>
        .base {
          font-family: sans-serif;
          font-size: 13px;
        }
      </style>
    `;

    return html`
      ${styles}
      ${list}
    `;
  }
}

customElements.define("prototype-viz", Component);
