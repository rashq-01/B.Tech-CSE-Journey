import random
import itertools
import time



def generate(n):
    items = []
    for i in range(n):
        item = {
            "name": f"Item{i+1}",
            "weight": random.randint(1, 5),
            "value": random.randint(1, 3170)
        }
        items.append(item)
    return items



def BFK(items, capacity):
    best_value = 0
    best_subset = []
    n = len(items)
    for r in range(n + 1):
        for subset in itertools.combinations(items, r):
            total_weight = sum(item["weight"] for item in subset)
            total_value = sum(item["value"] for item in subset)

            if total_weight <= capacity and total_value > best_value:
                best_value = total_value
                best_subset = subset
    return best_value, best_subset





p_size = [10, 12, 14, 16, 18, 20]

print("---------------------Average Execution Time (10 Runs)-----------------------")
print("\n")
for n in p_size:
    C = int(2.5 * n)
    T = 0
    for _ in range(10):
        items = generate(n)
        start = time.perf_counter()
        BFK(items, C)
        end = time.perf_counter()
        T += (end - start)
    average = T / 10
    print(f"N = {n:2d}   Capacity = {C:2d}   Time = {average:.6f} seconds")