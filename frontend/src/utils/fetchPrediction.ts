const fetchPrediction = async (pixelsArray: Uint8ClampedArray) => {
  const prediction = await fetch("http://127.0.0.1:5000/api/prediction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pixel_data: Array.from(pixelsArray),
    }),
  });

  return await prediction.json();
};

export default fetchPrediction;
