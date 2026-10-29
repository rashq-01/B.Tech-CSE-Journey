import heapq

def astar(grid, start, goal):
    pq = [(0, start)]
    cost = {start: 0}
    parent = {}

    while pq:
        _, node = heapq.heappop(pq)

        if node == goal:
            path = []
            while node in parent:
                path.append(node)
                node = parent[node]
            return [start] + path[::-1]

        for dx, dy in [(0,1), (1,0), (0,-1), (-1,0)]:
            nxt = (node[0]+dx, node[1]+dy)
            x, y = nxt

            if (0 <= x < len(grid) and
                0 <= y < len(grid[0]) and grid[x][y] == 0):

                new_cost = cost[node] + 1
                if new_cost < cost.get(nxt, float('inf')):
                    cost[nxt] = new_cost
                    parent[nxt] = node
                    h = abs(x-goal[0]) + abs(y-goal[1])
                    heapq.heappush(pq, (new_cost+h, nxt))

    return None

grid = [[0,0,0], [0,1,0], [0,0,0]]
print(astar(grid, (0,0), (2,2)))