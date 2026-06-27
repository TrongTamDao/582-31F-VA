export class TeamCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  // read data in getters
  getName() {
    return this.getAttribute("name") || "Unknown";
  }

  getGroup() {
    return this.getAttribute("group") || "Unknown";
  }

  getPoints() {
    return this.getAttribute("points") || "";
  }

  getPlayed() {
    return this.getAttribute("played") || "";
  }

  getGoalDifference() {
    return this.getAttribute("goal-difference") || "";
  }

  renderStyle() {
    return `
        <style>
            .card {
                border: 1px solid blue;
                padding: 2rem;
                background: black;
                color: white;
                border-radius: 10px;
                margin-top: 1rem;
            }
        </style>
    `;
  }

  render() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
        ${this.renderStyle()}
        
        <div class="card">
            <h2>${this.getName()}</h2>
            <p><strong>Group:</strong> ${this.getGroup()}</p>
            <p><strong>Points:</strong> ${this.getPoints()}</p>
            <p><strong>Played:</strong> ${this.getPlayed()}</p>
            <p><strong>Goal Difference:</strong> ${this.getGoalDifference()}</p>
        </div>   
    `;
  }
}

customElements.define("team-card", TeamCard);

// ChatGPT version:
// export class TeamCard extends HTMLElement {
//   connectedCallback() {
//     this.render();
//   }

//   getName() {
//     return this.getAttribute("name") || "Unknown";
//   }

//   getGroup() {
//     return this.getAttribute("group") || "Unknown";
//   }

//   getPoints() {
//     return this.getAttribute("points") || "";
//   }

//   getPlayed() {
//     return this.getAttribute("played") || "";
//   }

//   getGoalDifference() {
//     return this.getAttribute("goal-difference") || "";
//   }

//   renderStyle() {
//     return `
//       <style>
//         .card {
//           border: 1px solid blue;
//           padding: 2rem;
//           background: black;
//           color: white;
//           border-radius: 10px;
//           margin-top: 1rem;
//         }
//       </style>
//     `;
//   }

//   render() {
//     const shadow =
//       this.shadowRoot ||
//       this.attachShadow({ mode: "open" });

//     shadow.innerHTML = `
//       ${this.renderStyle()}

//       <div class="card">
//         <h2>${this.getName()}</h2>
//         <p><strong>Group:</strong> ${this.getGroup()}</p>
//         <p><strong>Points:</strong> ${this.getPoints()}</p>
//         <p><strong>Played:</strong> ${this.getPlayed()}</p>
//         <p><strong>Goal Difference:</strong> ${this.getGoalDifference()}</p>
//       </div>
//     `;
//   }
// }

// customElements.define("team-card", TeamCard);

// attachShadow() only
// First render
//     ↓
// Create shadow root ✅

// Second render
//     ↓
// Try to create another shadow root ❌ Error

// shadowRoot || attachShadow()
// First render
//     ↓
// No shadow root
//     ↓
// Create one ✅

// Second render
//     ↓
// Shadow root exists
//     ↓
// Reuse it ✅

// Third render
//     ↓
// Reuse it again ✅
