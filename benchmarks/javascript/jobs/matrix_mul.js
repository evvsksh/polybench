function matrix_mul(n = 128) {
  const A = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, () => i * 0.01),
  );

  const B = Array.from({ length: n }, (_, j) =>
    Array.from({ length: n }, () => j * 0.02),
  );

  const C = Array.from({ length: n }, () => Array(n).fill(0.0));

  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      const aik = A[i][k];
      for (let j = 0; j < n; j++) {
        C[i][j] += aik * B[k][j];
      }
    }
  }

  return C[0][0];
}

module.exports = { matrix_mul };
