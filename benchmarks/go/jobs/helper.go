package jobs

import (
	"runtime"
)

func memKB() uint64 {
	runtime.GC()

	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	return m.Alloc / 1024
}
