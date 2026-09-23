def count(test, lst):
    c = 0
    for item in lst:
        if test(item):
            c += 1
    return c

# Driver code
numbers = [1, 2, 3, 4, 5]

result = count(lambda x: x > 2, numbers)

print("List:", numbers)
print("Number of elements greater than 2:", result)