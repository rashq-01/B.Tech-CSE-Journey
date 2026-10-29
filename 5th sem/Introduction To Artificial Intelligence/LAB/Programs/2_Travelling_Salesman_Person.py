import itertools
def tsp_brute_force(graph, start):
    # Number of cities
    n = len(graph)
   # All cities except the start
    cities = list(range(n))
    cities.remove(start)
    min_path = None
    min_cost = float('inf')
    # Try all permutations of cities
    for perm in itertools.permutations(cities):
        current_cost = 0
        current_path = [start] + list(perm) + [start]
                # Calculate cost of this path
        for i in range(len(current_path) - 1):
            current_cost += graph[current_path[i]][current_path[i+1]]
        if current_cost < min_cost:
            min_cost = current_cost
            min_path = current_path
    return min_path, min_cost
# Example Distance Matrix (Graph)
graph = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
]
# Starting from city 0
path, cost = tsp_brute_force(graph, 0)
print("Minimum Cost Path:", path)
print("Total Cost:", cost)