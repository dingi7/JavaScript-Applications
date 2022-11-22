function solve() {
  let id = "depot";
  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");
  const info = document.querySelector("#info span");
  async function depart() {
    const response = await fetch(
      `http://localhost:3030/jsonstore/bus/schedule/${id}`
    );
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    info.textContent = `Next stop ${data.name}`;
    departBtn.disabled = true;
    arriveBtn.disabled = false;
  }

  async function arrive() {
    console.log("Arrive TODO...");
    const response = await fetch(
      `http://localhost:3030/jsonstore/bus/schedule/${id}`
    );
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    id = data.next;
    info.textContent = `Arriving at ${data.name}`;
    departBtn.disabled = false;
    arriveBtn.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
