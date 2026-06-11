package jobs

import "encoding/json"

func JSONParse() (map[string]any, error) {

	data := make([]map[string]any, 0, 500000)

	for i := 0; i < 500000; i++ {
		arr := make([]int, 20)
		for x := 0; x < 20; x++ {
			arr[x] = x
		}

		data = append(data, map[string]any{
			"id":  i,
			"arr": arr,
		})
	}

	raw, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}

	var parsed []map[string]any
	err = json.Unmarshal(raw, &parsed)
	if err != nil {
		return nil, err
	}

	sum := 0
	for i := range parsed {
		sum += len(parsed[i]["arr"].([]any))
	}

	_ = sum

	return map[string]any{
		"success": true,
		"error": nil,
		"result": sum,
	}, nil
}
