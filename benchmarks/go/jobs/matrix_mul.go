package jobs

func MatrixMul() (map[string]any, error) {
	const n = 120

	a := make([][]float64, n)
	b := make([][]float64, n)
	c := make([][]float64, n)

	for i := 0; i < n; i++ {
		a[i] = make([]float64, n)
		b[i] = make([]float64, n)
		c[i] = make([]float64, n)
	}

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			a[i][j] = float64(i + j)
			b[i][j] = float64(i - j)
		}
	}

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			sum := 0.0
			for k := 0; k < n; k++ {
				sum += a[i][k] * b[k][j]
			}
			c[i][j] = sum
		}
	}

	return map[string]any{
		"success": true,
		"error": nil,
		"checksum": c[0][0],
	}, nil
}
