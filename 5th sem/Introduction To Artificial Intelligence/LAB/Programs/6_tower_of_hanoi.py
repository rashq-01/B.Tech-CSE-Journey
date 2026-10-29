def towers_of_hanoi(n, source, auxiliary, destination):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return
    towers_of_hanoi(n - 1, source, destination, auxiliary)
    print(f"Move disk {n} from {source} to {destination}")
    towers_of_hanoi(n - 1, auxiliary, source, destination)


n = int(input("Enter number: "));

towers_of_hanoi(n,'A','B','C')


def tower_of_hanoi(n,src,aux,dest):
    if n==1:
        print(f"move disk 1 from {src} to {dest}")
        return
    tower_of_hanoi(n-1,src,dest,aux)
    print(f"Move disk {n} from {src} to {dest}")
    tower_of_hanoi(n-1,aux,src,dest)

