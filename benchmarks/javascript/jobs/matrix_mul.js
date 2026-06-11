function matrix_mul() {
  const n = 512;

  const A = new Array(n)
    .fill(0)
    .map((_, i) => new Array(n).fill(0).map(() => i * 0.01));

  const B = new Array(n)
    .fill(0)
    .map((_, i) => new Array(n).fill(0).map((_, j) => j * 0.02));

  const C = new Array(n).fill(0).map(() => new Array(n).fill(0));

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
