package main

import (
	"encoding/json"
	"fmt"
	"os"
	"polybench/jobs"
	"runtime"
	"strconv"
	"strings"
	"time"
)

type Bench struct {
	Success       bool    `json:"success"`
	TimeElapsedMs float64 `json:"timeElapsedMs"`
	MemDeltaKb    int64   `json:"memDeltaKb"`
	Error         *string `json:"error"`
}

func rssKB() int64 {
	data, _ := os.ReadFile("/proc/self/status")

	for _, line := range strings.Split(string(data), "\n") {
		if strings.HasPrefix(line, "VmRSS:") {
			fields := strings.Fields(line)
			val, _ := strconv.Atoi(fields[1])
			return int64(val)
		}
	}
	return 0
}

func measure(fn func() (map[string]any, error)) (map[string]any, Bench) {
	runtime.GC()
	before := rssKB()

	start := time.Now()
	out, err := fn()
	elapsed := time.Since(start).Seconds() * 1000

	runtime.GC()
	after := rssKB()

	var errStr *string
	if err != nil {
		s := err.Error()
		errStr = &s
	}

	return out, Bench{
		Success:       err == nil,
		TimeElapsedMs: elapsed,
		MemDeltaKb:    after - before,
		Error:         errStr,
	}
}

func wrap(b Bench) map[string]any {
	return map[string]any{
		"success":       b.Success,
		"timeElapsedMs": b.TimeElapsedMs,
		"memDeltaKb":    b.MemDeltaKb,
		"error":         b.Error,
	}
}

func attach(out map[string]any, b Bench) map[string]any {
	return wrap(b)
}

func main() {
	primeOut, primeMeta := measure(jobs.PrimeSieve)
	jsonOut, jsonMeta := measure(jobs.JSONParse)
	matrixOut, matrixMeta := measure(jobs.MatrixMul)

	_ = primeOut
	_ = jsonOut
	_ = matrixOut

	result := map[string]any{
		"language": "go",
		"benchmarks": map[string]any{
			"prime_sieve": attach(primeOut, primeMeta),
			"json_parse":  attach(jsonOut, jsonMeta),
			"matrix_mul":  attach(matrixOut, matrixMeta),
		},
	}

	b, _ := json.Marshal(result)
	fmt.Println(string(b))
}
