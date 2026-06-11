package jobs

func PrimeSieve() (map[string]any, error) {
	n := 20000000

	sieve := make([]bool, n+1)

	for i := 2; i*i <= n; i++ {
		if !sieve[i] {
			for j := i * i; j <= n; j += i {
				sieve[j] = true
			}
		}
	}

	count := 0
	for i := 2; i <= n; i++ {
		if !sieve[i] {
			count++
		}
	}

	return map[string]any{
		"success": true,
		"error": nil,
		"result": count,
	}, nil
}
