async function signin(payload) {
  const url = import.meta.env.VITE_API_URL + "/signin";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  return { res, data };
}

export default signin;
