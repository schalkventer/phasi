import { html } from "../../helpers/index.js";

class Component extends HTMLElement {
  shadow = this.attachShadow({ mode: "closed" });

  data = {
    action: this.dataset.action || null,
    status: this.dataset.status || null,
    destination: this.dataset.destination || null,
    note: this.dataset.note || null,
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.shadow.innerHTML = this.render();
  }

  render() {
    const { action, status, destination, note } = this.data

    const styles = html`
      <style>
        .arrow {
          font-size: 18px;
          padding: 0 0.25rem;
        }

        .base {
          display: flex;
          align-items: center;
        }

        .action {
          border: 0 solid transparent;
          margin: 0.1rem 0;
          padding: 0.3rem 0.5rem;
          cursor: pointer;
          border-radius: 4px;

          cursor: ${note ? "help" : "default"};
          background: ${status === "selected" ? "#de3c4b" : "#EEE"};
          color: ${status === "selected" ? "white" : "black"};
        }

        .action:hover {
          background: ${status === "selected" ? "#ad1927" : "#EEE"};
        }

        .action:active {
          background: ${status === "selected" ? "#9b0614" : "#EEE"};
        }

        .text {
          background: none;
          border-width: 0;
          white-space: nowrap;
        }
      </style>
    `;

    if (!destination) {
      return html`
        ${styles}

        <div class="base">
          <button title="${note}" class="action">${action}${note && '*'}</button>
        </div>
      `;
    }

    return html`
      ${styles}

      <div class="base">
        <button title="${note}" class="action">${action}${note && '*'}</button>
        <div class="arrow">➞</div>
        <div class="text">${destination}</div>
      </div>
    `;
  }
}

customElements.define("prototype-viz-link", Component);
