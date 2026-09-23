def layout(N, C, L):
    graph = {i: [] for i in range(N)}
    for x, y in L:
        graph[x].append(y)
        graph[y].append(x)
    assignment = {}




    def is_safe(guest, table):
        for neighbor in graph[guest]:
            if assignment.get(neighbor) == table:
                return False
        return True



    def solve(guest):
        if guest == N:
            return True
        for table in range(C):
            if is_safe(guest, table):
                assignment[guest] = table

                if solve(guest + 1):
                    return True
                del assignment[guest]
        return False
    if solve(0):
        return assignment
    else:
        return False





N = 5
C = 2
L = [(0, 1), (1, 2), (2, 3), (3, 4)]

result = layout(N, C, L)

print("Table Assignment:", result)