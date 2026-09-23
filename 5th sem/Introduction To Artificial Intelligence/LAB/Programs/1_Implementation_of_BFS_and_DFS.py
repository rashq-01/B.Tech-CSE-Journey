from collections import deque


graph = {
    'A' : ['B','C'],
    'B' : ['A','E'],
    'C' : ['A','G','D'],
    'D' : ['C','G','E','F'],
    'E' : ['B','D','F'],
    'F' : ['E','D'],
    'G' : ['C','D']
}


# DFS Traversal
visited = set()

def dfs(node):
    if node not in visited:
        print(node,end=" ")
        visited.add(node)
        for nbr in graph[node]:
            dfs(nbr)

print("DFS Traversal : ")
dfs('A')






# BFS Traversal
# visited = set()
# queue = deque()

# def bfs(start):
#     visited.add(start)
#     queue.append(start)
#     while queue:
#         node = queue.popleft()
#         print(node,end=" ")
#         for nbr in graph[node]:
#             if nbr not in visited:
#                 visited.add(nbr)
#                 queue.append(nbr)

# print("BFS Traversal : ")
# bfs('A')
