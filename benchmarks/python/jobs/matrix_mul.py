def matrix_mul():
    n = 512

    A = [[float(i * 0.01) for i in range(n)] for _ in range(n)]
    B = [[float(j * 0.02) for j in range(n)] for _ in range(n)]
    C = [[0.0] * n for _ in range(n)]

    for i in range(n):
        for k in range(n):
            aik = A[i][k]
            for j in range(n):
                C[i][j] += aik * B[k][j]

    return C[0][0]
