import heapq

def manhattan_distance(state, goal):
    distance = 0
    for i in range(1, 9):
        x1, y1 = divmod(state.index(i), 3)
        x2, y2 = divmod(goal.index(i), 3)
        distance += abs(x1 - x2) + abs(y1 - y2)
    return distance


def get_neighbors(state):
    neighbors = []
    idx = state.index(0)
    x, y = divmod(idx, 3)
    moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    for dx, dy in moves:
        nx, ny = x + dx, y + dy
        if 0 <= nx < 3 and 0 <= ny < 3:
            new_idx = nx * 3 + ny
            new_state = list(state)
            new_state[idx], new_state[new_idx] = new_state[new_idx], new_state[idx]
            neighbors.append(tuple(new_state))
    return neighbors

def a_star(start, goal):
    open_list = []
    heapq.heappush(open_list, (0 + manhattan_distance(start, goal), 0, start, []))
    visited = set()
    while open_list:
        est_total, cost, current, path = heapq.heappop(open_list)
        if current in visited:
            continue
        visited.add(current)
        if current == goal:
            return path + [current]
        for neighbor in get_neighbors(current):
            if neighbor not in visited:
                heapq.heappush(open_list, (
                    cost + 1 + manhattan_distance(neighbor, goal),
                    cost + 1,
                    neighbor,
                    path + [current]
                ))
    return None
# Example usage
start_state = (1, 2, 3,
               4, 0, 6,
               7, 5, 8)
goal_state = (1, 2, 3,
              4, 5, 6,
              7, 8, 0)
solution = a_star(start_state, goal_state)
if solution:
    print("Solution steps:")
    for step in solution:
        print(f"{step[0:3]}\n{step[3:6]}\n{step[6:9]}\n")
else:
    print("No solution found.")