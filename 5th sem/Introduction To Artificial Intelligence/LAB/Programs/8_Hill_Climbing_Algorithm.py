
def f(x):
    return -x**2 + 10*x

def hill_climbing():
    x = 0
    step = 0.1

    for i in range(1000):
        if f(x + step) > f(x):
            x += step
        else:
            break

    print("Peak found at x =", round(x, 1))
    print("f(x) =", round(f(x), 2))

hill_climbing()