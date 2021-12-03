import { html } from "../../helpers/index.js";

const MAP_ACTIVE_STYLES = {
  inactive: {
    border: "#CCC",
    background: "white",
  },
  selected: {
    border: "#de3c4b",
    background: "#de3c4b10",
  },
};

class Component extends HTMLElement {
  shadow = this.attachShadow({ mode: "closed" });

  data = {
    name: this.dataset.name || null,
    status: this.dataset.status || null,
    note: this.dataset.note || null,
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.shadow.innerHTML = this.render();
  }

  render() {
    const { name, status, note } = this.data

    const styles = html`
      <style>
        .base {
          vertical-align: top;
          border: 2px solid ${MAP_ACTIVE_STYLES[status].border};
          background: ${MAP_ACTIVE_STYLES[status].background};
          color: #222222;
          border-radius: 0.5rem;
          padding: 1rem;
          display: inline-block;
          margin: 0.5rem;
          box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
            0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        }

        .title {
            font-weight: bold;
            font-size: 16px;
            line-height: 1;
            padding-bottom: 0.25rem;
        }

        .events {
          padding-top: 1rem;
        }

        .note {
          font-size: 10px;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          letter-spacing: 0.25px;
        }
      </style>
    `;

    return html`
      ${styles}

      <div class="base">
        <div class="title">${name}</div>
        ${note && html`<div class="note">${note}</div>`}
        <div class="events"><slot></slot></div>
      </div>
    `;
  }
}

customElements.define("prototype-viz-item", Component);
